package com.watchpoint.backend.service;
import com.watchpoint.backend.persistence.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.watchpoint.backend.domain.Member;

@Service
public class AuthServiceImpl implements AuthService{

    //DB 연결
    @Autowired
    private MemberRepository repo;

    //비밀번호 암호화
    @Autowired
    private PasswordEncoder encoder;

    @Override
    public Member register(String name, String email, String originalPassword) {

    	System.out.println(">>> register() called");

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

}
