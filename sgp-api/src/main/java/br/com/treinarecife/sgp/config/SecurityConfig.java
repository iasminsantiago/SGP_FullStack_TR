package br.com.treinarecife.sgp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import br.com.treinarecife.sgp.security.JwtFilter;

@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.cors(cors -> cors.configure(http))
            .csrf(csrf -> csrf.disable())
                .headers(headers -> headers.frameOptions(frame -> frame.disable()))
                .authorizeHttpRequests(
                        auth -> auth
                                .requestMatchers(
                                        "/login",
                                        "/h2/**",
                                        "/h2-console/**",
                                        // Swagger
                                        "/v3/api-docs/**",
                                        "/api-docs/**",
                                        "/swagger-ui/**",
                                        "/swagger-ui.html",
                                        "/swagger-resources/**",
                                        "/webjars/**"
                                    )
                                .permitAll().anyRequest().authenticated())
                .addFilterBefore(jwtFilter,
                        org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
