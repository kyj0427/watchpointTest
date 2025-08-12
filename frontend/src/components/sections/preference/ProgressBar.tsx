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
    <div className="flex justify-center mb-6 w-full">       
    
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-6"
            style={{ width: "180px" }}>
        
        {/* 진행률 바는 width에 따라 채워짐 */}
        <div
            className="bg-primary h-full rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
        ></div>
    </div>
    </div>
    );
};

export default ProgressBar;