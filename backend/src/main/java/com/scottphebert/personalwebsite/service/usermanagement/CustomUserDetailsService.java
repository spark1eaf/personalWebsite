package com.scottphebert.personalwebsite.service.usermanagement;

import com.scottphebert.personalwebsite.common.Constants;
import com.scottphebert.personalwebsite.model.entity.User;
import com.scottphebert.personalwebsite.repo.UserRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws EntityNotFoundException {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException(Constants.USER_NOT_FOUND_USERNAME + username));
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                new ArrayList<>());
    }
}
