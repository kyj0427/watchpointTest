package com.watchpoint.backend.auth.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration

@EnableWebSecurity  // 추가: Spring Security 활성화
public class DevSecurityConfig {

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .csrf(AbstractHttpConfigurer::disable)                 // API 형태면 CSRF 비활성화(세션 기반이면 재검토)
      .cors(c -> c.configurationSource(corsConfig()))
      .authorizeHttpRequests(auth -> auth
        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()     // 프리플라이트
        .requestMatchers("/api/auth/**").permitAll()                // 이메일 인증/회원가입 등 공개
        .requestMatchers("/api/oauth/**").permitAll()                          // SNS 인증 활성화
        // .anyRequest().authenticated()                                        // 운영 전환 시 활성화
        .anyRequest().permitAll()                                                // 개발 중 전부 허용
      )
      .formLogin(AbstractHttpConfigurer::disable)
      .httpBasic(AbstractHttpConfigurer::disable)
      .exceptionHandling(e -> e.authenticationEntryPoint((req, res, ex) -> {
        res.setStatus(401);
        res.setContentType("application/json;charset=UTF-8");
        res.getWriter().write("{\"code\":\"NOT_LOGGED_IN\",\"message\":\"로그인이 필요합니다.\"}");
      }));

    return http.build();
  }

  @Bean
  public CorsConfigurationSource corsConfig() {
    CorsConfiguration cfg = new CorsConfiguration();
    // 개발 중 프론트/프록시 모두 허용
    cfg.setAllowedOrigins(List.of(
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:4000",
      "http://127.0.0.1:4000"
    ));
    cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
    cfg.setAllowedHeaders(List.of("*"));
    cfg.setAllowCredentials(true);
    // 응답 헤더 노출이 필요하면:
    // cfg.setExposedHeaders(List.of("Authorization"));
    UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
    src.registerCorsConfiguration("/**", cfg);
    return src;
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}