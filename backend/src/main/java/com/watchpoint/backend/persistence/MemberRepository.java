package com.watchpoint.backend.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.watchpoint.backend.domain.Member;

//JpaRepository 사용 (crud레파지토리보다 더 많은 기능 제공)
public interface MemberRepository extends CrudRepository<Member, Long> {
    
    // 이메일로 회원 조회
    // 회원가입 : 중복 여부 확인 , 로그인 : 해당 이메일 계정 조회 
    @Query("SELECT m FROM Member m WHERE m.member_email = :memberEmail")
    Optional<Member> findByMemberEmail(@Param("memberEmail") String memberEmail);
    
}
