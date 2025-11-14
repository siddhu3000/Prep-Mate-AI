package com.aiinterviewprep.controller;

import com.aiinterviewprep.model.User;
import com.aiinterviewprep.service.QuestionService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class QuestionController {
    private final QuestionService questionService;

    @PostMapping("/generate")
    public ResponseEntity<?> generateQuestions(@RequestBody DomainRequest req, @AuthenticationPrincipal User user) {
        try {
            if (req.getDomain() == null || req.getDomain().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Domain is required"));
            }
            
            if (req.getDifficulty() == null || req.getDifficulty().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Difficulty is required"));
            }
            
            List<String> questions = questionService.generateQuestions(req.getDomain(), req.getDifficulty());
            
            if (questions.size() == 1 && questions.get(0).startsWith("Error")) {
                return ResponseEntity.internalServerError().body(Map.of("error", questions.get(0)));
            }
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "questions", questions,
                "domain", req.getDomain(),
                "difficulty", req.getDifficulty()
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("error", "Failed to generate questions: " + e.getMessage()));
        }
    }

    @Data
    public static class DomainRequest {
        private String domain;
        private String difficulty;
    }
} 