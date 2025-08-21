package com.watchpoint.backend.auth.config;

import org.springframework.context.annotation.*;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.*;
import java.util.List;

@Configuration

@EnableWebSecurity  // 추가: Spring Security 활성화
public class DevSecurityConfig {

    //api/auth/** 전용 체인
    @Bean
    @Order(0)
    public SecurityFilterChain authOpenChain(HttpSecurity http) throws Exception {
        http
        .securityMatcher("/api/auth/**")                    // 이 경로만 이 체인이 처리
        .csrf(AbstractHttpConfigurer::disable)
        .cors(c -> c.configurationSource(corsDev()))
        .authorizeHttpRequests(a -> a
            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // 프리플라이트 허용
            .anyRequest().permitAll()                               // 익명 허용
        )
        .formLogin(AbstractHttpConfigurer::disable)
        .httpBasic(AbstractHttpConfigurer::disable);
        return http.build();
    }
    @Bean
    @Order(1)
    public SecurityFilterChain appChain(HttpSecurity http) throws Exception {
        http
        .csrf(AbstractHttpConfigurer::disable)
        .cors(c -> c.configurationSource(corsDev()))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            // .anyRequest().authenticated()
            .anyRequest().permitAll()  //임시 전부 허용
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
    public CorsConfigurationSource corsDev() {
        CorsConfiguration cfg = new CorsConfiguration();
        cfg.setAllowedOrigins(List.of("http://localhost:3000"));
        cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        cfg.setAllowedHeaders(List.of("*"));  
        cfg.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
        src.registerCorsConfiguration("/**", cfg);
        return src;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {  // 추가: 비밀번호 암호화
        return new BCryptPasswordEncoder();
    }
    
    @Bean
public org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer web() {
  return (web) -> web.ignoring().requestMatchers("/api/auth/**"); // ⬅ 완전 우회(디버그용)
}
}
