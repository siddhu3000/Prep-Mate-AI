package com.aiinterviewprep.service;

import com.aiinterviewprep.model.Session;
import com.aiinterviewprep.repository.SessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SessionService {
    private final SessionRepository sessionRepository;

    public Session saveSession(String userId, String domain, String difficulty, List<String> questions, List<String> answers, List<String> feedback) {
        try {
            // Store feedback as strings directly - no need to parse them here
            // The frontend will handle parsing when displaying
            Session session = Session.builder()
                    .userId(userId)
                    .domain(domain)
                    .difficulty(difficulty)
                    .questions(questions)
                    .answers(answers)
                    .feedback(feedback) // Store as List<String> directly
                    .createdAt(Instant.now())
                    .build();
            return sessionRepository.save(session);
        } catch (Exception e) {
            System.err.println("Error saving session: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to save session: " + e.getMessage());
        }
    }

    public List<Session> getSessionsForUser(String userId) {
        return sessionRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
} 