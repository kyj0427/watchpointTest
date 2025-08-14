package com.watchpoint.backend.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

//record 는 필드명과 동일한 getter 메서드가 자동 생성
public record LoginReq(
    @NotBlank @Email String email,
    @NotBlank String password
) {}
