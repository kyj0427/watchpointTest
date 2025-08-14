package com.watchpoint.backend.auth.dto;

import com.watchpoint.backend.member.domain.*;
import lombok.Data;

// 성공 응답 데이터 
/*
 * 회원가입/로그인 성공 시, 프론트에 내려줄 응답 DTO.
 * 민감 정보(비밀번호 등)는 포함하지 않는다.
 */
@Data
public class MemberRes {
    private Long id;
    private String name;
    private String email;

    public MemberRes(Member m) {
        this.id = m.getMember_id();
        this.name = m.getMember_name();
        this.email = m.getMember_email();
    }

    // 가독성을 위한 팩토리 메서드 
    public static MemberRes from(Member m) {
        return new MemberRes(m);
    }
}