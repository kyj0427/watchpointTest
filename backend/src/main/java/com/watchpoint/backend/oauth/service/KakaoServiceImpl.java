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
import com.watchpoint.backend.oauth.dto.KakaoRes;


@Service
public class KakaoServiceImpl implements KakaoService {

    // application.properties에서 값 가져오기
    @Value("${kakao.client.id}")
    private String clientId;  // REST API 키
    
    @Value("${kakao.redirect.uri}")
    private String redirectUri;
    
    // Kakao API URL 설정 (환경별 변경 가능하도록 외부 설정)
    @Value("${kakao.auth.url}")
    private String authUrl;
    
    @Value("${kakao.token.url}")
    private String tokenUrl;
    
    @Value("${kakao.userinfo.url}")
    private String userInfoUrl;

    // 기존 auth 서비스 재사용 (세션 관리)
    @Autowired
    private AuthService authService;
    
    // HTTP 요청을 위한 RestTemplate
    private final RestTemplate restTemplate = new RestTemplate();
    
    // JSON 파싱을 위한 ObjectMapper
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public MemberRes processKakaoLogin(String code) throws Exception {
        // 1단계: code로 access_token 받기
        String accessToken = getAccessToken(code);
        
        // 2단계: access_token으로 사용자 정보 받기
        KakaoRes kakaoUser = getKakaoUserInfo(accessToken);
        
        // 3단계: 이메일이 없으면 카카오 ID로 임시 이메일 생성
        String email = kakaoUser.getEmail();
        if (email == null || email.isEmpty()) {
            email = "kakao_" + kakaoUser.getId() + "@sns.temp";
            System.out.println("카카오 임시 이메일 생성: " + email);
        }
        
        // 4단계: 기존 AuthService와 연동
        return authService.handleSocialLogin(email, kakaoUser.getNickname(), "KAKAO");
    }
    //카카오 OAuth 인증 URL 생성
    @Override
    public String getKakaoAuthUrl() {
        return authUrl + 
                "?client_id=" + clientId +
                "&redirect_uri=" + redirectUri +
                "&response_type=code"; 
                // "&scope=profile_nickname,account_email"; // 이메일 권한 요청
    }

    // 인증 코드를 가지고 카카오에서 access_token 받아오기
    private String getAccessToken(String code) throws Exception {
    // 요청 헤더 설정
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
    
    // 요청 바디 설정 (form 데이터) - Client Secret 없음!
    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
    params.add("grant_type", "authorization_code");
    params.add("client_id", clientId);  // REST API 키
    params.add("redirect_uri", redirectUri);
    params.add("code", code);
    
    // HTTP 요청 생성
    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
    
    // 카카오에 토큰 요청 (설정파일의 URL 사용)
    ResponseEntity<String> response = restTemplate.postForEntity(tokenUrl, request, String.class);
    
    if (!response.getStatusCode().is2xxSuccessful()) {
        throw new Exception("카카오 토큰 요청 실패: " + response.getStatusCode());
    }
        // JSON 응답에서 access_token 추출
        Map<String, Object> tokenResponse = objectMapper.readValue(response.getBody(), Map.class);
        return (String) tokenResponse.get("access_token");
    }

    private KakaoRes getKakaoUserInfo(String accessToken) throws Exception {
            // 요청 헤더에 Bearer 토큰 추가
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            
            // HTTP 요청 생성
            HttpEntity<String> request = new HttpEntity<>(headers);
            
            // 카카오에 사용자 정보 요청 (설정파일의 URL 사용)
            ResponseEntity<String> response = restTemplate.exchange(userInfoUrl, HttpMethod.GET, request, String.class);
            
            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new Exception("카카오 사용자 정보 요청 실패: " + response.getStatusCode());
            }
            // 디버깅: 카카오 응답 확인
            String responseBody = response.getBody();
            System.out.println("=== 카카오 사용자 정보 응답 ===");
            System.out.println(responseBody);
            
            // JSON 응답을 KakaoRes 객체로 변환 (중첩 구조 자동 매핑)
            // return objectMapper.readValue(response.getBody(), KakaoRes.class);
            KakaoRes kakaoRes = objectMapper.readValue(responseBody, KakaoRes.class);

            // 디버깅: 파싱된 정보 확인
            System.out.println("카카오 이메일: " + kakaoRes.getEmail());
            System.out.println("카카오 닉네임: " + kakaoRes.getNickname());
            System.out.println("카카오 ID: " + kakaoRes.getId());

            return kakaoRes;
        }
}
