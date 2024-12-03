package com.scottphebert.personalwebsite.service.usermanagement;

import com.scottphebert.personalwebsite.config.JwtResponse;
import com.scottphebert.personalwebsite.model.User;
import com.scottphebert.personalwebsite.service.dto.LoginRequest;
import com.scottphebert.personalwebsite.service.dto.RegistrationRequest;
import com.scottphebert.personalwebsite.service.dto.UserUpdateRequest;
import org.springframework.http.ResponseEntity;

public interface UserManagementService {
    public ResponseEntity<String> registerUser(RegistrationRequest request);

    public boolean updatePassword(UserUpdateRequest request);

    public ResponseEntity<JwtResponse> login(LoginRequest request);

    public ResponseEntity<String>signout(String authToken);

    public void getUserDetails(String email);
}
