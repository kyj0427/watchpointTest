// 실제 로그인 상태 확인하고 자식 컴포넌트에 정보 제공

"use client";

import { ReactNode, useState, useEffect } from "react";
import { AuthContext, AuthContextType } from "@/contexts/AuthContext";
import {User, UserFromAPI} from "@/config/user";
// import axios from "axios"; //npm install axios
import { useRouter } from "next/router";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080"


// AuthProvider 컴포넌트 정의
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // console.log("AuthProvider 컴포넌트 렌더링됨"); // 디버깅용
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);


    // 로그인
    const handleLogin = async (email: string, password: string) => {
      try {
        const res = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // 세션 쿠키 받기
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
          throw new Error("로그인 실패");
        }

        const data = await res.json(); // MemberRes
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          // image: null,
          // blizardId: null,
          // battleTag: null
        });
      } catch (err) {
        console.error("로그인 오류:", err);
        setUser(null);
        
      }
    };


    // 로그아웃
    // const handleLogout = async () => {
    //   try {
    //     await fetch(`${API}/api/auth/logout`, {
    //       method: "POST",
    //       credentials: "include",
    //     });
    //   } catch (err) {
    //     console.error("로그아웃 요청 실패", err);
    //   } finally {
    //     setUser(null);
    //     // 로그인 페이지로 리 다이렉트
    //     router.push("/login");
    //   }
    // };
    // 로그아웃
    const handleLogout = async () => {
        try {
            console.log("🚪 로그아웃 시작");
            
            const response = await fetch(`${API}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
            
            console.log("📡 로그아웃 응답:", response.status);
            
        } catch (err) {
            console.error("로그아웃 요청 실패", err);
        } finally {
            setUser(null);
        }
    };

    // 사용자 인증 상태 확인 (라우팅과 무관)
    const checkAuth = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API}/api/auth/check`, {
                method: "GET", 
                credentials: "include",
            });
            
            if (res.ok) {
                const data = await res.json();
                setUser({
                    id: data.member_id,
                    name: data.member_name,
                    email: data.member_email
                });
            } else {
                setUser(null);
            }
        } catch (err) {
            console.error("인증 확인 실패", err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // 앱 시작시 한 번만 인증 상태 확인
    useEffect(() => {
        checkAuth();
    }, []);


    const authContextValue: AuthContextType = {
        user,
        loading,
        login: handleLogin,
        logout: handleLogout,
    }

    return (
    <AuthContext.Provider value={ authContextValue}>
        {children}
    </AuthContext.Provider>
    );
};