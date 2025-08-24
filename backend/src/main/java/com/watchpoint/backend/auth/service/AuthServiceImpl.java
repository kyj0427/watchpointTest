package com.watchpoint.backend.auth.service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.watchpoint.backend.auth.dto.MemberRes;
import com.watchpoint.backend.member.domain.Member;
import com.watchpoint.backend.member.persistence.MemberRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Service
public class AuthServiceImpl implements AuthService{

    //DB 연결
    @Autowired
    private MemberRepository repo;

    //비밀번호 암호화
    @Autowired
    private PasswordEncoder encoder;

    //sns 연동 
    @Autowired  
    private MemberRepository memberRepository;

    @Override
    public Member register(String name, String email, String originalPassword) {

        System.out.println(">>> register() called");
        // 이메일 중복 확인
        if (repo.findByMemberEmail(email).isPresent()){

            throw new IllegalStateException("EMAIL_EXISTS");
        } 

        // member 객체 생성
        Member member = new Member();
        member.setMember_name(name);
        member.setMember_email(email);
        // 비밀번호 암호화 후 저장
        member.setMember_password(encoder.encode(originalPassword));

        //저장 후 리턴
        return repo.save(member);
    }

    @Override
    // 로그인 구현 
    public Member login(String email, String rawPassword, HttpServletRequest request) {
        System.out.println("=> login" + email);
        // 회원 존재 확인
        Member member = repo.findByMemberEmail(email)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "MEMBER_NOT_FOUND"));
        // 비밀번호 비교 검증 
        if(!encoder.matches(rawPassword, member.getMember_password())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "INVALID_CREDENTIALS");
        }
        // 세션 생성 & 유저 정보 저장
        issueSession(member, request);

        System.out.println(">>> 로그인 성공: " + member.getMember_name());
        return member;

    }

    @Override
    public boolean isLoggedIn(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null){
            return false;
        }
        return session.getAttribute("member_id") != null;
    }

    @Override
    public void logout(HttpServletRequest request) {
        System.out.println("logout 완료되었습니다 => 세션값 삭제 완료");

        HttpSession session = request.getSession(false);
        if(session != null){
            session.invalidate();
            System.out.println("로그아웃 완료");
        }
        //
        SecurityContextHolder.clearContext();

        System.out.println("세션 없애기 완료");
    }

    @Override
    public Member me(HttpServletRequest request) {
        System.out.println(">>> me() called");
        
        HttpSession session = request.getSession(false); // 기존 세션만 가져옴
        if (session == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "NOT_LOGGED_IN");
        }
        
        Long memberId = (Long) session.getAttribute("member_id");
        if (memberId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "NOT_LOGGED_IN");
        }
        
        return repo.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "MEMBER_NOT_FOUND"));
    }
    
    private void issueSession(Member member, HttpServletRequest request) {
        // SecurityContext 설정
        var auth = new UsernamePasswordAuthenticationToken(
            member.getMember_email(),
            null,
            List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );
        SecurityContextHolder.getContext().setAuthentication(auth);
        
        // 세션 생성 및 사용자 정보 저장 
        HttpSession session = request.getSession(true);
        session.setAttribute("member_id", member.getMember_id()); // 실제 값 저장!

        session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
        
        System.out.println(">>> 세션 생성 완료 - member_id: " + member.getMember_id());
    }

    @Override
    public MemberRes handleSocialLogin(String email, String name, String provider) {
        // 1. 이메일로 기존 회원 찾기
        Optional<Member> existingMember = memberRepository.findByMemberEmail(email);
        
        Member member;
        if (existingMember.isPresent()) {
            // 기존 회원이면 로그인 처리
            member = existingMember.get();
        } else {
            // 새 회원이면 회원가입 처리
            member = new Member();
            member.setMember_email(email);
            member.setMember_name(name);
            member.setMember_login_provider(provider); // sns 연동 
            member.setMember_password(UUID.randomUUID().toString()); // 비밀번호 
            member = memberRepository.save(member);
        }
        // MemberRes로 변환해서 반환
        return new MemberRes(member); 
    }
    @Override
    public void createSessionForOAuth(Member member, HttpServletRequest request) {
        issueSession(member, request); // private 메서드 재사용
}
}
