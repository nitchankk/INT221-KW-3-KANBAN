package com.example.integradeproject.controllers;

import com.example.integradeproject.services.UserService;
import com.example.integradeproject.user_account.LoginRequest;
import com.example.integradeproject.user_account.User;
import com.example.integradeproject.user_account.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        List<String> errors = new ArrayList<>();

        // Validate username
        if (loginRequest.getUserName() == null || loginRequest.getUserName().isEmpty()) {
            errors.add("Username cannot be empty");
        } else if (loginRequest.getUserName().length() > 50) {
            errors.add("Username must be at most 50 characters long");
        }

        // Validate password
        if (loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()) {
            errors.add("Password cannot be empty");
        } else if (loginRequest.getPassword().length() > 14) {
            errors.add("Password must be at most 14 characters long");
        }

        // If there are validation errors, return them all
        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(String.join(", ", errors));
        }

        // If validation passes, proceed with authentication
        User user = userRepository.findByUsername(loginRequest.getUserName());

        if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("The username or password is incorrect.");
        }
    }
}
