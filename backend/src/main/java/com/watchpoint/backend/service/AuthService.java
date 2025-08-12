package com.watchpoint.backend.service;

import com.watchpoint.backend.domain.Member;

public interface AuthService {

    // 회원가입 (암호화 하기전 originalpassword)
    Member register(String name, String email, String OriginalPassword);
    
    
} 