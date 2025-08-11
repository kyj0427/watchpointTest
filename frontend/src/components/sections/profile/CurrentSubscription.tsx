/**
 * 구독 관리 메인 컴포넌트
 * 
 * 기능:
 * - 현재 구독 정보 표시
 * - 구독 변경 및 취소 버튼
 * 
 * 백엔드 연동 포인트:
 * 1. currentSubscription 데이터를 API에서 가져오기
 * 
 * 모달 컴포넌트:
 * - PlanChangeModal: ./PlanChangeModal.tsx
 * - CancelSubscriptionModal: ./CancelSubscriptionModal.tsx
 */

import React, { useState } from 'react';
import { Package, Settings, CheckCircle } from 'lucide-react';

// 실제 프로젝트 import 경로 (문제 해결됨!)
import PlanChangeModal from './PlanChangeModal';
import CancelSubscriptionModal from './CancelSubscriptionModal';

interface SubscriptionPlan {
  id: string;
  name: string;
  status: 'active' | 'expired' | 'cancelled';
  price: string;
  nextBilling: string;
  features: string[];
}

const CurrentSubscription: React.FC = () => {
  // 모달 표시 상태만 관리
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // 백엔드 TODO: 실제 구독 정보를 API에서 가져오기
  // GET /api/subscription/current
  const currentSubscription: SubscriptionPlan = {
    id: 'sub_001',
    name: 'Premium Plan',
    status: 'active',
    price: '₩9,900',
    nextBilling: '2025-09-11',
    features: ['독점 콘텐츠 접근', '프리미엄 비디오', '광고 제거', '우선 고객지원']
  };

  // 구독 상태별 아이콘 반환
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  // 구독 상태별 텍스트 반환
  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '활성';
      case 'cancelled': return '취소됨';
      case 'expired': return '만료됨';
      default: return status;
    }
  };

  // 구독 상태별 색상 클래스 반환
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-500 bg-green-500/10';
      case 'cancelled':
        return 'text-red-500 bg-red-500/10';
      case 'expired':
        return 'text-yellow-500 bg-yellow-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Current Subscription Card */}
        <div className="rounded-lg p-6 border border-gray-700" style={{backgroundColor: '#0E1012'}}>
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Package className="w-6 h-6 text-orange-500" />
                <h2 className="text-2xl font-bold">{currentSubscription.name}</h2>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(currentSubscription.status)}`}>
                  {getStatusIcon(currentSubscription.status)}
                  {getStatusText(currentSubscription.status)}
                </div>
              </div>
              <p className="text-3xl font-bold text-orange-500 mb-1">
                {currentSubscription.price}
                <span className="text-base text-gray-400">/월</span>
              </p>
              <p className="text-gray-400">다음 결제일: {currentSubscription.nextBilling}</p>
            </div>
            {/* 설정 버튼 - 백엔드 TODO: 구독 설정 페이지 연결 */}
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* 포함된 기능 목록 */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">포함된 기능</h3>
            <ul className="space-y-2">
              {currentSubscription.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex gap-3 pt-4 border-t border-gray-700">
            <button 
              onClick={() => setShowPlanModal(true)}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              플랜 변경
            </button>
           
            <button 
              onClick={() => setShowCancelModal(true)}
              className="flex-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 font-medium py-3 px-4 rounded-lg border border-red-400/30 transition-colors"
            >
              구독 취소
            </button>
          </div>
        </div>

        {/* Usage Stats - 백엔드 TODO: 실제 사용 통계를 API에서 가져오기 */}
        {/* GET /api/subscription/usage-stats */}
       
      </div>

      {/* 모달 컴포넌트들 */}
      {showPlanModal && (
        <PlanChangeModal 
          isOpen={showPlanModal}
          onClose={() => setShowPlanModal(false)}
          currentSubscription={currentSubscription}
        />
      )}

      {showCancelModal && (
        <CancelSubscriptionModal 
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          currentSubscription={currentSubscription}
        />
      )}
    </>
  );
};

export default CurrentSubscription;