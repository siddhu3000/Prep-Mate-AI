package com.aiinterviewprep.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:application.properties")
public class EnvConfig {
    @Value("${jwt.secret}")
    private String jwtSecret;
    
    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;
    
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.api.model}")
    private String geminiModel;
    
    public String getJwtSecret() {
        return jwtSecret;
    }
    
    public String getMongoUri() {
        System.out.println("Loading MongoDB URI from Spring properties: " + mongoUri);
        return mongoUri;
    }

    public String getGeminiApiKey() {
        return geminiApiKey;
    }

    public String getGeminiModel() {
        return geminiModel;
    }
} 
