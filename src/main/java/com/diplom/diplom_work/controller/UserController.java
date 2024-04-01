package com.diplom.diplom_work.controller;

import com.diplom.diplom_work.model.User;
import com.diplom.diplom_work.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
    @GetMapping("/admin")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> usersListDto = userService.getAllUsers();
        return ResponseEntity.ok(usersListDto);
    }
}
