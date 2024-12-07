package com.scottphebert.personalwebsite.service.usermanagement;

import com.scottphebert.personalwebsite.config.JwtResponse;
import com.scottphebert.personalwebsite.model.UserDetails;
import com.scottphebert.personalwebsite.service.dto.LoginRequest;
import com.scottphebert.personalwebsite.service.dto.RegistrationRequest;
import com.scottphebert.personalwebsite.service.dto.UserUpdateRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface UserManagementService {
    ResponseEntity<String> registerUser(RegistrationRequest request);

    ResponseEntity<String> updatePassword(UserUpdateRequest request, String authUser);

    ResponseEntity<JwtResponse> login(LoginRequest request, HttpServletResponse response);

    ResponseEntity<String>signOut(HttpServletRequest request, HttpServletResponse response);

    ResponseEntity<UserDetails> getUserDetails(String email, String authUser);
}
