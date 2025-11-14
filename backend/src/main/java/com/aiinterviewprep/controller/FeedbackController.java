package com.aiinterviewprep.controller;

import com.aiinterviewprep.model.User;
import com.aiinterviewprep.service.FeedbackService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FeedbackController {
    private final FeedbackService feedbackService;

    @PostMapping("/get")
    public ResponseEntity<?> getFeedback(@RequestBody FeedbackRequest req, @AuthenticationPrincipal User user) {
        try {
            List<Map<String, String>> feedback = feedbackService.generateFeedback(req.getQuestions(), req.getAnswers());
            return ResponseEntity.ok(Map.of("feedback", feedback));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to generate feedback: " + e.getMessage()));
        }
    }

    @Data
    public static class FeedbackRequest {
        private List<String> questions;
        private List<String> answers;
    }
} 