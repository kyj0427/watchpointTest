package com.watchpoint.backend.auth.controller;

import com.watchpoint.backend.auth.dto.ErrorRes;
import com.watchpoint.backend.auth.dto.MemberRes;
import com.watchpoint.backend.auth.dto.RegisterReq;
import com.watchpoint.backend.auth.service.AuthService;
import com.watchpoint.backend.member.domain.Member;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // 회원가입: 중복이면 409, 성공 시 MemberRes 반환 
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterReq req) {
        try {
            Member saved = authService.register(req.getName(), req.getEmail(), req.getOriginalPassword());
            return ResponseEntity.ok(MemberRes.from(saved));
        } catch (IllegalStateException e) {
            if ("EMAIL_EXISTS".equals(e.getMessage())) {
                return ResponseEntity.status(409).body(new ErrorRes("EMAIL_EXISTS", "이미 사용 중인 이메일입니다."));
            }
            return ResponseEntity.internalServerError().body(new ErrorRes("UNKNOWN_ERROR", "회원가입 처리 중 오류가 발생했습니다."));
        }
    }
}
