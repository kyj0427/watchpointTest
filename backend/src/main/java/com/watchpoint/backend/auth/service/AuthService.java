package com.watchpoint.backend.auth.service;

import com.watchpoint.backend.auth.dto.MemberRes;
import com.watchpoint.backend.member.domain.Member;

import jakarta.servlet.http.HttpServletRequest;

public interface AuthService {

    // 회원가입 (암호화 하기전 originalpassword)
    Member register(String name, String email, String OriginalPassword);
    
    // 로그인 
    Member login(String email, String rawPassword, HttpServletRequest request);

    // 회원가입한 내 정보 
    Member me(HttpServletRequest request);
    
    // 로그아웃 
    void logout (HttpServletRequest request);

    // 로그인 상태 확인
    //Spring Security 인증 기반 → isLoggedIn() 으로 파라매터 없어도되는데 왜 next.js 
    boolean isLoggedIn(HttpServletRequest request);

    //소셜 로그인 처리 (구글, 카카오, 디스코드)
    MemberRes handleSocialLogin(String email, String name, String provider);    

    public void createSessionForOAuth(Member member, HttpServletRequest request);
} 