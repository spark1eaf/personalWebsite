package com.scottphebert.personalwebsite.controller;

import com.scottphebert.personalwebsite.common.Constants;
import com.scottphebert.personalwebsite.config.JwtResponse;
import com.scottphebert.personalwebsite.model.UserDetails;
import com.scottphebert.personalwebsite.service.dto.RegistrationRequest;
import com.scottphebert.personalwebsite.service.usermanagement.UserManagementService;
import com.scottphebert.personalwebsite.service.dto.LoginRequest;
import com.scottphebert.personalwebsite.service.dto.UserUpdateRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@RestController
@RequestMapping(Constants.SITE_PREFIX)
public class UserManagementController {

    @Autowired
    private UserManagementService userManagementService;

    private static final Logger logger = LoggerFactory.getLogger(UserManagementController.class);

    //Register a new user
    @PostMapping(Constants.REGISTRATION_URL)
    public ResponseEntity<String> registerUser(@RequestBody RegistrationRequest request){
        logger.info(Constants.REGISTRATION_REQUEST_LOG, request.getEmail());
        return userManagementService.registerUser(request);
    }

    //login user
    @PostMapping(Constants.LOGIN_URL)
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest request, HttpServletResponse response){
        logger.info(Constants.LOGIN_REQUEST_LOG, request.getUsername());
        return userManagementService.login(request, response);
    }

    //destroys token on user logout
    @PostMapping(Constants.SIGN_OUT_URL)
    public ResponseEntity<String> signOutUser(HttpServletRequest request, HttpServletResponse response) {
        return userManagementService.signOut(request, response);
    }

    //change password
    @PutMapping(Constants.CHANGE_PASSWORD_URL)
    public ResponseEntity<String> changePassword(@Valid @RequestBody UserUpdateRequest request, Authentication authentication, Principal principal){
        logger.info(Constants.CHANGE_PASSWORD_REQUEST_LOG, request.getEmail());
        return userManagementService.updatePassword(request, principal.getName());
    }

    //Send out recovery email to user, will figure out how I want to send this email at a later time.
    @PostMapping(Constants.PASSWORD_RECOVERY_URL)
    public boolean sendRecoveryEmail(@RequestParam String email){
        logger.info(Constants.RECOVERY_EMAIL_REQUEST_LOG, email);
        return true;
    }

    //get user details
    @GetMapping(Constants.GET_USER_DETAILS_URL)
    public ResponseEntity<UserDetails> getUserDetails(@RequestParam String username, Principal principal){
        logger.info(Constants.USER_DETAILS_REQUEST_LOG, username);
        return userManagementService.getUserDetails(username, principal.getName());
    }
}
