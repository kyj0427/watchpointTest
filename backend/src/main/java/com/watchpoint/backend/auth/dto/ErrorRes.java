package com.watchpoint.backend.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * 에러 응답 포맷 통일용 DTO.
 * 프론트는 code를 스위칭 키로, message는 사용자 노출용으로 사용.
 */
@Data
@AllArgsConstructor
public class ErrorRes {
    private String code;
    private String message;
}
