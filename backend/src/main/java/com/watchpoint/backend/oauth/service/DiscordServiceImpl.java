package com.watchpoint.backend.oauth.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.watchpoint.backend.auth.dto.MemberRes;
import com.watchpoint.backend.auth.service.AuthService;
import com.watchpoint.backend.oauth.dto.DiscordRes;

// 디스코드 Oauth 로그인 serviceImpl
// 1. code로 디스코드에서 access_token 받기
// 2. access_token으로 사용자 정보 받기  
// 3. 기존 AuthService와 연동해서 로그인/회원가입 처리
@Service
public class DiscordServiceImpl implements DiscordService {

    // application.properties에서 값 가져오기
    @Value("${discord.client.id}")
    private String clientId;
    
    @Value("${discord.client.secret}")
    private String clientSecret;
    
    @Value("${discord.redirect.uri}")
    private String redirectUri;

    // 기존 auth 서비스 재사용 (세션 관리)
    @Autowired
    private AuthService authService;
    // HTTP 요청을 위한 RestTemplate
    private final RestTemplate restTemplate = new RestTemplate();
    // JSON 파싱을 위한 ObjectMapper
    private final ObjectMapper objectMapper = new ObjectMapper();


    // 디스코드 인증 코드로 로그인/회원가입 처리
    @Override
    public MemberRes processDiscordLogin(String code) throws Exception {
        // 1단계: code로 access_token 받기
        String accessToken = getAccessToken(code);
        // 2단계: access_token으로 사용자 정보 받기
        DiscordRes discordUser = getDiscordUserInfo(accessToken);    
        // 3단계: 기존 AuthService와 연동 (이메일로 회원 찾거나 새로 생성)
        return authService.handleSocialLogin(discordUser.getEmail(), discordUser.getUsername(), "DISCORD");
    }

    // 디스코드 OAuth 인증 URL 생성
    @Override
    public String getDiscordAuthUrl() {
        return "https://discord.com/api/oauth2/authorize" +
                "?client_id=" + clientId +
                "&redirect_uri=" + redirectUri +
                "&response_type=code" +
                "&scope=identify%20email"; // identify와 email 권한 요청
    }
    
    //인증 코드를 가지고 디스코드에서 access_token 받아오기
    private String getAccessToken(String code) throws Exception {
        // 디스코드 토큰 요청 URL
        String tokenUrl = "https://discord.com/api/oauth2/token";
        
        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        
        // 요청 바디 설정 (form 데이터)
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("grant_type", "authorization_code");
        params.add("code", code);
        params.add("redirect_uri", redirectUri);
        
        // HTTP 요청 생성
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        
        // 디스코드에 토큰 요청
        ResponseEntity<String> response = restTemplate.postForEntity(tokenUrl, request, String.class);
        
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new Exception("디스코드 토큰 요청 실패: " + response.getStatusCode());
        }
        
        // JSON 응답에서 access_token 추출
        Map<String, Object> tokenResponse = objectMapper.readValue(response.getBody(), Map.class);
        return (String) tokenResponse.get("access_token");
    }

    // access_token으로 디스코드 사용자 정보 받아오기
    private DiscordRes getDiscordUserInfo(String accessToken) throws Exception {
        // 디스코드 사용자 정보 요청 URL
        String userInfoUrl = "https://discord.com/api/users/@me";
        
        // 요청 헤더에 Bearer 토큰 추가
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        
        // HTTP 요청 생성
        HttpEntity<String> request = new HttpEntity<>(headers);
        
        // 디스코드에 사용자 정보 요청
        ResponseEntity<String> response = restTemplate.exchange(userInfoUrl, HttpMethod.GET, request, String.class);
        
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new Exception("디스코드 사용자 정보 요청 실패: " + response.getStatusCode());
        }
        
        // JSON 응답을 DiscordRes 객체로 변환
        return objectMapper.readValue(response.getBody(), DiscordRes.class);
    }
}
