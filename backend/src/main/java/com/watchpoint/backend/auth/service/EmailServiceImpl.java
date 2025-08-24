package com.watchpoint.backend.auth.service;

import java.security.SecureRandom;
import java.time.Duration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor // final 필드를 생성자 주입
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;              // 메일 발송기 (Gmail SMTP 등)
    private final StringRedisTemplate redisTemplate;      // 문자열 기반 Redis 클라이언트

    // ====== 설정 값 주입 (환경별로 바꾸기 쉽도록) ======
    @Value("${app.auth.email.code-ttl-minutes:5}")  // 기본 5분
    private int ttlMin;

    @Value("${spring.mail.username}")                // 발신자 주소 (Gmail 계정)
    private String from;

    // ====== 내부 상수/도구 ======
    private static final String KEY_PREFIX = "email_verification:"; // Redis 키 prefix
    private static final SecureRandom RND = new SecureRandom();     // 6자리 코드 생성용

    /** 이메일 문자열을 표준화(앞뒤공백 제거 + 소문자)하여 키 충돌을 방지 */
    private String norm(String email) {
        return email.trim().toLowerCase();
    }

    /** 6자리 숫자 코드 생성 (000000 ~ 999999) */
    private String generateCode() {
        return String.format("%06d", RND.nextInt(1_000_000));
    }
        /** 실제 메일 발송 (텍스트 메일) */
    private void sendEmail(String to, String code) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(from);                   // 발신자 (SMTP 계정과 동일 권장)
        msg.setTo(to);                       // 수신자
        msg.setSubject("WatchPoint 이메일 인증 코드");
        msg.setText("인증 코드: " + code + "\n" + ttlMin + "분 후 만료됩니다.");
        mailSender.send(msg);
    }
    @Override
    public void sendVerificationEmail(String email) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("email required");
        }
        email = norm(email);

        String code = generateCode(); // 6자리 코드 생성
        String key  = KEY_PREFIX + email;

        try {
            log.info("DEV ONLY >>> verification code for {} : {}", email, code);
            // Redis에 코드 저장 + TTL 설정
            redisTemplate.opsForValue().set(key, code, Duration.ofMinutes(ttlMin));

            // 메일 발송
            sendEmail(email, code);

            if (log.isDebugEnabled()) {
                log.debug("verification code generated for {} : {}", email, code);
            }
        } catch (RedisConnectionFailureException re) {
            // Redis가 꺼져 있거나 접속 불가(포트/방화벽)일 때
            log.error("Redis connection failed while sending code", re);
            throw new IllegalStateException("인증 스토리지(Redis)에 연결할 수 없습니다. Redis(Memurai)를 실행해 주세요.");
        } catch (Exception e) {
            // SMTP 문제 등
            log.error("Failed to send verification email to: {}", email, e);
            throw new RuntimeException("이메일 발송에 실패했습니다.");
        }
    }

    @Override
    public boolean verifyCode(String email, String inputCode) {
        if (email == null || email.isBlank() || inputCode == null || inputCode.isBlank()) {
            return false; // 입력값 부족
        }
        email = norm(email);
        inputCode = inputCode.trim();

        String key = KEY_PREFIX + email;

        try {
            String storedCode = redisTemplate.opsForValue().get(key);

            // 없음(만료 포함) → 실패
            if (storedCode == null) {
                log.warn("Verification code not found/expired: {}", email);
                return false;
            }

            boolean ok = storedCode.equals(inputCode);

            // 일회성: 성공 시 즉시 삭제
            if (ok) {
                redisTemplate.delete(key);
                log.info("Email verification success: {}", email);
            } else {
                log.warn("Invalid verification code for: {}", email);
            }

            return ok;
        } catch (RedisConnectionFailureException re) {
            log.error("Redis connection failed while verifying code", re);
            return false;
        }
    }
}