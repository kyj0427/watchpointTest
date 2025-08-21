package com.watchpoint.backend.auth.service;

public interface EmailService {

    void sendVerificationEmail(String email);
    
    boolean verifyCode(String email, String inputCode);
}
