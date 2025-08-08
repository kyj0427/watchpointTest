// 실제 로그인 상태 확인하고 자식 컴포넌트에 정보 제공

"use client";

import { ReactNode, useState, useEffect } from "react";
import { AuthContext, AuthContextType } from "@/contexts/AuthContext";
import {User, UserFromAPI} from "@/config/user";
// import axios from "axios"; //npm install axios
import { useRouter } from "next/navigation";




// AuthProvider 컴포넌트 정의
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // console.log("AuthProvider 컴포넌트 렌더링됨"); // 디버깅용
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);


    // 로그인
    const handleLogin = (userData: User) => {
        // console.log("로그인 완료");
        setUser(userData);
    }

    // 로그아웃
    const handleLogout = () => {
        // console.log("로그아웃 완료");

        //백엔드 로그아웃 연결 

        setUser(null);
        localStorage.removeItem('user'); // 로컬스토리지에서도 제거
        // login 페이지로 리다이렉트
        router.push('/login');
    }

    useEffect(() => {
        // console.log("AuthProvider useEffect 실행됨"); // 디버깅용
        const checkUserStatus = async ()=>{
            setLoading(true);
            try{
              // 로그인 사용자 정보 요청
              // const response = await axios.get<UserFromAPI[]>('http://localhost:8000/');

              // const apiUserData = response.data && response.data.length > 0 ? response.data[0] : null;

              // 3. 백엔드 데이터(스네이크 케이스)를 프론트엔드 User 타입(카멜 케이스)에 맞게 변환
              // if (apiUserData) {
              //   const formattedUser: User = {
              //     id : apiUserData.member_id,
              //     name: apiUserData.member_name,
              //     email: apiUserData.member_email,
              //     image: apiUserData.image,
              //     blizardId: apiUserData.blizard_id,
              //     battleTag: apiUserData.battle_tag,
              //   };
              //   setUser(formattedUser)
              // }else {
              //   setUser(null)
              // }

              // 네트워크 지연시간 시뮬레이션
            await new Promise(resolve => setTimeout(resolve, 1000));
            
              // 1. 로그인 유저 테스트
              // 1-1. 프로필 사진 업로드한 유저
            const userWithImage: User = {
                id: 1,
                name: "Faker",
                email: "faker@t1.gg",
                image: "/images/users/avatar2.png",
                blizardId : "Faker",
                battleTag: "1234"
            };           

              // 1-2 프로필 사진 없는 유저
            const userWithoutImage: User = {
                id : 2,
                name: "Newbie",
                email: "newbie@ovarwatch.com",
                image: null,
                blizardId : "Newbie",
                battleTag: "1111"
            };    

              // 상태 업데이트
              // setUser(userData)

            // console.log("Faker 로그인 설정됨:", userWithImage); // 디버깅용
            setUser(userWithImage)
              // setUser(userWithoutImage)

            

              // 2. 로그아웃 상태 테스트
              // setUser(null)

            } catch (err){
              //에러시 사용자 null
            console.error("인증실패", err)
            setUser(null)
            } finally {
            setLoading(false)
            }
    }
    checkUserStatus();
    }, []);

    const authContextValue: AuthContextType = {
        user,
        loading,
        login: handleLogin,
        logout: handleLogout
    }

    return (
    <AuthContext.Provider value={ authContextValue}>
        {children}
    </AuthContext.Provider>
    );
};