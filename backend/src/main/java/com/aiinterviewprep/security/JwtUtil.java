package com.aiinterviewprep.security;

import com.aiinterviewprep.config.EnvConfig;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    private final EnvConfig envConfig;
    private final long jwtExpirationMs = 86400000; // 1 day

    public JwtUtil(EnvConfig envConfig) {
        this.envConfig = envConfig;
    }

    public String generateToken(String userId) {
        return Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(Keys.hmacShaKeyFor(envConfig.getJwtSecret().getBytes()), SignatureAlgorithm.HS512)
                .compact();
    }

    public String getUserIdFromJwt(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(envConfig.getJwtSecret().getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(envConfig.getJwtSecret().getBytes()))
                    .build()
                    .parseClaimsJws(authToken);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
} 