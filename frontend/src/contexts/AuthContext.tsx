// 인증 컨텍스트

"use client";

import {createContext, ReactNode, useState, useEffect} from "react";
import {User} from "@/types/user";


// 컨텍스트 타입
interface AuthContextType {
    user: User | null;
    loading: boolean;
}

// 컨텍스트 생성 (기본값 설정)
export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
});

