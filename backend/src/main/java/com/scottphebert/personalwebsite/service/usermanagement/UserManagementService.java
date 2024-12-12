package com.scottphebert.personalwebsite.service.usermanagement;

import com.scottphebert.personalwebsite.config.JwtResponse;
import com.scottphebert.personalwebsite.model.entity.UserDetails;
import com.scottphebert.personalwebsite.model.dto.LoginRequest;
import com.scottphebert.personalwebsite.model.dto.RegistrationRequest;
import com.scottphebert.personalwebsite.model.dto.UserUpdateRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

import java.security.Principal;

public interface UserManagementService {
    ResponseEntity<String> registerUser(RegistrationRequest request);

    ResponseEntity<String> updatePassword(UserUpdateRequest request, String authUser);

    ResponseEntity<JwtResponse> login(LoginRequest request, HttpServletResponse response);

    ResponseEntity<String> getLoginStatus(String username, String authUser);

    ResponseEntity<String>signOut(HttpServletRequest request, HttpServletResponse response);

    ResponseEntity<UserDetails> getUserDetails(String username, String authUser);

}
