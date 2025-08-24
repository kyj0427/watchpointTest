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
import com.watchpoint.backend.oauth.service.KakaoService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/oauth/kakao")
public class KakaoController {
    
    @Autowired
    private KakaoService kakaoService;
    
    @Autowired
    private MemberRepository memberRepository;
    
    @Autowired
    private AuthService authService;

    // 카카오 로그인 URL
    @GetMapping("/url")
    public ResponseEntity<String> getKakaoAuthUrl() {
        try {
            String authUrl = kakaoService.getKakaoAuthUrl();
            return ResponseEntity.ok(authUrl);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("카카오 로그인 URL 생성 실패: " + e.getMessage());
        }
    }
    // 카카오 OAuth 콜백 처리
    @GetMapping("/callback")
    public ResponseEntity<?> kakaoCallback(@RequestParam("code") String code, HttpServletRequest request) {
        try{
            // 1. 카카오 코드로 로그인/회원가입 처리
            MemberRes memberRes = kakaoService.processKakaoLogin(code);
            
            // 2. 기존 AuthService 방식으로 세션 생성 (디스코드와 동일)
            Member member = memberRepository.findById(memberRes.getId()).get();
            authService.createSessionForOAuth(member, request);
            
            // 디버깅: 세션 정보 출력
            HttpSession session = request.getSession();
            System.out.println("=== 카카오 세션 저장 완료 ===");
            System.out.println("세션 ID: " + session.getId());
            System.out.println("저장된 member_id: " + session.getAttribute("member_id"));
            
            // 3. 성공시 메인 페이지로 리다이렉트 (실제 서비스 방식)
            return ResponseEntity.status(302)
                .header("Location", "http://localhost:3000")
                .build();
                
        } catch (Exception e) {
            // OAuth 처리 실패 시 로그인 페이지로 리다이렉트 (에러 파라미터 포함)
            System.err.println("카카오 OAuth 오류: " + e.getMessage());
            return ResponseEntity.status(302)
                .header("Location", "http://localhost:3000/login?error=kakao")
                .build();
        }
    }
    @GetMapping("/check")
    public ResponseEntity<?> checkKakaoAuth(HttpServletRequest request) {
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
