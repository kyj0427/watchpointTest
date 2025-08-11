// src/data/preferenceQuestions.ts



export const questions = [
{
    id: "tier",
    question: "현재 본인의 오버워치 티어를 알려주세요.",
    options: ["브론즈", "실버", "골드", "플래티넘", "다이아", "마스터 이상", "랭크가 없습니다"],
    type: "single"
  },
  {
    id: "position",
    question: "관심 있거나 주로 플레이하는 포지션이 있나요?",
    options: ["탱커", "딜러", "서포터" ,"모두 해당"],
    type: "single"
  },
  {
    id: "playstyle",
    question: " 본인의 플레이 성향을 고른다면?",
    options: ["공격적인 플레이", "안정적인 플레이", "균형적인 플레이" ,"정해지지 않음"],
    type: "single"
  },
  {
    id: "video_length",
    question: "선호하시는 영상 길이가 있나요?",
    options: ["3분 미만의 영상 혹은 쇼츠", "3분 ~ 10분", "그 이상", "상관 없습니다"],
    type: "single"
  },
  {
    id: "content_types",
    question: "어떤 유형의 영상을 즐겨보시나요?",
    options: ["프로 경기 하이라이트","패치노트","개인 스트리머","영웅 정보","맵 정보","맵 강의"],
    type: "multi"
  },
  {
    id: "goal",
    question: "저희 플랫폼을 이용하면서 달성하고 싶은 목표가 있나요?",
    options: ["티어 상승","특정 영웅 숙련","에임 향상","게임 이해도 증가", "다양한 정보 얻기"],
    type: "multi"
  },

];