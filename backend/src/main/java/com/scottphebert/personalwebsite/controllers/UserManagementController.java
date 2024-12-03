package com.scottphebert.personalwebsite.controllers;

import com.scottphebert.personalwebsite.config.JwtResponse;
import com.scottphebert.personalwebsite.model.User;
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
@CrossOrigin
public class UserManagementController {

    @Autowired
    private UserManagementService userManagementService;

    //Register a new user
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegistrationRequest request){
        return userManagementService.registerUser(request);
    }

    //login user
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest request){
        return userManagementService.login(request);
    }

    //destroys token on user logout
    @PostMapping("/signout")
    public ResponseEntity<String> signoutUser(@RequestHeader("Authorization") String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Invalid token format");
        }
        System.out.println("Logging out user with token: " + token);

        // Call your service to handle token invalidation logic (e.g., blacklist)
        return userManagementService.signout(token);
    }

    //change password
    @PutMapping("/changepass")
    public boolean changePassword(@Valid @RequestBody UserUpdateRequest request, Authentication authentication){
        return userManagementService.updatePassword(request);
    }

    //check the valid on this one
    //Send out recovery email to user, will figure out how I want to send this email at a later time.
    @PostMapping("/recovery")
    public boolean sendRecoveryEmail(@Valid @RequestBody String email){
        return true;
    }

    //get user details
    @GetMapping("/getUserDetails")
    public void getUserDetails(@Valid @RequestBody String username){
//        return userManagementService.getUserDetails(username);
    }
}
