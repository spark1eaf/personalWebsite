package com.scottphebert.personalwebsite.service.usermanagement;

import com.scottphebert.personalwebsite.config.JwtResponse;
import com.scottphebert.personalwebsite.model.UserDetails;
import com.scottphebert.personalwebsite.service.dto.LoginRequest;
import com.scottphebert.personalwebsite.service.dto.RegistrationRequest;
import com.scottphebert.personalwebsite.service.dto.UserUpdateRequest;
import org.springframework.http.ResponseEntity;

public interface UserManagementService {
    ResponseEntity<String> registerUser(RegistrationRequest request);

    boolean updatePassword(UserUpdateRequest request);

    ResponseEntity<JwtResponse> login(LoginRequest request);

    ResponseEntity<String>signOut(String authToken);

    ResponseEntity<UserDetails> getUserDetails(String email);
}
