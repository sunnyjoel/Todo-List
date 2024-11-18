package com.example.todo_app.services;

import com.example.todo_app.models.User;
import com.example.todo_app.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    // Constructor for dependency injection
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public void registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public Long loginUser(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user.get().getId();  // Return the user ID if authenticated
        }
        return null;
    }
}
