import React from 'react';
import { CreditCard, MoreVertical } from 'lucide-react';

const BillingInfo: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">결제 정보</h2>
      
      {/* Payment Methods */}
      <div className="rounded-lg p-6 border border-gray-700" style={{backgroundColor: '#0E1012'}}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">결제 수단</h3>
          <button className="text-orange-500 hover:text-orange-400 font-medium">
            + 추가
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-600" style={{backgroundColor: '#0E1012'}}>
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium">신한카드 ****1234</p>
                <p className="text-sm text-gray-400">만료일: 12/27</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">
                기본
              </span>
              <button className="text-gray-400 hover:text-white">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Additional Payment Method Example */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-600 opacity-60" style={{backgroundColor: '#0E1012'}}>
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-purple-500" />
              <div>
                <p className="font-medium">국민카드 ****5678</p>
                <p className="text-sm text-gray-400">만료일: 08/26</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-gray-500/20 text-gray-500 px-2 py-1 rounded-full">
                비활성
              </span>
              <button className="text-gray-400 hover:text-white">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div className="rounded-lg p-6 border border-gray-700" style={{backgroundColor: '#0E1012'}}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">청구지 주소</h3>
          <button className="text-orange-500 hover:text-orange-400 font-medium">
            편집
          </button>
        </div>
        
        <div className="text-gray-300 space-y-1">
          <p className="font-medium">홍길동</p>
          <p>서울특별시 강남구 테헤란로 123</p>
          <p>ABC빌딩 456호</p>
          <p>06123</p>
          <p>대한민국</p>
        </div>
      </div>

      {/* Tax Information */}
      <div className="rounded-lg p-6 border border-gray-700" style={{backgroundColor: '#0E1012'}}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">세금 정보</h3>
          <button className="text-orange-500 hover:text-orange-400 font-medium">
            편집
          </button>
        </div>
        
        <div className="text-gray-300">
          <div className="mb-4">
            <p className="font-medium mb-1">사업자등록번호</p>
            <p className="text-gray-400">미등록</p>
          </div>
          <p className="text-sm text-gray-400">
            사업자등록번호를 등록하면 세금계산서를 받을 수 있습니다.
          </p>
        </div>
      </div>

      {/* Invoice Preferences */}
      <div className="rounded-lg p-6 border border-gray-700" style={{backgroundColor: '#0E1012'}}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">영수증 설정</h3>
          <button className="text-orange-500 hover:text-orange-400 font-medium">
            편집
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">이메일 영수증</p>
              <p className="text-sm text-gray-400">결제 완료 시 이메일로 영수증을 받습니다</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS 알림</p>
              <p className="text-sm text-gray-400">결제 관련 SMS 알림을 받습니다</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingInfo;