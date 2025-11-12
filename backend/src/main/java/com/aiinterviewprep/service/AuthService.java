package com.aiinterviewprep.service;

import com.aiinterviewprep.model.User;
import com.aiinterviewprep.repository.UserRepository;
import com.aiinterviewprep.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Optional<User> register(String username, String email, String password) {
        if (userRepository.findByUsername(username).isPresent() || userRepository.findByEmail(email).isPresent()) {
            return Optional.empty();
        }
        User user = User.builder()
                .username(username)
                .email(email)
                .passwordHash(passwordEncoder.encode(password))
                .build();
        return Optional.of(userRepository.save(user));
    }

    public Optional<String> login(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        // System.out.println("User from DB: " + userOpt.get());
        // System.out.println("Password matches: " + passwordEncoder.matches(password, userOpt.get().getPasswordHash()));
        if (userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPasswordHash())) {
            return Optional.of(jwtUtil.generateToken(userOpt.get().getId()));
        }
        return Optional.empty();
    }

    public Optional<User> getUserById(String userId) {
        return userRepository.findById(userId);
    }
} 
