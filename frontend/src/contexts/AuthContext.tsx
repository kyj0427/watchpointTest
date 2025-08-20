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

// // AuthProvider 컴포넌트
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [loading, setLoading] = useState(true);

//     // 초기 로드 시 로컬 스토리지에서 사용자 정보 확인
//     useEffect(() => {
//         const savedUser = localStorage.getItem('user');
//         if (savedUser) {
//             try {
//                 setUser(JSON.parse(savedUser));
//             } catch (error) {
//                 console.error('Failed to parse user data:', error);
//             }
//         }
//         setLoading(false);
//     }, []);

//     // 로그인 함수
//     const login = (userData: User) => {
//         setUser(userData);
//         localStorage.setItem('user', JSON.stringify(userData));
//     };

//     // 로그아웃 함수
//     const logout = () => {
//         setUser(null);
//         localStorage.removeItem('user');
        
        
//     };

//     return (
//         <AuthContext.Provider value={{ user, loading, logout, login }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// 커스텀 훅
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

