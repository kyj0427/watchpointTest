package com.watchpoint.backend.oauth.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class KakaoRes {
    // 카카오 사용자 고유 ID (숫자)
    private Long id;
    
    // 카카오 계정 정보 (중첩 객체)
    private KakaoAccount kakao_account;
    
    // 카카오 프로필 정보 (중첩 객체)
    private Properties properties;
    
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class KakaoAccount {
        private String email;
        private Boolean email_needs_agreement;
    }
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Properties {
        private String nickname;
        private String profile_image;
    }
    
    // 편의 메서드: 이메일 추출
    public String getEmail() {
        return kakao_account != null ? kakao_account.getEmail() : null;
    }
    
    // 편의 메서드: 닉네임 추출
    public String getNickname() {
        return properties != null ? properties.getNickname() : null;
    }
}

