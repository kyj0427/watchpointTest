export const navMenu = [
    {
        id: 1,
        name: "홈",
        isSubMenu: true,
        link : "/"
    },
    {
        id: 2,
        name: "게임정보",
        isSubMenu: true,
        subMenu : [
            {
                id : 2.1,
                name : "영웅정보",
                link : "/groups-two"
            },
            {
                id : 2.2,
                name : "영웅별 유저통계",
                link : "/"
            },
            {
                id : 2.3,
                name : "맵정보",
                link : "/library"
            },
            {
                id : 2.4,
                name : "유저랭킹",
                link : "/leaderboard"
            },
            {
                id : 2.5,
                name : "패치노트",
                link : "/game-details-one"
            },
            {
                id : 2.6,
                name : "상점",
                link : "/marketplace-two"
            }
        ]
        
    },
    {
        id: 3,
        name: "E-스포츠",
        isSubMenu: true,
        subMenu : [
            {
                id : 3.1,
                name : "대회일정",
                link : "/tournaments/t1/matches"
            },
            {
                id : 3.2,
                name : "승부예측",
                link : "/tournaments/t1/brackets"
            },
            {
                id : 3.3,
                name : "예측포인트 랭킹",
                link : "/tournaments/t1/prizes"
            },
            {
                id : 3.4,
                name : "프로랭킹",
                link : "/team-ranks"
            },
            {
                id : 3.5,
                name : "프로선수정보",
                link : "/team-home"
            }
        ]
    },
    {
        id: 4,
        name: "강의",
        isSubMenu: true,
        subMenu: [
            {
                id: 4.1,
                name: "코칭AI",
                link: "/chat"
            },
            {
                id: 4.2,
                name: "멘토/멘티 매칭",
                link: "/teams"
            },
            {
                id: 4.3,
                name: "강사정보/후기",
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
                id: 5.1,
                name: "인기글",
                link: "/community"
            },
            {
                id: 5.2,
                name: "핫클립",
                link: "/trending"
            },
            {
                id: 5.3,
                name: "공략",
                link: "/blogs"
            },
            {
                id: 5.4,
                name: "팁과 노하우",
                link: "/blogs"
            },
            {
                id: 5.5,
                name: "듀오/스쿼드 조회",
                link: "/groups"
            }
        ]
    },
    {
        id: 6,
        name: "마이페이지",
        isSubMenu: true,
        subMenu: [
            {
                id: 6.1,
                name: "내 프로필",
                link: "/profile"
            },
            {
                id: 6.2,
                name: "북마크",
                link: "/saved"
            },
            {
                id: 6.3,
                name: "구독/결제",
                link: "/pricing-plan"
            },
            {
                id: 6.4,
                name: "내 활동정보",
                link: "/profile/forums"
            }
        ]
    },
    {
        id: 7,
        name: "채팅",
        isSubMenu: false,
        link : "/chat"
    },
    {
        id: 8,
        name: "고객문의",
        isSubMenu: false,
        link : "/faq"
        
    }
];