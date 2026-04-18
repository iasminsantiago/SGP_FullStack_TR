package br.com.treinarecife.sgp.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private final String SECRET = "chave-super-secreta-para-jwt-sgp-api-2026-treinarecife-curso-java";

    // private Key getKey() {
    //     return Keys.hmacShaKeyFor(SECRET.getBytes());
    // }

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    public String gerarToken(String email) {

        return Jwts.builder().subject(email).issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 86400000)).signWith(getKey())
                .compact();
    }

    public String validarToken(String token) {

        return Jwts.parser().verifyWith(getKey()).build().parseSignedClaims(token).getPayload()
                .getSubject();
    }
}
