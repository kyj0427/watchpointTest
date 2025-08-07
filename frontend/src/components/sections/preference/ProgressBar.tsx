// 모달창 단계별 게이지 증가율

//전체 props 구조 (타입)
interface ProgressBarProps {
    currentStep: number
    totalSteps: number
}

//필요한 props 꺼내 쓰기 , 컴포넌트 정의
const ProgressBar = ({currentStep , totalSteps}: ProgressBarProps)=>{
    //현재 진행률 
    const percentage = (currentStep / totalSteps) * 100;

    return (
    // 배경 바 (회색)
    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-6">
        {/* 진행률 바는 width에 따라 채워짐 */}
        <div
        className="bg-red-500 h-full rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }} // → 진행 비율만큼 너비 설정
        ></div>
    </div>
    );
};

export default ProgressBar;