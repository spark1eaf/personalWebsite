package com.scott.personaWebsite.service;

import com.scott.personaWebsite.model.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);

    List<User> getAllUsers();

}
