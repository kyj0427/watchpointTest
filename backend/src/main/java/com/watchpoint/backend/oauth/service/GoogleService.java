package com.watchpoint.backend.oauth.service;

import com.watchpoint.backend.auth.dto.MemberRes;

public interface GoogleService {
    
    // 구글 인증 코드를 받아서 로그인/회원가입 처리
    MemberRes processGoogleLogin(String code) throws Exception;
    //구글 로그인 URL 생성
    String getGoogleAuthUrl();
}
