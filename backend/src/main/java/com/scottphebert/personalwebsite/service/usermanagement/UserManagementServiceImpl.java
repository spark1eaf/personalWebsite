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

    //Registers a new user, populating both the user and userdetails tables
    public ResponseEntity<String> registerUser(RegistrationRequest request){

        //check is username or email are already associated with a registered user
        if(userRepo.findByEmail(request.getEmail()).isPresent())
            return new ResponseEntity<>(Constants.USER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
        else if(userRepo.findByUsername(request.getUsername()).isPresent()){
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

        userRepo.save(user);
        userDetailsRepo.save((userDetails));

        return new ResponseEntity<>(Constants.REGISTRATION_SUCCESS, HttpStatus.OK);
    }

    //sets a new password in the case of a recovery scenario
    public boolean updatePassword(UserUpdateRequest request){
    //todo need to add checks here to ensure user can only change their own password
       User user = userRepo.findByEmail(request.getEmail())
               .orElseThrow(() -> new EntityNotFoundException(Constants.USER_NOT_FOUND_EMAIL + request.getEmail()));
       //update password
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        System.out.println(Constants.PASSWORD_UPDATED);
        userRepo.save(user);
        return true;
    }

    //Checks if user exists, returning an authentication token for said user
    public ResponseEntity<JwtResponse> login(LoginRequest request){

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getUsername(),request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(request.getUsername());

        return new ResponseEntity<>(new JwtResponse(token), HttpStatus.OK);
    }

    //blacklists authtoken in a  sign-out scenario
    public ResponseEntity<String>signOut(String authToken){
        jwtBlacklistService.addToList(authToken.substring(7));
        return new ResponseEntity<>(Constants.TOKEN_INVALIDATED, HttpStatus.OK);
    }

    //finds user details based on email
    public ResponseEntity<UserDetails> getUserDetails(String username){
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException(new EntityNotFoundException(Constants.USER_NOT_FOUND_USERNAME + username)));
        UserDetails userDetails = userDetailsRepo.findById(user.getId())
                .orElseThrow(() -> new EntityNotFoundException(Constants.USER_DETAILS_NOT_FOUND + user.getId()));
            return ResponseEntity.ok(userDetails);
    }
}
