package com.example.todo_app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
public class SecurityConfig {
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Disable CSRF and CORS, and configure URL access
        http
                .csrf(csrf -> csrf.disable())  // Disable CSRF
                .cors(cors -> cors.disable())   // Disable CORS
                .authorizeHttpRequests(authz -> authz.anyRequest().permitAll());  // Allow all requests

        return http.build();
    }
}
