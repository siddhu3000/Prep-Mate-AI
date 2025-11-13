package com.aiinterviewprep.service;

import com.aiinterviewprep.config.EnvConfig;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import lombok.RequiredArgsConstructor;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Arrays;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final PromptService promptService;
    private final EnvConfig envConfig;
    private final WebClient.Builder webClientBuilder;
    private final ObjectMapper objectMapper;
    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent";
    private static final Pattern QUESTION_PATTERN = Pattern.compile("\\d+\\.\\s*([^\\n]+)");
    private static final int EXPECTED_QUESTIONS = 5;

    public List<String> generateQuestions(String domain, String difficulty) {
        String prompt = promptService.getQuestionPrompt()
            .replace("{domain}", domain)
            .replace("{difficulty}", difficulty);
            
        String model = envConfig.getGeminiModel();
        String apiKey = envConfig.getGeminiApiKey();
        
        System.out.println("\n=== Generating Questions ===");
        System.out.println("Using Gemini API:");
        System.out.println("Model: " + model);
        System.out.println("API Key: " + (apiKey != null ? apiKey.substring(0, Math.min(5, apiKey.length())) + "..." : "null"));
        System.out.println("Domain: " + domain);
        System.out.println("Difficulty: " + difficulty);
        System.out.println("\nPrompt:");
        System.out.println(prompt);
        System.out.println("\n=== Making API Request ===");
        
        try {
            // Prepare request body according to Gemini API format
            Map<String, Object> requestBody = new HashMap<>();
            Map<String, Object> content = new HashMap<>();
            Map<String, String> textPart = new HashMap<>();
            textPart.put("text", prompt);
            content.put("parts", Arrays.asList(textPart));
            requestBody.put("contents", Arrays.asList(content));
            
            System.out.println("Request body:");
            System.out.println(objectMapper.writeValueAsString(requestBody));
            
            // Make API call to Gemini
            String response = webClientBuilder.build()
                .post()
                .uri(String.format(GEMINI_API_URL, model))
                .header("x-goog-api-key", apiKey)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
            
            System.out.println("\n=== API Response ===");
            System.out.println("Raw response:");
            System.out.println(response);
            
            // Parse response
            Map<String, Object> responseMap = objectMapper.readValue(response, Map.class);
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseMap.get("candidates");
            Map<String, Object> content0 = (Map<String, Object>) candidates.get(0).get("content");
            List<Map<String, Object>> parts = (List<Map<String, Object>>) content0.get("parts");
            String text = (String) parts.get(0).get("text");
            
            System.out.println("\nParsed text response:");
            System.out.println(text);
            
            // Extract and validate questions
            List<String> questions = extractQuestions(text);
            
            // Validate questions
            if (!validateQuestions(questions)) {
                System.out.println("\n=== Invalid Questions Generated, Retrying... ===");
                return generateQuestions(domain, difficulty); // Recursive retry
            }
            
            System.out.println("\n=== Final Validated Questions ===");
            for (int i = 0; i < questions.size(); i++) {
                System.out.println((i + 1) + ". " + questions.get(i));
            }
            System.out.println("===========================\n");
            
            return questions;
            
        } catch (Exception e) {
            System.err.println("\n=== Error Generating Questions ===");
            System.err.println("Error message: " + e.getMessage());
            e.printStackTrace();
            System.err.println("===============================\n");
            return List.of("Error generating questions: " + e.getMessage());
        }
    }

    private List<String> extractQuestions(String text) {
        List<String> questions = new ArrayList<>();
        Matcher matcher = QUESTION_PATTERN.matcher(text);
        
        while (matcher.find()) {
            String question = matcher.group(1).trim();
            if (!question.isEmpty()) {
                // Clean up the question text
                question = question
                    .replaceAll("\\s+", " ")  // Normalize whitespace
                    .replaceAll("^\\s*-\\s*", "")  // Remove leading dash
                    .trim();
                questions.add(question);
            }
        }
        
        // If no questions found using regex, fall back to line splitting
        if (questions.isEmpty()) {
            System.out.println("\nNo questions found using regex, falling back to line splitting");
            questions = Arrays.stream(text.split("\\n"))
                .map(line -> line.replaceAll("^\\d+\\.\\s*", "").trim())
                .map(line -> line.replaceAll("^\\s*-\\s*", "").trim())
                .filter(line -> !line.isBlank())
                .map(line -> line.replaceAll("\\s+", " "))
                .toList();
        }
        
        return questions;
    }

    private boolean validateQuestions(List<String> questions) {
        if (questions.size() != EXPECTED_QUESTIONS) {
            System.out.println("Invalid number of questions: " + questions.size() + " (expected " + EXPECTED_QUESTIONS + ")");
            return false;
        }

        // Validate each question
        for (int i = 0; i < questions.size(); i++) {
            String question = questions.get(i);
            
            // Check minimum length (arbitrary but reasonable minimum)
            if (question.length() < 20) {
                System.out.println("Question " + (i + 1) + " is too short: " + question);
                return false;
            }
            
            // Check for common formatting issues
            if (question.contains("\n") || question.contains("\r")) {
                System.out.println("Question " + (i + 1) + " contains line breaks");
                return false;
            }
            
            // Check for incomplete sentences
            if (!question.matches(".*[.?]\\s*$")) {
                System.out.println("Question " + (i + 1) + " doesn't end with proper punctuation");
                return false;
            }
            
            // Check for duplicate questions
            for (int j = 0; j < i; j++) {
                if (questions.get(j).equalsIgnoreCase(question)) {
                    System.out.println("Duplicate question found: " + question);
                    return false;
                }
            }
        }
        
        return true;
    }
} 