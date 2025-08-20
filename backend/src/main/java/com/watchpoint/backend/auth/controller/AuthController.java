package com.watchpoint.backend.auth.controller;

import com.watchpoint.backend.auth.dto.ErrorRes;
import com.watchpoint.backend.auth.dto.LoginReq;
import com.watchpoint.backend.auth.dto.MemberRes;
import com.watchpoint.backend.auth.dto.RegisterReq;
import com.watchpoint.backend.auth.service.AuthService;
import com.watchpoint.backend.member.domain.Member;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // 회원가입: 중복이면 409, 성공 시 MemberRes 반환 
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterReq req) {
        try {
            Member saved = authService.register(req.getName(), req.getEmail(), req.getOriginalPassword());
            return ResponseEntity.ok(MemberRes.from(saved));
        } catch (IllegalStateException e) {
            if ("EMAIL_EXISTS".equals(e.getMessage())) {
                return ResponseEntity.status(409).body(new ErrorRes("EMAIL_EXISTS", "이미 사용 중인 이메일입니다."));
            }
            return ResponseEntity.internalServerError().body(new ErrorRes("UNKNOWN_ERROR", "회원가입 처리 중 오류가 발생했습니다."));
        }
    }
    // 로그인: 성공 시 세션 발급하고 MemberRes 반환
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginReq req, HttpServletRequest request) {
        try {
            Member member = authService.login(req.email(), req.password(), request);
            return ResponseEntity.ok(MemberRes.from(member));
        } catch (ResponseStatusException e) {
            String errorCode = e.getReason();
            String errorMessage;
            
            switch (errorCode) {
                case "MEMBER_NOT_FOUND":
                    errorMessage = "존재하지 않는 회원입니다.";
                    break;
                case "INVALID_CREDENTIALS":
                    errorMessage = "이메일 또는 비밀번호가 올바르지 않습니다.";
                    break;
                default:
                    errorMessage = "로그인 처리 중 오류가 발생했습니다.";
            }
            
            return ResponseEntity.status(e.getStatusCode())
                    .body(new ErrorRes(errorCode, errorMessage));
        }
    }

    // 로그아웃: 세션 무효화
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        authService.logout(request);     // 세션 무효화 + SecurityContext clear (이미 구현됨)

        // JSESSIONID 쿠키 삭제 
        Cookie jsessionCookie = new Cookie("JSESSIONID", null);
        jsessionCookie.setPath("/");
        jsessionCookie.setMaxAge(0); // 즉시 만료
        response.addCookie(jsessionCookie);
        
        // remember 쿠키 삭제 
        Cookie remember = new Cookie("remember", "");
        remember.setPath("/");
        remember.setHttpOnly(true);
        remember.setMaxAge(0);
        response.addCookie(remember);

        // 바디 없이 성공만 알림(REST 관례)
        return ResponseEntity.noContent().build(); // 204
    }


    // 현재 로그인한 사용자 정보 조회
    @GetMapping("/me")
    public ResponseEntity<?> me(HttpServletRequest request) {
        try {
            Member member = authService.me(request);
            return ResponseEntity.ok(MemberRes.from(member));
        } catch (ResponseStatusException e) {
            String errorCode = e.getReason();
            String errorMessage;
            
            switch (errorCode) {
                case "NOT_LOGGED_IN":
                    errorMessage = "로그인이 필요합니다.";
                    break;
                case "MEMBER_NOT_FOUND":
                    errorMessage = "회원 정보를 찾을 수 없습니다.";
                    break;
                default:
                    errorMessage = "사용자 정보 조회 중 오류가 발생했습니다.";
            }
            
            return ResponseEntity.status(e.getStatusCode())
                    .body(new ErrorRes(errorCode, errorMessage));
        }
    }

    // 로그인 상태 확인
    @GetMapping("/check")
    public Map<String, Boolean> isLoggedIn(HttpServletRequest request) {
        return Map.of("loggedIn", authService.isLoggedIn(request));
    }


}

