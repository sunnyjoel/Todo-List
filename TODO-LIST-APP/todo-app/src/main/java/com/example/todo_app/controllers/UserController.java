package com.example.todo_app.controllers;

import com.example.todo_app.models.User;
import com.example.todo_app.services.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") // Allow CORS only for this origin
public class UserController {

    private final UserService userService;

    // Constructor for dependency injection
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        Long userId = userService.loginUser(user.getUsername(), user.getPassword());
        if (userId != null) {
            // Return userId upon successful login
//            return ResponseEntity.ok(userId);
            // Wrap the userId in a JSON-friendly response
            Map<String, Object> response = new HashMap<>();
            response.put("userId", userId);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

}
