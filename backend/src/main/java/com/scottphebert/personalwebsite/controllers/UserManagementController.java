package com.scottphebert.personalwebsite.controllers;

import com.scottphebert.personalwebsite.common.Constants;
import com.scottphebert.personalwebsite.config.JwtResponse;
import com.scottphebert.personalwebsite.model.UserDetails;
import com.scottphebert.personalwebsite.service.dto.RegistrationRequest;
import com.scottphebert.personalwebsite.service.usermanagement.UserManagementService;
import com.scottphebert.personalwebsite.service.dto.LoginRequest;
import com.scottphebert.personalwebsite.service.dto.UserUpdateRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("")
public class UserManagementController {

    @Autowired
    private UserManagementService userManagementService;

    //Register a new user
    @PostMapping(Constants.REGISTRATION_URL)
    public ResponseEntity<String> registerUser(@RequestBody RegistrationRequest request){
        return userManagementService.registerUser(request);
    }

    //login user
    @PostMapping(Constants.LOGIN_URL)
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest request){
        return userManagementService.login(request);
    }

    //destroys token on user logout
    @PostMapping(Constants.SIGN_OUT_URL)
    public ResponseEntity<String> signOutUser(@RequestHeader(Constants.AUTHORIZATION) String token) {
        if (token == null || !token.startsWith(Constants.BEARER)) {
            return ResponseEntity.badRequest().body(Constants.INVALID_TOKEN);
        }
        System.out.println(Constants.SIGN_OUT_MESSAGE + token);

        // Call your service to handle token invalidation logic (e.g., blacklist)
        return userManagementService.signOut(token);
    }

    //change password
    @PutMapping(Constants.CHANGE_PASSWORD_URL)
    public boolean changePassword(@Valid @RequestBody UserUpdateRequest request, Authentication authentication){
        return userManagementService.updatePassword(request);
    }

    //check the valid on this one
    //Send out recovery email to user, will figure out how I want to send this email at a later time.
    @PostMapping(Constants.PASSWORD_RECOVERY_URL)
    public boolean sendRecoveryEmail(@Valid @RequestParam String email){
        return true;
    }

    //get user details
    @GetMapping(Constants.GET_USER_DETAILS_URL)
    public ResponseEntity<UserDetails> getUserDetails(@Valid @RequestParam String username){
        return userManagementService.getUserDetails(username);
    }
}
