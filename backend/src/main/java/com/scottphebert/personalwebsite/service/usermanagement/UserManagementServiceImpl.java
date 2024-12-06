package com.scottphebert.personalwebsite.service.usermanagement;

import com.scottphebert.personalwebsite.common.Constants;
import com.scottphebert.personalwebsite.config.JwtResponse;
import com.scottphebert.personalwebsite.config.JwtTokenProvider;
import com.scottphebert.personalwebsite.model.User;
import com.scottphebert.personalwebsite.model.UserDetails;
import com.scottphebert.personalwebsite.repo.UserDetailsRepo;
import com.scottphebert.personalwebsite.repo.UserRepo;
import com.scottphebert.personalwebsite.service.dto.LoginRequest;
import com.scottphebert.personalwebsite.service.dto.RegistrationRequest;
import com.scottphebert.personalwebsite.service.dto.UserUpdateRequest;
import com.scottphebert.personalwebsite.service.security.JWTBlacklistService;
import jakarta.persistence.EntityNotFoundException;
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
    private UserDetailsRepo userDetailsRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    JWTBlacklistService jwtBlacklistService;

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
            logger.error(Constants.REGISTRATION_FAILED, request.getUsername(), ex);
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
            logger.error(Constants.PASSWORD_UPDATE_FAIL_LOG, request.getEmail(), ex);
            return new ResponseEntity<>(Constants.UPDATE_PASSWORD_FAILURE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Checks if user exists, returning an authentication token for said user
    public ResponseEntity<JwtResponse> login(LoginRequest request){
        try{
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    request.getUsername(),request.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtTokenProvider.generateToken(request.getUsername());
            logger.info(Constants.LOGIN_SUCCESSFUL_LOG, request.getUsername());
            return new ResponseEntity<>(new JwtResponse(token), HttpStatus.OK);
        }
        catch (Exception ex){
            logger.error(Constants.LOGIN_FAILED_LOG, request.getUsername(), ex);
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    //blacklists authtoken in a  sign-out scenario
    public ResponseEntity<String>signOut(String authToken){
        if (authToken == null || !authToken.startsWith(Constants.BEARER)) {
            logger.warn(Constants.INVALID_SIGNOUT_TOKEN_LOG, authToken);
            return ResponseEntity.badRequest().body(Constants.INVALID_TOKEN);
        }
        else{
            jwtBlacklistService.addToList(authToken.substring(7));
            logger.info(Constants.SIGN_OUT_SUCCESS_LOG, authToken);
            return new ResponseEntity<>(Constants.TOKEN_INVALIDATED, HttpStatus.OK);
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
        catch (Exception ex){
            logger.error(Constants.USER_DETAILS_FAIL_LOG, username, ex);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
