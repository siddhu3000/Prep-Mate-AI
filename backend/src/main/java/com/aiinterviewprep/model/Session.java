package com.aiinterviewprep.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "sessions")
public class Session {
    @Id
    private String id;
    private String userId;
    private String domain;
    private String difficulty;
    private List<String> questions;
    private List<String> answers;
    private List<String> feedback; // Store as JSON strings
    private Instant createdAt;
} 