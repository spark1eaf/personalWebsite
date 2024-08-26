package com.scott.personaWebsite.controller;

import com.scott.personaWebsite.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.scott.personaWebsite.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public String add(@RequestBody User user){
        userService.saveUser(user);
        return "New student is added";
    }

    @GetMapping("/getAll")
    public List<User> getAllStudents(){
        return userService.getAllUsers();
    }
}
