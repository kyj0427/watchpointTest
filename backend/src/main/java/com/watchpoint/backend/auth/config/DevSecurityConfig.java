package com.watchpoint.backend.auth.config;

import org.springframework.context.annotation.*;
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

    @Bean
    public SecurityFilterChain securityFilterChainDev(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)       // CSRF disable
            .cors(c -> c.configurationSource(corsDev()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/register", "/api/auth/login", "/api/auth/logout", "/api/auth/check").permitAll()
                .requestMatchers("/api/auth/me").authenticated() // me 는 보호(인증 필요) 
                .anyRequest().authenticated()
            )
            .formLogin(AbstractHttpConfigurer::disable)
            .httpBasic(AbstractHttpConfigurer::disable)
            .sessionManagement(s -> s
                .sessionFixation().migrateSession()
                .maximumSessions(1)  // 추가: 동시 세션 제한
                .maxSessionsPreventsLogin(false)  // 새 로그인시 기존 세션 만료
            )
            // .logout(l -> l
            //     .logoutUrl("/api/auth/logout")
            //     .invalidateHttpSession(true)
            //     .clearAuthentication(true)
            //     .deleteCookies("JSESSIONID","remember")
            //     .logoutSuccessHandler((req,res,auth) -> res.setStatus(204)) // 204 No Content
            // )
            // 인증 안 된 상태로 보호 리소스 접근 시 401을 JSON으로 통일
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
}