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
public class FeedbackService {
    private final PromptService promptService;
    private final EnvConfig envConfig;
    private final WebClient.Builder webClientBuilder;
    private final ObjectMapper objectMapper;
    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent";

    public List<Map<String, String>> generateFeedback(List<String> questions, List<String> answers) {
        StringBuilder sb = new StringBuilder();
        sb.append(promptService.getFeedbackPrompt()).append("\n\n");
        for (int i = 0; i < questions.size(); i++) {
            sb.append("Q").append(i + 1).append(": ").append(questions.get(i)).append("\n");
            sb.append("A").append(i + 1).append(": ").append(answers.get(i)).append("\n\n");
        }
        
        String model = envConfig.getGeminiModel();
        String apiKey = envConfig.getGeminiApiKey();
        
        System.out.println("\n=== Generating Feedback ===");
        System.out.println("Using Gemini API:");
        System.out.println("Model: " + model);
        System.out.println("API Key: " + (apiKey != null ? apiKey.substring(0, Math.min(5, apiKey.length())) + "..." : "null"));
        
        try {
            // Prepare request body according to Gemini API format
            Map<String, Object> requestBody = new HashMap<>();
            Map<String, Object> content = new HashMap<>();
            Map<String, String> textPart = new HashMap<>();
            textPart.put("text", sb.toString());
            content.put("parts", Arrays.asList(textPart));
            requestBody.put("contents", Arrays.asList(content));
            
            System.out.println("\nRequest body:");
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
            
            // Extract JSON array from the response text
            String jsonText = extractJsonFromText(text);
            System.out.println("\nExtracted JSON:");
            System.out.println(jsonText);
            
            // Parse the JSON array
            try {
                List<Map<String, String>> feedbackList = objectMapper.readValue(jsonText, List.class);
                
                // Validate feedback structure
                if (!validateFeedback(feedbackList)) {
                    throw new Exception("Invalid feedback structure");
                }
                
                return feedbackList;
            } catch (Exception e) {
                System.err.println("Error parsing feedback JSON: " + e.getMessage());
                e.printStackTrace();
                // Fallback to simple text feedback
                return List.of(Map.of(
                    "answerProvided", "Error parsing feedback",
                    "technicalAccuracy", "Error parsing feedback",
                    "completeness", "Error parsing feedback",
                    "areasOfImprovement", "Error parsing feedback",
                    "suggestions", "Error parsing feedback: " + e.getMessage()
                ));
            }
            
        } catch (Exception e) {
            System.err.println("\n=== Error Generating Feedback ===");
            System.err.println("Error message: " + e.getMessage());
            e.printStackTrace();
            System.err.println("===============================\n");
            return List.of(Map.of(
                "answerProvided", "Error generating feedback",
                "technicalAccuracy", "Error generating feedback",
                "completeness", "Error generating feedback",
                "areasOfImprovement", "Error generating feedback",
                "suggestions", "Error generating feedback: " + e.getMessage()
            ));
        }
    }

    private String extractJsonFromText(String text) {
        // First try to find JSON array between ```json and ``` markers
        Pattern pattern = Pattern.compile("```json\\s*(\\[.*?\\])\\s*```", Pattern.DOTALL);
        Matcher matcher = pattern.matcher(text);
        
        if (matcher.find()) {
            return matcher.group(1).trim();
        }
        
        // If not found, try to find any JSON array in the text
        pattern = Pattern.compile("\\[\\s*\\{.*?\\}\\s*\\]", Pattern.DOTALL);
        matcher = pattern.matcher(text);
        
        if (matcher.find()) {
            return matcher.group(0).trim();
        }
        
        throw new IllegalArgumentException("No JSON array found in response");
    }

    private boolean validateFeedback(List<Map<String, String>> feedback) {
        if (feedback == null || feedback.isEmpty()) {
            System.out.println("Feedback list is null or empty");
            return false;
        }

        for (Map<String, String> item : feedback) {
            // Check for required fields
            String[] requiredFields = {
                "answerProvided",
                "technicalAccuracy",
                "completeness",
                "areasOfImprovement",
                "suggestions"
            };

            for (String field : requiredFields) {
                if (!item.containsKey(field) || item.get(field) == null || item.get(field).trim().isEmpty()) {
                    System.out.println("Missing or empty required field: " + field);
                    return false;
                }
            }
        }

        return true;
    }
} 