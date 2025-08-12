package com.watchpoint.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * 회원가입 요청 바디를 받기 위한 DTO.
 * Entity를 직접 받지 않고, API에서 필요한 필드만 받는다.
 * @Valid로 검증할 수 있도록 어노테이션을 명시한다.
 */
@Data
public class RegisterReq {

    @NotBlank(message = "닉네임은 필수입니다.")
    private String name;

    @Email(message = "이메일 형식이 올바르지 않습니다.")
    @NotBlank(message = "이메일은 필수입니다.")
    private String email;

    /** 사용자가 입력한 원본 비밀번호(해싱 전) */
    @NotBlank(message = "비밀번호는 필수입니다.")
    private String originalPassword;
}
