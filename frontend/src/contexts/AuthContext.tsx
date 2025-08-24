// 인증 컨텍스트

"use client";

import {createContext, ReactNode, useState, useEffect, useContext} from "react";
import {User} from "@/config/user";

// 컨텍스트 타입
export interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
}

// 컨텍스트 생성 (기본값 설정)
export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: async () => {},
    login: async () => {}
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

