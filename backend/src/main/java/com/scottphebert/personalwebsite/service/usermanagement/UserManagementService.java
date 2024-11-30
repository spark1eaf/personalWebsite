package com.scottphebert.personalwebsite.service.usermanagement;

import com.scottphebert.personalwebsite.config.JwtResponse;
import com.scottphebert.personalwebsite.model.User;
import com.scottphebert.personalwebsite.service.usermanagement.dto.LoginRequest;
import com.scottphebert.personalwebsite.service.usermanagement.dto.UserUpdateRequest;
import org.springframework.http.ResponseEntity;

public interface UserManagementService {
    public ResponseEntity<String> registerUser(User user);

    public boolean updatePassword(UserUpdateRequest request);

    public ResponseEntity<JwtResponse> login(LoginRequest request);
}
