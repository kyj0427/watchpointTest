package com.watchpoint.backend.domain;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "member")
public class Member {

    @Id
    //PK 값 자동 생성
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // MySQL에서는 BIGINT 지만 Java 에서는 Long값으로 적어야한다
    private Long member_id;
    
    private String member_email;

    private String member_name;

    private String member_password; // BCrypt 해시 저장

    private LocalDateTime member_reg;

    private String member_login_provider;

    private String member_sns_id;

    //timestamp 역할 , 등록일 값이 null이면 현재 시각 자동 채움
    @PrePersist
    void onCreate() {
        this.member_reg = LocalDateTime.now();
    }
}