package com.barpil.tasktableapp.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class JwtTokenService {

    private final JwtEncoder encoder;
    private final JwtDecoder decoder;

    @Autowired
    public JwtTokenService(JwtEncoder jwtEncoder, JwtDecoder jwtDecoder) {
        this.encoder = jwtEncoder;
        this.decoder = jwtDecoder;
    }

    public String generateToken(String email){
        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("task-table-app")
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.DAYS))
                .subject(email)
                .build();
        JwsHeader jwsHeader = JwsHeader.with(() -> "HS256").build();
        return encoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).getTokenValue();
    }

    public boolean validateToken(String token){
        try{
            Instant expireTime = decoder.decode(token).getExpiresAt();
            if(expireTime == null) return false;
            return expireTime.isAfter(Instant.now());
        } catch (JwtException e){
            return false;
        }
    }

    public String getLoggedUsersEmail(String token){
        return decoder.decode(token).getSubject();
    }
}
