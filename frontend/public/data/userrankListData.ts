// 주영웅 이미지파일 images>game_hero_hero_portrait 임포트
import heroPortraits from "@public/images/game_hero/hero_portrait";
import avatar1 from "@public/images/users/player_icon1.png"
import avatar2 from "@public/images/users/avatar2.png"
import avatar3 from "@public/images/users/avatar3.png"

export const userrankLists = [{
    목록: "01",
    아이콘: [avatar1],
    플레이어: "Revolution",
    KDA: "2.15",
    승률: 50,
    플레이시간: 33,
    모스트영웅: [heroPortraits.cassidy, heroPortraits.soldier76, heroPortraits.genji],},

    {
    목록: "02",
    아이콘: [avatar2],
    플레이어: "Revolution",
    KDA: "3.41",
    승률: 40,
    플레이시간: 108,
    모스트영웅: [heroPortraits.sojourn, heroPortraits.freja, heroPortraits.tracer]},

    {
    목록: "03",
    아이콘: [avatar3],
    플레이어: "Revolution",
    KDA: "1.6",
    승률: 47,
    플레이시간: 304,
    모스트영웅: [heroPortraits.junkrat, heroPortraits.reaper, heroPortraits.sombra]},
];
