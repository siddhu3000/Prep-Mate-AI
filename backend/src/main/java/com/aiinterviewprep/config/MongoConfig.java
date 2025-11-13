package com.aiinterviewprep.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "com.aiinterviewprep.repository")
public class MongoConfig extends AbstractMongoClientConfiguration {

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @Value("${spring.data.mongodb.database}")
    private String mongoDatabase;

    @Override
    protected String getDatabaseName() {
        return mongoDatabase;
    }

    @Override
    @Bean
    public MongoClient mongoClient() {
        try {
            System.out.println("Connecting to MongoDB with URI: " + mongoUri);
            ConnectionString connectionString = new ConnectionString(mongoUri);
            MongoClientSettings mongoClientSettings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .build();
            return MongoClients.create(mongoClientSettings);
        } catch (Exception e) {
            System.err.println("Error connecting to MongoDB: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Bean
    public MongoTemplate mongoTemplate() throws Exception {
        try {
            return new MongoTemplate(mongoClient(), getDatabaseName());
        } catch (Exception e) {
            System.err.println("Error creating MongoTemplate: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
} 