package com.aiinterviewprep.repository;

import com.aiinterviewprep.model.Session;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface SessionRepository extends MongoRepository<Session, String> {
    List<Session> findByUserIdOrderByCreatedAtDesc(String userId);
} 