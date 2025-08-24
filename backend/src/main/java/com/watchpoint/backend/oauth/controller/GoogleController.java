package com.watchpoint.backend.oauth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.watchpoint.backend.auth.dto.MemberRes;
import com.watchpoint.backend.auth.service.AuthService;
import com.watchpoint.backend.member.domain.Member;
import com.watchpoint.backend.member.persistence.MemberRepository;
import com.watchpoint.backend.oauth.service.GoogleService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/oauth/google")
public class GoogleController {
    
    @Autowired
    private GoogleService googleService;
    
    @Autowired
    private MemberRepository memberRepository;
    
    @Autowired
    private AuthService authService;

    //google 로그인 url
    @GetMapping("/url")
    public ResponseEntity<String> getGoogleAuthUrl() {
        try {
            String authUrl = googleService.getGoogleAuthUrl();
            return ResponseEntity.ok(authUrl);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("구글 로그인 URL 생성 실패: " + e.getMessage());
        }
    }
    //google Oauth 롤백처리
    @GetMapping("/callback")
    public ResponseEntity<?> googleCallback(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "error", required = false) String error,
            @RequestParam(value = "error_description", required = false) String errorDescription,
            HttpServletRequest request) {
        
        // 구글에서 에러 돌려보낸 경우
        if (error != null) {
            System.err.println("구글 OAuth 에러: " + error + " - " + errorDescription);
            return ResponseEntity.status(302)
                .header("Location", "http://localhost:3000/login?error=google")
                .build();
        }
        
        // code가 없는 경우
        if (code == null) {
            return ResponseEntity.status(302)
                .header("Location", "http://localhost:3000/login?error=google")
                .build();
        }
        try{
            // 1. 구글 코드로 로그인/회원가입 처리
            MemberRes memberRes = googleService.processGoogleLogin(code);
            
            // 2. 기존 AuthService 방식으로 세션 생성 (디스코드, 카카오와 동일)
            Member member = memberRepository.findById(memberRes.getId()).get();
            authService.createSessionForOAuth(member, request);
            
            // 디버깅: 세션 정보 출력
            HttpSession session = request.getSession();
            System.out.println("=== 구글 세션 저장 완료 ===");
            System.out.println("세션 ID: " + session.getId());
            System.out.println("저장된 member_id: " + session.getAttribute("member_id"));
            
            // 3. 성공시 메인 페이지로 리다이렉트 (실제 서비스 방식)
            return ResponseEntity.status(302)
                .header("Location", "http://localhost:3000")
                .build();
                
        } catch (Exception e) {
            // OAuth 처리 실패 시 로그인 페이지로 리다이렉트 (에러 파라미터 포함)
            System.err.println("구글 OAuth 오류: " + e.getMessage());
            return ResponseEntity.status(302)
                .header("Location", "http://localhost:3000/login?error=google")
                .build();
        }
    }
    // 구글 로그인상태 확인
    @GetMapping("/check")
    public ResponseEntity<?> checkGoogleAuth(HttpServletRequest request) {
        try {
            HttpSession session = request.getSession(false);
            
            if (session == null || session.getAttribute("member_id") == null) {
                return ResponseEntity.status(401).body("인증되지 않은 사용자");
            }
            
            // 기존 AuthService 방식으로 사용자 정보 조회
            Member member = authService.me(request);
            return ResponseEntity.ok(new MemberRes(member));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("인증 확인 실패: " + e.getMessage());
        }
    }


}
