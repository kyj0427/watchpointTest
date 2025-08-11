import React from 'react';
import { Calendar, Package, Settings, Download, Eye, CheckCircle } from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  name: string;
  status: 'active' | 'expired' | 'cancelled';
  price: string;
  nextBilling: string;
  features: string[];
}

const CurrentSubscription: React.FC = () => {
  const currentSubscription: SubscriptionPlan = {
    id: 'sub_001',
    name: 'Premium Plan',
    status: 'active',
    price: '₩9,900',
    nextBilling: '2025-09-11',
    features: ['독점 콘텐츠 접근', '프리미엄 비디오', '광고 제거', '우선 고객지원']
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default :
        return <CheckCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '활성';
      case 'cancelled': return '취소됨';
      case 'expired': return '만료됨';
      default: return status;
    }
  };

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
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
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
          
          <div className="space-y-3">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
              플랜 변경
            </button>
            <button className="w-full border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold py-3 px-4 rounded-lg transition-colors">
              구독 일시정지
            </button>
            <button className="w-full text-red-400 hover:text-red-300 font-medium py-2 px-4 rounded-lg transition-colors">
              구독 취소
            </button>
          </div>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-lg p-4 border border-gray-700" style={{backgroundColor: '#0E1012'}}>
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-400">이번 달 시청</span>
          </div>
          <p className="text-2xl font-bold">
            47<span className="text-sm text-gray-400 ml-1">시간</span>
          </p>
        </div>
        
        <div className="rounded-lg p-4 border border-gray-700" style={{backgroundColor: '#0E1012'}}>
          <div className="flex items-center gap-3 mb-2">
            <Download className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-400">다운로드</span>
          </div>
          <p className="text-2xl font-bold">
            23<span className="text-sm text-gray-400 ml-1">개</span>
          </p>
        </div>
        
        <div className="rounded-lg p-4 border border-gray-700" style={{backgroundColor: '#0E1012'}}>
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-gray-400">구독 기간</span>
          </div>
          <p className="text-2xl font-bold">
            4<span className="text-sm text-gray-400 ml-1">개월</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentSubscription;