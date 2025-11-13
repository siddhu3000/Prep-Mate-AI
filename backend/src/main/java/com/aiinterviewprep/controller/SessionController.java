package com.aiinterviewprep.controller;

import com.aiinterviewprep.model.Session;
import com.aiinterviewprep.model.User;
import com.aiinterviewprep.service.SessionService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sessions")
@RequiredArgsConstructor
public class SessionController {
    private final SessionService sessionService;

    @PostMapping("/save")
    public ResponseEntity<?> saveSession(@RequestBody SaveSessionRequest req, @AuthenticationPrincipal User user) {
        try {
            sessionService.saveSession(
                user.getId(), 
                req.getDomain(),
                req.getDifficulty(),
                req.getQuestions(), 
                req.getAnswers(), 
                req.getFeedback()
            );
            return ResponseEntity.ok(Map.of("message", "Session saved successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to save session: " + e.getMessage()));
        }
    }

    @GetMapping("/history")
    public ResponseEntity<?> getSessions(@AuthenticationPrincipal User user) {
        try {
            List<Session> sessions = sessionService.getSessionsForUser(user.getId());
            return ResponseEntity.ok(sessions);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to fetch session history: " + e.getMessage()));
        }
    }

    @Data
    public static class SaveSessionRequest {
        private String domain;
        private String difficulty;
        private List<String> questions;
        private List<String> answers;
        private List<String> feedback;
    }
} 