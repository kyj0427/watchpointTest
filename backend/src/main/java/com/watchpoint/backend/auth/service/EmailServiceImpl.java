package com.watchpoint.backend.auth.service;

import java.security.SecureRandom;
import java.time.Duration;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor // ✅ 생성자 주입 (Autowired 불필요)
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;              //  final + 생성자 주입
    private final StringRedisTemplate redisTemplate;      //  StringRedisTemplate 사용

    private static final String KEY_PREFIX = "email_verification:";
    private static final int EXPIRE_MINUTES = 5;
    private static final SecureRandom RND = new SecureRandom();

    @Override
    public void sendVerificationEmail(String email) {
        String code = generateCode();
        try {
            // Redis 문자열 직렬화로 바로 set/get 가능
            redisTemplate.opsForValue().set(
                    KEY_PREFIX + email,
                    code,
                    Duration.ofMinutes(EXPIRE_MINUTES)
            );

            sendEmail(email, code);
            log.info("Verification code sent to: {}", email);
        } catch (Exception e) {
            log.error("Failed to send verification email to: {}", email, e);
            throw new RuntimeException("이메일 발송에 실패했습니다.");
        }
    }

    @Override
    public boolean verifyCode(String email, String inputCode) {
        try {
            String key = KEY_PREFIX + email;
            String storedCode = redisTemplate.opsForValue().get(key);
            if (storedCode == null) {
                log.warn("Verification code not found or expired for email: {}", email);
                return false;
            }
            boolean ok = storedCode.equals(inputCode);
            if (ok) {
                redisTemplate.delete(key); // 일회성 사용 후 제거
                log.info("Email verification successful for: {}", email);
            } else {
                log.warn("Invalid verification code for email: {}", email);
            }
            return ok;
        } catch (Exception e) {
            log.error("Error verifying code for email: {}", email, e);
            return false;
        }
    }

    private void sendEmail(String to, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        log.info(" [DEBUG] 발송할 인증 코드: {}", code);

        message.setTo(to);
        message.setSubject("WatchPoint 이메일 인증 코드"); // 제목 정리
        message.setText("""
                인증 코드: %s

                %d분 후 만료됩니다.
                """.formatted(code, EXPIRE_MINUTES));
        mailSender.send(message);
    }

    private String generateCode() {
        // 000000 ~ 999999 (6자리 고정)
        return String.format("%06d", RND.nextInt(1_000_000));
    }
}
