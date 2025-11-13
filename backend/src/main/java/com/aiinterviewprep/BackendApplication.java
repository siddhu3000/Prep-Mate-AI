package com.aiinterviewprep;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.StandardEnvironment;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.core.env.MapPropertySource;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class BackendApplication {
    public static void main(String[] args) {
        // Load .env file into environment variables for local dev
        System.out.println("Current working directory: " + System.getProperty("user.dir"));
        System.out.println("Loading .env file...");
        
        // Load .env file
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
        
        // Create Spring application
        SpringApplication app = new SpringApplication(BackendApplication.class);
        
        // Create environment
        ConfigurableEnvironment environment = new StandardEnvironment();
        MutablePropertySources propertySources = environment.getPropertySources();
        
        // Create a map of environment variables
        Map<String, Object> envMap = new HashMap<>();
        
        // Set MongoDB URI with default value if not found in .env
        String mongoUri = dotenv.get("MONGODB_URI");
        if (mongoUri == null || mongoUri.trim().isEmpty()) {
            mongoUri = "mongodb+srv://admin:admin@mock-ai-interview-app.5b1crbm.mongodb.net/ai_interview_app?retryWrites=true&w=majority&serverSelectionTimeoutMS=5000";
        }
        envMap.put("MONGODB_URI", mongoUri);
        
        // Set other environment variables
        envMap.put("JWT_SECRET", dotenv.get("JWT_SECRET"));
        envMap.put("GEMINI_API_KEY", dotenv.get("GEMINI_API_KEY"));
        
        // Add environment variables to Spring's environment
        propertySources.addFirst(new MapPropertySource("dotenvProperties", envMap));
        
        // Set the environment
        app.setEnvironment(environment);
        
        // Log loaded variables (masking sensitive values)
        System.out.println("Environment variables loaded:");
        System.out.println("MONGODB_URI: " + (envMap.get("MONGODB_URI") != null ? "***" : "null"));
        System.out.println("JWT_SECRET: " + (envMap.get("JWT_SECRET") != null ? "***" : "null"));
        System.out.println("GEMINI_API_KEY: " + (envMap.get("GEMINI_API_KEY") != null ? 
            ((String)envMap.get("GEMINI_API_KEY")).substring(0, Math.min(5, ((String)envMap.get("GEMINI_API_KEY")).length())) + "..." : "null"));
        
        // Run the application
        app.run(args);
    }
} 