package com.watchpoint.backend.oauth.service;

import com.watchpoint.backend.auth.dto.MemberRes;

public interface KakaoService {
    
    // 카카오 인증 코드를 받아서 로그인/회원가입 처리
    MemberRes processKakaoLogin(String code) throws Exception;

    // 카카오 로그인 URL 생성
    String getKakaoAuthUrl();
}
