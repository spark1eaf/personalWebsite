package com.scottphebert.personalwebsite.service.usermanagement;

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

import java.util.Optional;

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
            return new ResponseEntity<>("User already exists for this email.", HttpStatus.BAD_REQUEST);
        else if(userRepo.findByUsername(request.getUsername()).isPresent()){
            return new ResponseEntity<>("Username already exists.", HttpStatus.BAD_REQUEST);
        }
        User user = new User();
        UserDetails userDetails = new UserDetails();
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userDetails.setName(request.getName());
        userDetails.setZipcode(request.getZipcode());
        user.setUserDetails(userDetails);
        userDetails.setUser(user);

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

    //blacklists authtoken a signout scenario
    public ResponseEntity<String>signout(String authToken){
        jwtBlacklistService.addToList(authToken.substring(7));
        return new ResponseEntity<>("Token has been invalidated", HttpStatus.OK);
    }

    //finds user details based on email
    public void getUserDetails(String email){
        Optional<User> user = userRepo.findByEmail(email);
        if(user.isPresent()){
            long id = user.get().getId();
            Optional<UserDetails> userDetails = userDetailsRepo.findById(id);
            if(userDetails.isPresent()){
                //generate a response to send to the frontend
            }
            else
                throw new EntityNotFoundException("User details not found for user with id: " + String.valueOf(id));

        }
        else
            throw new EntityNotFoundException("No user present with email: " + email);
    }
}
