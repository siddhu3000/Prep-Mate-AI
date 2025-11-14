package com.aiinterviewprep.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class PromptService {
    public String getQuestionPrompt() {
        return readPrompt("prompts/question_prompt.txt");
    }
    
    public String getFeedbackPrompt() {
        return readPrompt("prompts/feedback_prompt.txt");
    }
    
    private String readPrompt(String path) {
        try {
            Path filePath = new ClassPathResource(path).getFile().toPath();
            String content = Files.readString(filePath);
            // Replace newlines with spaces and normalize whitespace
            return content.replaceAll("\\r\\n|\\r|\\n", " ").replaceAll("\\s+", " ").trim();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }
} 