// 실제 로그인 상태 확인하고 자식 컴포넌트에 정보 제공

"use client";

import { ReactNode, useState, useEffect } from "react";
import { AuthContext} from "./AuthContext";
import {User, UserFromAPI} from "@/types/user";
import axios from "axios"; //npm install axios



// AuthProvider 컴포넌트 정의
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    
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

    return (
    <AuthContext.Provider value={{ user, loading }}>
        {children}
    </AuthContext.Provider>
    );
};