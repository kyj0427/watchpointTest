package com.watchpoint.backend.auth.service;

import java.time.Duration;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class EmailServiceImpl implements EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    
    private static final String EMAIL_VERIFICATION_PREFIX = "email_verification:";
    private static final int VERIFICATION_CODE_EXPIRE_MINUTES = 5;
    
    @Override
    public void sendVerificationEmail(String email) {
        String code = generateVerificationCode();
        
        try {
            // Redis에 5분간 저장
            redisTemplate.opsForValue().set(
                EMAIL_VERIFICATION_PREFIX + email, 
                code, 
                Duration.ofMinutes(VERIFICATION_CODE_EXPIRE_MINUTES)
            );
            
            // 이메일 발송
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
            String storedCode = redisTemplate.opsForValue().get(EMAIL_VERIFICATION_PREFIX + email);
            
            if (storedCode == null) {
                log.warn("Verification code not found or expired for email: {}", email);
                return false;
            }
            
            boolean isValid = storedCode.equals(inputCode);
            
            if (isValid) {
                // 인증 성공 시 Redis에서 삭제
                redisTemplate.delete(EMAIL_VERIFICATION_PREFIX + email);
                log.info("Email verification successful for: {}", email);
            } else {
                log.warn("Invalid verification code for email: {}", email);
            }
            
            return isValid;
            
        } catch (Exception e) {
            log.error("Error verifying code for email: {}", email, e);
            return false;
        }
    }
    
    private void sendEmail(String to, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(" 이메일 인증 코드");
        message.setText(
            "인증 코드: " + code + "\n\n" + VERIFICATION_CODE_EXPIRE_MINUTES + "분 후 만료됩니다.\n" 
        );
        
        mailSender.send(message);
    }
    
    private String generateVerificationCode() {
        return String.format("%06d", new Random().nextInt(1000000));
    }
}