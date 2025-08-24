package com.watchpoint.backend.oauth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.watchpoint.backend.auth.dto.MemberRes;
import com.watchpoint.backend.auth.service.AuthService;
import com.watchpoint.backend.oauth.dto.GoogleRes;

import java.util.Map;

@Service
public class GoogleServiceImpl implements GoogleService {
    // application.properties에서 값 가져오기
    @Value("${google.client.id}")
    private String clientId;
    
    @Value("${google.client.secret}")
    private String clientSecret;
    
    @Value("${google.redirect.uri}")
    private String redirectUri;
    
    // Google API URL 설정 (환경별 변경 가능하도록 외부 설정)
    @Value("${google.auth.url}")
    private String authUrl;
    
    @Value("${google.token.url}")
    private String tokenUrl;
    
    @Value("${google.userinfo.url}")
    private String userInfoUrl;
    
    // 기존 auth 서비스 재사용 (세션 관리 등)
    @Autowired
    private AuthService authService;
    
    // HTTP 요청을 위한 RestTemplate
    private final RestTemplate restTemplate = new RestTemplate();
    
    // JSON 파싱을 위한 ObjectMapper
    private final ObjectMapper objectMapper = new ObjectMapper();

    // 구글 인증 코드로 로그인/회원가입 처리
    @Override
    public MemberRes processGoogleLogin(String code) throws Exception {
        // 1단계: code로 access_token 받기
        String accessToken = getAccessToken(code);
        
        // 2단계: access_token으로 사용자 정보 받기
        GoogleRes googleUser = getGoogleUserInfo(accessToken);
        
        // 3단계: 기존 AuthService와 연동 (이메일로 회원 찾거나 새로 생성)
        return authService.handleSocialLogin(googleUser.getEmail(), googleUser.getName(), "GOOGLE");
    }
    // 구글 OAuth 인증 URL 생성
    @Override
    public String getGoogleAuthUrl() {
        return authUrl + 
                "?client_id=" + clientId +
                "&redirect_uri=" + redirectUri +
                "&response_type=code" +
                "&scope=openid email profile"; // OpenID Connect 스코프 사용
    }
    // 인증 코드를 가지고 구글에서 access_token
    private String getAccessToken(String code) throws Exception {
    // 요청 헤더 설정
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
    
    // 요청 바디 설정 (form 데이터) - Client Secret 필요!
    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
    params.add("code", code);
    params.add("client_id", clientId);
    params.add("client_secret", clientSecret); // 구글은 Secret 필요
    params.add("redirect_uri", redirectUri);
    params.add("grant_type", "authorization_code");
    
    // HTTP 요청 생성
    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
    
    // 구글에 토큰 요청 (설정파일의 URL 사용)
    ResponseEntity<String> response = restTemplate.postForEntity(tokenUrl, request, String.class);
    
    if (!response.getStatusCode().is2xxSuccessful()) {
        throw new Exception("구글 토큰 요청 실패: " + response.getStatusCode());
    }
    
    // JSON 응답에서 access_token 추출
    Map<String, Object> tokenResponse = objectMapper.readValue(response.getBody(), Map.class);
    return (String) tokenResponse.get("access_token");
}
    //access_token으로 구글 사용자 정보 받아오기
    private GoogleRes getGoogleUserInfo(String accessToken) throws Exception {
        // 요청 헤더에 Bearer 토큰 추가
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        
        // HTTP 요청 생성
        HttpEntity<String> request = new HttpEntity<>(headers);
        
        // 구글에 사용자 정보 요청 (설정파일의 URL 사용)
        ResponseEntity<String> response = restTemplate.exchange(userInfoUrl, HttpMethod.GET, request, String.class);
        
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new Exception("구글 사용자 정보 요청 실패: " + response.getStatusCode());
        }
        
        // 디버깅: 구글 응답 확인
        String responseBody = response.getBody();
        System.out.println("=== 구글 사용자 정보 응답 ===");
        System.out.println(responseBody);
        
        // JSON 응답을 GoogleRes 객체로 변환 (평면 구조 자동 매핑)
        GoogleRes googleRes = objectMapper.readValue(responseBody, GoogleRes.class);
        
        // 디버깅: 파싱된 정보 확인
        System.out.println("구글 이메일: " + googleRes.getEmail());
        System.out.println("구글 이름: " + googleRes.getName());
        System.out.println("구글 ID: " + googleRes.getId());
        
        return googleRes;
    }

}
