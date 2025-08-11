import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSubscription: {
    features: string[];
  };
}

const CancelSubscriptionModal: React.FC<CancelSubscriptionModalProps> = ({ isOpen, onClose, currentSubscription }) => {
  const [cancelStep, setCancelStep] = useState(1);
  const [selectedReason, setSelectedReason] = useState('');

  const cancelReasons = [
    "너무 비싸요",
    "충분히 사용하지 않아요",
    "원하는 콘텐츠가 없어요",
    "다른 서비스를 사용해요",
    "서비스 품질이 아쉬워요",
    "기타"
  ];

  const handleCancelNext = () => {
    if (cancelStep < 3) {
      setCancelStep(cancelStep + 1);
    }
  };

  const handleCancelBack = () => {
    if (cancelStep > 1) {
      setCancelStep(cancelStep - 1);
    }
  };

  const closeCancelModal = () => {
    onClose();
    setCancelStep(1);
    setSelectedReason('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{zIndex: 9999}}>
      <div className="rounded-lg p-8 max-w-2xl w-full border border-gray-700" style={{backgroundColor: '#0E1012'}}>
        
        {/* Step 1: 취소 사유 선택 */}
        {cancelStep === 1 && (
          <>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">구독을 취소하시는 이유를 알려주세요</h3>
              <p className="text-gray-400">더 나은 서비스를 제공하기 위해 소중한 의견을 듣고 싶습니다.</p>
            </div>

            <div className="space-y-3 mb-8">
              {cancelReasons.map((reason, index) => (
                <label 
                  key={index}
                  className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedReason === reason 
                      ? 'border-orange-500 bg-orange-500/10' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="cancelReason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedReason === reason 
                      ? 'border-orange-500 bg-orange-500' 
                      : 'border-gray-400'
                  }`}>
                    {selectedReason === reason && (
                      <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                    )}
                  </div>
                  <span className="text-white">{reason}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button 
                onClick={closeCancelModal}
                className="flex-1 py-3 px-4 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
              >
                취소
              </button>
              <button 
                onClick={handleCancelNext}
                disabled={!selectedReason}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                  selectedReason 
                    ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                다음
              </button>
            </div>
          </>
        )}

        {/* Step 2: 혜택 유지 제안 */}
        {cancelStep === 2 && (
          <>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">잠깐! 특별 혜택을 놓치지 마세요</h3>
              <p className="text-gray-400">구독을 유지하시면 이런 혜택을 계속 받으실 수 있어요</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* 50% 할인 제안 */}
              <div className="border border-orange-500 rounded-lg p-6 bg-orange-500/10">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-orange-500 mb-1">50% 할인</div>
                  <div className="text-gray-300">3개월 특별 가격</div>
                </div>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-white">₩4,950<span className="text-sm text-gray-400">/월</span></div>
                  <div className="text-sm text-gray-400 line-through">₩9,900/월</div>
                </div>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors">
                  할인 혜택 받기
                </button>
              </div>

              {/* 무료 플랜 제안 */}
              <div className="border border-gray-600 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-300 mb-1">무료 플랜</div>
                  <div className="text-gray-400">기본 콘텐츠 이용</div>
                </div>
                <div className="space-y-2 mb-4 text-sm text-gray-300">
                  <div>• 기본 콘텐츠 접근</div>
                  <div>• 표준 화질</div>
                  <div>• 1개 기기 동시 시청</div>
                </div>
                <button className="w-full border border-gray-600 text-gray-300 hover:bg-gray-800 font-medium py-3 rounded-lg transition-colors">
                  무료 플랜으로 변경
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleCancelBack}
                className="flex-1 py-3 px-4 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
              >
                이전
              </button>
              <button 
                onClick={handleCancelNext}
                className="flex-1 py-3 px-4 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-400/30 transition-colors"
              >
                그래도 취소할게요
              </button>
            </div>
          </>
        )}

        {/* Step 3: 최종 확인 */}
        {cancelStep === 3 && (
          <>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">정말로 구독을 취소하시겠어요?</h3>
              <p className="text-gray-400">취소하시면 다음 혜택들을 잃게 됩니다</p>
            </div>

            {/* 잃게 될 혜택들 */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-red-400 mb-4">취소 시 잃게 되는 혜택</h4>
              <ul className="space-y-2 text-gray-300">
                {currentSubscription?.features?.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <X className="w-4 h-4 text-red-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* 취소 조건 안내 */}
            <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-300 mb-2">취소 안내사항</h4>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>• 구독은 다음 결제일(2025-09-11)까지 유효합니다</li>
                <li>• 취소 후에도 기간 종료까지 서비스를 이용하실 수 있습니다</li>
                <li>• 재가입 시 현재 할인 혜택은 적용되지 않을 수 있습니다</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleCancelBack}
                className="flex-1 py-3 px-4 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
              >
                이전
              </button>
              <button 
                onClick={() => {
                  // 실제 취소 로직 구현
                  alert('구독이 취소되었습니다.');
                  closeCancelModal();
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition-colors"
              >
                구독 취소 확정
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default CancelSubscriptionModal;