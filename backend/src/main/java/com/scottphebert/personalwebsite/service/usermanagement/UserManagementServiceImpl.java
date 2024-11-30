package com.scottphebert.personalwebsite.service.usermanagement;

import com.scottphebert.personalwebsite.config.JwtResponse;
import com.scottphebert.personalwebsite.config.JwtTokenProvider;
import com.scottphebert.personalwebsite.model.User;
import com.scottphebert.personalwebsite.repo.UserRepo;
import com.scottphebert.personalwebsite.service.usermanagement.dto.LoginRequest;
import com.scottphebert.personalwebsite.service.usermanagement.dto.UserUpdateRequest;
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

import java.util.Optional;

@Service
public class UserManagementServiceImpl implements UserManagementService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //Registers a new user
    public ResponseEntity<String> registerUser(User user){

        if(userRepo.findByEmail(user.getEmail()).isPresent())
            return new ResponseEntity<>("User already exists for this email.", HttpStatus.BAD_REQUEST);

        if(userRepo.findByUsername(user.getUsername()).isPresent()){
            return new ResponseEntity<>("Username already exists.", HttpStatus.BAD_REQUEST);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);

        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);

    }

    //sets a new password in the case of a recovery scenario
    public boolean updatePassword(UserUpdateRequest request){
        Optional<User> user = userRepo.findByEmail(request.getEmail());
        if (user.isPresent()){
            //update password
            user.get().setPassword(passwordEncoder.encode(request.getPassword()));
            System.out.println("Password has been updated.");
            userRepo.save(user.get());
            return true;
        }
        else
            throw new EntityNotFoundException("No user present with email: " + request.getEmail());
    }

    //Checks if user exists, returning an authentication token for said user
    public ResponseEntity<JwtResponse> login(LoginRequest request){

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getUsername(),request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(request.getUsername());

        return new ResponseEntity<>(new JwtResponse(token), HttpStatus.OK);
    }
}
