// public/data/athena-videos.ts

// ====== Types ======
export type VideoAnalysis = {
  overallScore: number;
  positioning: number;
  aim?: number;
  gameSense: number;
  ultimateUsage: number;
  teamwork: number;
  healing?: number;
  shieldManagement?: number;
};

export type ChatMessage = {
  id: string;
  type: "ai" | "user";
  message: string;
  timestamp: string;
};

export type Video = {
  //DB 타입 동일
  file_id?: string;
  file_name?: string;
  file_path?: string;
  file_size?: number;
  upload_date?: string; 

  //추가필드
  id : string;
  title: string;
  description: string;
  duration: string;
  fileSize: string;
  status: "completed" | "processing" | "failed";
  analysisStatus: string;
  thumbnail: string;
  hero: string;
  map: string;
  rank: string;
  analysis: VideoAnalysis | null;
  chatHistory: ChatMessage[];
};

export type UserStats = {
  totalVideos: number;
  completedAnalysis: number;
  processingAnalysis: number;
  failedAnalysis: number;
  averageScore: number;
  mostPlayedHero: string;
  favoriteMap: string;
};

export type AthenaVideosData = {
  videos: Video[];
  userStats: UserStats;
};

// 유저별 동영상 데이터 타입
export type UserVideosData = {
  [userId: number]: {
    videos: Video[];
    userStats: UserStats;
  };
};

// ====== Sample Data ======
export const athenaVideosData: AthenaVideosData = {
  videos: [
    {
      id: "1",
      title: "플레이 영상 1 - 리퍼 플레이",
      description: "리퍼로 한 게임 플레이 영상입니다. 포지셔닝과 궁극기 활용에 대한 분석이 필요합니다.",
      upload_date: "2024-01-15T10:30:00Z",
      duration: "15:32",
      fileSize: "45.2MB",
      status: "completed",
      analysisStatus: "분석 완료",
      thumbnail: "/images/game_hero/hero_portrait_bg/Reaper_heroImage_3.jpg",
      file_path: "/images/game_hero/hero_abilites_video/Reaper_video.webm" , 
      hero: "Reaper",
      map: "King's Row",
      rank: "Diamond",
      analysis: {
        overallScore: 85,
        positioning: 78,
        aim: 92,
        gameSense: 88,
        ultimateUsage: 82,
        teamwork: 90
      },
      chatHistory: [
        {
          id: "1",
          type: "ai",
          message: "안녕하세요! 리퍼 플레이 영상을 분석해드리겠습니다.",
          timestamp: "2024-01-15T10:35:00Z"
        },
        {
          id: "2", 
          type: "user",
          message: "포지셔닝 개선 방법을 알려주세요",
          timestamp: "2024-01-15T10:36:00Z"
        },
        {
          id: "3",
          type: "ai", 
          message: "리퍼의 포지셔닝 개선을 위해서는 엄폐물 활용, 고지대 활용, 팀과의 거리 유지가 중요합니다.",
          timestamp: "2024-01-15T10:37:00Z"
        }
      ]
    },
    {
      id: "2",
      title: "플레이 영상 2 - 메르시 힐링",
      description: "메르시 힐러 플레이 영상입니다. 힐링 우선순위와 포지셔닝에 대한 피드백이 필요합니다.",
      upload_date: "2024-01-14T14:20:00Z",
      duration: "18:45",
      fileSize: "52.1MB",
      status: "completed",
      analysisStatus: "분석 완료",
      thumbnail: "/images/game_hero/hero_portrait_bg/Mercy_heroImage_3.jpg",
      hero: "Mercy",
      map: "Numbani",
      rank: "Platinum",
      analysis: {
        overallScore: 92,
        positioning: 95,
        healing: 88,
        gameSense: 90,
        ultimateUsage: 85,
        teamwork: 94
      },
      chatHistory: [
        {
          id: "1",
          type: "ai",
          message: "메르시 힐링 플레이를 분석해드리겠습니다.",
          timestamp: "2024-01-14T14:25:00Z"
        },
        {
          id: "2",
          type: "user", 
          message: "힐링 우선순위는 어떻게 정하나요?",
          timestamp: "2024-01-14T14:26:00Z"
        },
        {
          id: "3",
          type: "ai",
          message: "힐링 우선순위는 탱커 > 딜러 > 다른 힐러 순서로 하되, 상황에 따라 유연하게 대응해야 합니다.",
          timestamp: "2024-01-14T14:27:00Z"
        }
      ]
    },
    {
      id: "3", 
      title: "플레이 영상 3 - 라인하르트 탱킹",
      description: "라인하르트 탱커 플레이 영상입니다. 실드 관리와 궁극기 타이밍에 대한 분석이 필요합니다.",
      upload_date: "2024-01-13T09:15:00Z",
      duration: "20:18",
      fileSize: "58.7MB",
      status: "completed",
      analysisStatus: "분석 완료",
      thumbnail: "/images/game_hero/hero_portrait_bg/Reinhardt_heroImage_3.jpg",
      hero: "Reinhardt",
      map: "Eichenwalde",
      rank: "Gold",
      analysis: {
        overallScore: 78,
        positioning: 75,
        shieldManagement: 80,
        gameSense: 82,
        ultimateUsage: 70,
        teamwork: 85
      },
      chatHistory: [
        {
          id: "1",
          type: "ai",
          message: "라인하르트 탱킹 플레이를 분석해드리겠습니다.",
          timestamp: "2024-01-13T09:20:00Z"
        },
        {
          id: "2",
          type: "user",
          message: "실드 관리는 어떻게 해야 하나요?",
          timestamp: "2024-01-13T09:21:00Z"
        },
        {
          id: "3",
          type: "ai",
          message: "실드는 500 이하로 떨어뜨리지 말고, 팀원이 안전할 때는 실드를 내려서 회복시키는 것이 중요합니다.",
          timestamp: "2024-01-13T09:22:00Z"
        }
      ]
    },
    {
      id: "4",
      title: "플레이 영상 4 - 한조 스나이핑",
      description: "한조 스나이퍼 플레이 영상입니다. 에임과 포지셔닝에 대한 피드백이 필요합니다.",
      upload_date: "2024-01-12T16:45:00Z",
      duration: "17:30",
      fileSize: "48.9MB",
      status: "processing",
      analysisStatus: "분석 중",
      thumbnail: "/images/game_hero/hero_portrait_bg/Hanzo_heroImage_3.jpg",
      hero: "Hanzo",
      map: "Dorado",
      rank: "Master",
      analysis: null,
      chatHistory: []
    },
    {
      id: "5",
      title: "플레이 영상 5 - 아나 스나이핑",
      description: "아나 스나이퍼 플레이 영상입니다. 힐링과 딜링 밸런스에 대한 분석이 필요합니다.",
      upload_date: "2024-01-11T11:30:00Z",
      duration: "19:22",
      fileSize: "55.3MB",
      status: "failed",
      analysisStatus: "분석 실패",
      thumbnail: "/images/game_hero/hero_portrait_bg/Ana_heroImage_3.jpg",
      hero: "Ana",
      map: "Havana",
      rank: "Diamond",
      analysis: null,
      chatHistory: []
    }
  ],
  userStats: {
    totalVideos: 5,
    completedAnalysis: 3,
    processingAnalysis: 1,
    failedAnalysis: 1,
    averageScore: 85,
    mostPlayedHero: "Reaper",
    favoriteMap: "King's Row"
  }
};

// 유저별 동영상 데이터
export const userVideosData: UserVideosData = {
  // Faker (id: 1) - 동영상 있음
  1: {
    videos: [
      {
        id: "1",
        title: "플레이 영상 1 - 리퍼 플레이",
        description: "리퍼로 한 게임 플레이 영상입니다. 포지셔닝과 궁극기 활용에 대한 분석이 필요합니다.",
        upload_date: "2024-01-15T10:30:00Z",
        duration: "15:32",
        fileSize: "45.2MB",
        status: "completed",
        analysisStatus: "분석 완료",
        thumbnail: "/images/game_hero/hero_portrait_bg/Reaper_heroImage_2.jpg",
        file_path: "https://www.youtube.com/embed/z-fEjgCuZWE" ,
        hero: "Reaper",
        map: "King's Row",
        rank: "Diamond",
        analysis: {
          overallScore: 85,
          positioning: 78,
          aim: 92,
          gameSense: 88,
          ultimateUsage: 82,
          teamwork: 90
        },
        chatHistory: [
          {
            id: "1",
            type: "ai",
            message: "안녕하세요! 리퍼 플레이 영상을 분석해드리겠습니다.",
            timestamp: "2024-01-15T10:35:00Z"
          },
          {
            id: "2", 
            type: "user",
            message: "포지셔닝 개선 방법을 알려주세요",
            timestamp: "2024-01-15T10:36:00Z"
          },
          {
            id: "3",
            type: "ai", 
            message: "리퍼의 포지셔닝 개선을 위해서는 엄폐물 활용, 고지대 활용, 팀과의 거리 유지가 중요합니다.",
            timestamp: "2024-01-15T10:37:00Z"
          }
        ]
      },
      {
        id: "2",
        title: "플레이 영상 2 - 메르시 힐링",
        description: "메르시 힐러 플레이 영상입니다. 힐링 우선순위와 포지셔닝에 대한 피드백이 필요합니다.",
        upload_date: "2024-01-14T14:20:00Z",
        duration: "18:45",
        fileSize: "52.1MB",
        status: "completed",
        analysisStatus: "분석 완료",
        thumbnail: "/images/game_hero/hero_portrait_bg/Mercy_heroImage_2.jpg",
        file_path: "/images/game_hero/hero_abilities_video/Mercy_video.webm",
        hero: "Mercy",
        map: "Numbani",
        rank: "Platinum",
        analysis: {
          overallScore: 92,
          positioning: 95,
          healing: 88,
          gameSense: 90,
          ultimateUsage: 85,
          teamwork: 94
        },
        chatHistory: [
          {
            id: "1",
            type: "ai",
            message: "메르시 힐링 플레이를 분석해드리겠습니다.",
            timestamp: "2024-01-14T14:25:00Z"
          },
          {
            id: "2",
            type: "user", 
            message: "힐링 우선순위는 어떻게 정하나요?",
            timestamp: "2024-01-14T14:26:00Z"
          },
          {
            id: "3",
            type: "ai",
            message: "힐링 우선순위는 탱커 > 딜러 > 다른 힐러 순서로 하되, 상황에 따라 유연하게 대응해야 합니다.",
            timestamp: "2024-01-14T14:27:00Z"
          }
        ]
      },
      {
        id: "3", 
        title: "플레이 영상 3 - 라인하르트 탱킹",
        description: "라인하르트 탱커 플레이 영상입니다. 실드 관리와 궁극기 타이밍에 대한 분석이 필요합니다.",
        upload_date: "2024-01-13T09:15:00Z",
        duration: "20:18",
        fileSize: "58.7MB",
        status: "completed",
        analysisStatus: "분석 완료",
        thumbnail: "/images/game_hero/hero_portrait_bg/Reinhardt_heroImage_3.jpg",
        hero: "Reinhardt",
        map: "Eichenwalde",
        rank: "Gold",
        analysis: {
          overallScore: 78,
          positioning: 75,
          shieldManagement: 80,
          gameSense: 82,
          ultimateUsage: 70,
          teamwork: 85
        },
        chatHistory: [
          {
            id: "1",
            type: "ai",
            message: "라인하르트 탱킹 플레이를 분석해드리겠습니다.",
            timestamp: "2024-01-13T09:20:00Z"
          },
          {
            id: "2",
            type: "user",
            message: "실드 관리는 어떻게 해야 하나요?",
            timestamp: "2024-01-13T09:21:00Z"
          },
          {
            id: "3",
            type: "ai",
            message: "실드는 500 이하로 떨어뜨리지 말고, 팀원이 안전할 때는 실드를 내려서 회복시키는 것이 중요합니다.",
            timestamp: "2024-01-13T09:22:00Z"
          }
        ]
      },
      {
        id: "4",
        title: "플레이 영상 4 - 한조 스나이핑",
        description: "한조 스나이퍼 플레이 영상입니다. 에임과 포지셔닝에 대한 피드백이 필요합니다.",
        upload_date: "2024-01-12T16:45:00Z",
        duration: "17:30",
        fileSize: "48.9MB",
        status: "processing",
        analysisStatus: "분석 중",
        thumbnail: "/images/game_hero/hero_portrait_bg/Hanzo_heroImage_3.jpg",
        hero: "Hanzo",
        map: "Dorado",
        rank: "Master",
        analysis: null,
        chatHistory: []
      },
      {
        id: "5",
        title: "플레이 영상 5 - 아나 스나이핑",
        description: "아나 스나이퍼 플레이 영상입니다. 힐링과 딜링 밸런스에 대한 분석이 필요합니다.",
        upload_date: "2024-01-11T11:30:00Z",
        duration: "19:22",
        fileSize: "55.3MB",
        status: "failed",
        analysisStatus: "분석 실패",
        thumbnail: "/images/game_hero/hero_portrait_bg/Ana_heroImage_3.jpg",
        hero: "Ana",
        map: "Havana",
        rank: "Diamond",
        analysis: null,
        chatHistory: []
      }
    ],
    userStats: {
      totalVideos: 5,
      completedAnalysis: 3,
      processingAnalysis: 1,
      failedAnalysis: 1,
      averageScore: 85,
      mostPlayedHero: "Reaper",
      favoriteMap: "King's Row"
    }
  },
  // Newbie (id: 2) - 동영상 없음
  2: {
    videos: [],
    userStats: {
      totalVideos: 0,
      completedAnalysis: 0,
      processingAnalysis: 0,
      failedAnalysis: 0,
      averageScore: 0,
      mostPlayedHero: "없음",
      favoriteMap: "없음"
    }
  }
};

export default athenaVideosData;
