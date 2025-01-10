package com.scottphebert.personalwebsite.service.usermanagement;

import com.scottphebert.personalwebsite.common.Constants;
import com.scottphebert.personalwebsite.config.JwtAuthenticationFilter;
import com.scottphebert.personalwebsite.model.dto.JwtResponse;
import com.scottphebert.personalwebsite.config.JwtTokenProvider;
import com.scottphebert.personalwebsite.model.entity.User;
import com.scottphebert.personalwebsite.model.entity.UserDetails;
import com.scottphebert.personalwebsite.repo.UserDetailsRepo;
import com.scottphebert.personalwebsite.repo.UserRepo;
import com.scottphebert.personalwebsite.model.dto.LoginRequest;
import com.scottphebert.personalwebsite.model.dto.RegistrationRequest;
import com.scottphebert.personalwebsite.model.dto.UserUpdateRequest;
import com.scottphebert.personalwebsite.repo.ZipcodeRepo;
import com.scottphebert.personalwebsite.service.security.JWTBlacklistService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserManagementServiceImpl implements UserManagementService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ZipcodeRepo zipcodeRepo;

    @Autowired
    private UserDetailsRepo userDetailsRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    JWTBlacklistService jwtBlacklistService;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private PasswordEncoder passwordEncoder;


    private static final Logger logger = LoggerFactory.getLogger(UserManagementServiceImpl.class);

    //Registers a new user, populating both the user and userdetails tables
    public ResponseEntity<String> registerUser(RegistrationRequest request){

        //check is username or email are already associated with a registered user
        if(userRepo.findByEmail(request.getEmail()).isPresent()){
            logger.warn(Constants.EMAIL_ALREADY_EXISTS_LOG, request.getEmail());
            return new ResponseEntity<>(Constants.USER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
        }
        else if(userRepo.findByUsername(request.getUsername()).isPresent()){
            logger.warn(Constants.USERNAME_TAKEN_LOG, request.getUsername());
            return new ResponseEntity<>(Constants.USERNAME_TAKEN, HttpStatus.BAD_REQUEST);
        }
        else if(!zipcodeRepo.existsByZip(request.getZipcode())){
            logger.warn(Constants.INVALID_ZIPCODE_LOG, request.getZipcode());
            return new ResponseEntity<>(Constants.INVALID_ZIPCODE, HttpStatus.BAD_REQUEST);
        }
        User user = new User();
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        UserDetails userDetails = new UserDetails();
        userDetails.setFirstName(request.getFirstName());
        userDetails.setLastName(request.getLastName());
        userDetails.setZipcode(request.getZipcode());
        userDetails.setUser(user);
        try{
            userRepo.save(user);
            userDetailsRepo.save((userDetails));
            logger.info(Constants.REGISTRATION_SUCCESS_LOG, request.getUsername());
            return new ResponseEntity<>(Constants.REGISTRATION_SUCCESS, HttpStatus.OK);
        }
        catch (Exception ex){
            logger.error(Constants.REGISTRATION_FAILED, request.getUsername(), ex.getMessage(), ex);
            return new ResponseEntity<>(Constants.REGISTRATION_FAILURE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //sets a new password in the case of a recovery scenario
    public ResponseEntity<String> updatePassword(UserUpdateRequest request, String authUser){
       User user = userRepo.findByEmail(request.getEmail())
               .orElseThrow(() -> new EntityNotFoundException(Constants.USER_NOT_FOUND_EMAIL + request.getEmail()));
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        try{
            //confirm auth token matches the one associated with the user in the request
            if(!request.getUsername().equals(authUser)){
                logger.warn(Constants.AUTH_MISMATCH_LOG, authUser);
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
            else{
                userRepo.save(user);
                logger.info(Constants.PASSWORD_UPDATE_SUCCESS_LOG, request.getEmail());
                return new ResponseEntity<>(Constants.UPDATE_PASSWORD_SUCCESS, HttpStatus.OK);
            }
        }
        catch (Exception ex){
            logger.error(Constants.PASSWORD_UPDATE_FAIL_LOG, request.getEmail(), ex.getMessage(), ex);
            return new ResponseEntity<>(Constants.UPDATE_PASSWORD_FAILURE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Checks if user exists, returning an authentication token for said user
    public ResponseEntity<JwtResponse> login(LoginRequest request, HttpServletResponse response){
        try{
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    request.getUsername(),request.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtTokenProvider.generateToken(request.getUsername());

            response.setHeader("Set-Cookie", "authToken=" + token + "; Path=/; HttpOnly; secure; SameSite=None");

            logger.info(Constants.LOGIN_SUCCESSFUL_LOG, request.getUsername());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception ex){
            logger.error(Constants.LOGIN_FAILED_LOG, request.getUsername(), ex.getMessage(), ex);
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    //blacklists authtoken in a  sign-out scenario
    public ResponseEntity<String>signOut(HttpServletRequest request, HttpServletResponse response){
        String authToken = jwtAuthenticationFilter.getToken(request);
        logger.info(Constants.SIGNOUT_REQUEST_LOG, authToken);
        if (authToken != null) {
            jwtBlacklistService.addToList(authToken.substring(7));
            logger.info(Constants.SIGN_OUT_SUCCESS_LOG, authToken);

            //send response to remove cookie from the client-side
            response.setHeader("Set-Cookie", "authToken=" + null + "; Path=/; HttpOnly; secure; SameSite=None");

            return new ResponseEntity<>(Constants.TOKEN_INVALIDATED, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    //checks if a token exists for user request
    public ResponseEntity<String> getLoginStatus(String username, String authUser) {
        try{
            //confirm auth token matches the one associated with the user in the request
            if(!username.equals(authUser)){
                logger.info(Constants.USER_NOT_LOGGED_ON_LOG, username);
                return new ResponseEntity<>(Constants.NOT_LOGGED_IN, HttpStatus.OK);
            }
            else{
                logger.info(Constants.USER_LOGGED_ON_LOG, username);
                return new ResponseEntity<>(Constants.LOGGED_IN, HttpStatus.OK);
            }
        }
        catch (Exception ex){
            logger.warn(Constants.LOGIN_STATUS_UNAVAILABLE_LOG, username, ex.getMessage(), ex);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //finds user details based on email
    public ResponseEntity<UserDetails> getUserDetails(String username, String authUser){
        try{
            //confirm auth token matches the one associated with the user in the request
            if(!username.equals(authUser)){
                logger.warn(Constants.AUTH_MISMATCH_LOG, authUser);
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
            else{
                User user = userRepo.findByUsername(username)
                    .orElseThrow(() -> new EntityNotFoundException(new EntityNotFoundException(Constants.USER_NOT_FOUND_USERNAME + username)));
                UserDetails userDetails = userDetailsRepo.findById(user.getId())
                    .orElseThrow(() -> new EntityNotFoundException(Constants.USER_DETAILS_NOT_FOUND + user.getId()));
                logger.info(Constants.USER_DETAILS_SUCCESS_LOG, username);
                return new ResponseEntity<>(userDetails, HttpStatus.OK);
            }
        }
        catch (EntityNotFoundException ex){
            logger.error(Constants.USER_DETAILS_FAIL_LOG, username, ex.getMessage(), ex);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
