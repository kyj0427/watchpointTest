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
import com.watchpoint.backend.oauth.service.DiscordService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/oauth/discord")
public class DiscordController {

    @Autowired
    private DiscordService discordService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private AuthService authService;
    
    //디스코드 로그인 URL
    @GetMapping("/url")
    public ResponseEntity<String> getDiscordAuthUrl() {
        try {
            String authUrl = discordService.getDiscordAuthUrl();
            return ResponseEntity.ok(authUrl);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("디스코드 로그인 URL 생성 실패: " + e.getMessage());
        }
    }

    //디스코드 OAuth 콜백 처리
    @GetMapping("/callback")
    public ResponseEntity<?> discordCallback(@RequestParam("code") String code, HttpServletRequest request) {
        try{
            // 1. 디스코드 코드로 로그인/회원가입 처리
            MemberRes memberRes = discordService.processDiscordLogin(code);
            
            // 2. 기존 로그인과 동일하게 세션에 사용자 정보 저장
            // 기존 AuthService의 issueSession 방식 사용
            Member member = memberRepository.findById(memberRes.getId()).get();
            authService.createSessionForOAuth(member, request);

            HttpSession session = request.getSession();
            System.out.println("세션 ID: " + session.getId());
            System.out.println("저장된 member_id: " + session.getAttribute("member_id"));
            
            // 3. 성공 응답 반환
            return ResponseEntity.status(302)
                .header("Location", "http://localhost:3000")
                .build();
            
        } catch (Exception e) {
            // OAuth 처리 실패 시 에러 응답
            return ResponseEntity.status(302)
                .header("Location", "http://localhost:3000/login?error=oauth")
                .build();
        }
    }
    //디스코드 로그인 상태 확인
    @GetMapping("/check")
    public ResponseEntity<?> checkDiscordAuth(HttpServletRequest request) {
        try {
            HttpSession session = request.getSession(false);
            
            if (session == null || session.getAttribute("user") == null) {
                return ResponseEntity.status(401).body("인증되지 않은 사용자");
            }
            
            MemberRes user = (MemberRes) session.getAttribute("user");
            return ResponseEntity.ok(user);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("인증 확인 실패: " + e.getMessage());
        }
    }
}