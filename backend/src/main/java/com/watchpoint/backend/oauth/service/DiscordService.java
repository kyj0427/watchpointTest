package com.watchpoint.backend.oauth.service;

import com.watchpoint.backend.auth.dto.MemberRes;

public interface DiscordService {
    
    //디스코드 인증 코드를 받아서 로그인/회원가입 처리
    //* @return MemberRes 로그인된 사용자 정보 (기존 auth와 동일한 형태)
    MemberRes processDiscordLogin(String code) throws Exception;

    //디스코드 로그인 URL 생성 (프론트에서 사용할 URL)
    //* @return String 디스코드 OAuth 인증 URL
    String getDiscordAuthUrl();

}