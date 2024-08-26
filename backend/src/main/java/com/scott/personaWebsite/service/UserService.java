package com.scott.personaWebsite.service;

import com.scott.personaWebsite.model.User;

import java.util.List;

public interface UserService {
    public User saveUser(User user);

    public List<User> getAllUsers();

}
