package com.watchpoint.backend.oauth.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class GoogleRes {
    
    // 구글 사용자 고유 ID
    private String id;
    
    // 이메일 주소 (확실히 받을 수 있음!)
    private String email;
    
    // 사용자 이름
    private String name;
    
    // 프로필 이미지 URL
    private String picture;
    
    // 이메일 인증 여부
    private Boolean verified_email;
    
    // 구글 계정 언어 설정
    private String locale;
}
