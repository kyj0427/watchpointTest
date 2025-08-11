export const navMenu = [
    {
        id: 1,
        name: "홈",
        isSubMenu: false,
        link : "/"
    },
    {
        id: 2,
        name: "게임정보",
        isSubMenu: true,
        subMenu : [
            {
                id : 21,
                name : "영웅정보",
                link : "/gameinfo/heroes"
            },
            {
                id : 22,
                name : "영웅별 유저통계",
                link : "/not-found"
            },
            {
                id : 23,
                name : "맵정보",
                link : "/gameinfo/maps"
            },
            {
                id : 24,
                name : "유저랭킹",
                link : "/gameinfo/userrank"
            },
            {
                id : 25,
                name : "패치노트",
                link : "/gameinfo/patchnotes"
            },
            
        ]
        
    },
    {
        id: 3,
        name: "E-스포츠",
        isSubMenu: true,
        subMenu : [
            {
                id : 31,
                name : "대회일정",
                link : "/e-sports"
            },
            // {
            //     id : 32,
            //     name : "승부예측",
            //     link : "/e-sports/predictions"
            // },
            // {
            //     id : 33,
            //     name : "예측포인트 랭킹",
            //     link : "/e-sports/predictions-ranks"
            // },
            {
                id : 32,
                name : "프로랭킹",
                link : "/e-sports/pro-ranks"
            },
            {
                id : 33,
                name : "프로선수정보",
                link : "/e-sports/pro-players"
            }
        ]
    },
    {
        id: 4,
        name: "강의",
        isSubMenu: true,
        subMenu: [
            {
                id: 41,
                name: "강의/멘토 목록",
                link: "/coaching"
            },
            {
                id: 42,
                name: "코칭AI Athena",
                link: "/coaching/athena/library"
            },
            {
                id: 43,
                name: "내 강의",
                link: "/game-details-two" //또는 library-details
            }
        ]
    },
    {
        id: 5,
        name: "커뮤니티",
        isSubMenu: true,
        subMenu: [
            {
                id: 51,
                name: "공지사항",
                link: "/community/noticification"
            },
            {
                id: 52,
                name: "인기글",
                link: "/community/postlist?mode=hot"
            },
            {
                id: 53,
                name: "최신글",
                link: "/community/postlist?mode=recent"
            },
            {
                id: 54,
                name: "듀오/스쿼드 탐색",
                link: "/community/SquadOrChat"
            },
            // {
            //     id: 54,
            //     name: "공지사항",
            //     link: "/noticification"
            // }
        ]
    },
    {
        id: 6,
        name: "마이페이지",
        isSubMenu: true,
        subMenu: [
            {
                id: 61,
                name: "내 프로필",
                link: "/profile"
            },
            {
                id: 62,
                name: "북마크",
                link: "/saved"
            },
            {
                id: 63,
                name: "구독/결제",
                link: "/pricing-plan"
            },
            {
                id: 64,
                name: "내 활동정보",
                link: "/profile/forums"
            }
        ]
    },
    {
        id: 7,
        name: "채팅",
        isSubMenu: false,
        link : "/community/chat"
    },
    {
        id: 8,
        name: "고객문의",
        isSubMenu: false,
        link : "/faq"
        
    }
];