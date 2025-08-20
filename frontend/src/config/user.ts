// 유저 타입 정의 파일

// 프론트엔드 컴포넌트들이 사용할 표준 User 타입 (카멜 케이스)
export interface User {
    id: number;
    name: string;
    email: string;
    // image: string | null;
    // blizardId: number | null;
    // battleTag: string | null;
}

// 백엔드 원본 데이터 타입 (스네이크 케이스)
export interface UserFromAPI {
    member_id : number;
    member_name: string;
    member_email: string;
    // image: string | null;
    // blizard_id: string;
    // battle_tag: string;
}