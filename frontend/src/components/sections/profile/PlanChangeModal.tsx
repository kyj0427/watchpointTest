import React, { useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface PlanChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSubscription: {
    name: string;
    features: string[];
  };
}

const PlanChangeModal: React.FC<PlanChangeModalProps> = ({ isOpen, onClose, currentSubscription }) => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    { name: "Basic Plan", monthly: 0, yearly: 0, features: ["기본 콘텐츠 접근", "표준 화질", "1개 기기 동시 시청"] },
    { name: "Premium Plan", monthly: 9900, yearly: 99000, features: ["독점 콘텐츠 접근", "프리미엄 비디오", "광고 제거", "우선 고객지원"] },
    { name: "Ultimate Plan", monthly: 19900, yearly: 199000, features: ["모든 프리미엄 기능", "4K 화질", "5개 기기 동시 시청", "오프라인 다운로드 무제한"] }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{zIndex: 9999}}>
      <div className="rounded-lg p-8 max-w-6xl w-full border border-gray-700 max-h-[90vh] overflow-y-auto" style={{backgroundColor: '#0E1012'}}>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-bold text-white">플랜 변경</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="flex justify-center items-center gap-4 mb-10">
          <span className={`text-xl font-medium ${!isYearly ? 'text-orange-500' : 'text-gray-400'}`}>월간</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isYearly}
              onChange={() => setIsYearly(!isYearly)}
              className="sr-only peer"
            />
            <div className="relative w-14 h-7 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-orange-500"></div>
          </label>
          <span className={`text-xl font-medium ${isYearly ? 'text-orange-500' : 'text-gray-400'}`}>연간</span>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {plans.map((plan, idx) => (
            <div key={idx} className={`border-2 rounded-xl p-8 transition-all duration-300 hover:border-orange-500 hover:shadow-lg flex flex-col h-full ${plan.name === currentSubscription?.name ? 'border-orange-500 bg-orange-500/10 shadow-lg' : 'border-gray-600'}`}>
              <div className="text-center pb-6 border-b border-gray-600 mb-6">
                <span className="text-sm text-gray-400 uppercase mb-3 block font-medium">
                  {isYearly ? "연간" : "월간"}
                </span>
                <h4 className="text-2xl font-bold text-white mb-4">
                  {plan.name}
                </h4>
                <div className="mb-2">
                  <h2 className="text-4xl font-bold text-orange-500">
                    ₩{(isYearly ? plan.yearly : plan.monthly).toLocaleString()}
                  </h2>
                  <span className="text-lg text-gray-400">
                    /{isYearly ? '연' : '월'}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-4 px-6 rounded-xl text-lg font-bold transition-all duration-300 mt-auto ${
                  plan.name === currentSubscription?.name
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg transform hover:scale-105'
                }`}
                disabled={plan.name === currentSubscription?.name}
              >
                {plan.name === currentSubscription?.name ? '현재 플랜' : '플랜 선택'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanChangeModal;