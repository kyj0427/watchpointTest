package com.watchpoint.backend.oauth.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown= true)
public class DiscordRes {
    
    // 디스코드 사용자 고유 ID (숫자를 문자열로 받음)
    private String id;
    
    // 디스코드 사용자명 (닉네임)
    private String username;
    
    // 이메일 주소 (email 권한 필요)
    private String email;
    
    // 아바타 이미지 해시값 (null일 수 있음)
    private String avatar;
    
    // 이메일 인증 여부
    private Boolean verified;
}
