import React, { useState } from 'react';
import { MoreVertical, CheckCircle, XCircle, Clock } from 'lucide-react';

interface PaymentHistory {
  id: string;
  date: string;
  plan: string;
  amount: string;
  status: 'completed' | 'failed' | 'pending';
  method: string;
  invoice: string;
}

const PaymentHistory: React.FC = () => {
  const [showInvoice, setShowInvoice] = useState<string | null>(null);

  const paymentHistory: PaymentHistory[] = [
    {
      id: 'pay_005',
      date: '2025-08-11',
      plan: 'Premium Plan',
      amount: '₩9,900',
      status: 'completed',
      method: '신한카드 ****1234',
      invoice: 'INV-2025-08-001'
    },
    {
      id: 'pay_004',
      date: '2025-07-11',
      plan: 'Premium Plan',
      amount: '₩9,900',
      status: 'completed',
      method: '신한카드 ****1234',
      invoice: 'INV-2025-07-001'
    },
    {
      id: 'pay_003',
      date: '2025-06-11',
      plan: 'Premium Plan',
      amount: '₩9,900',
      status: 'completed',
      method: '신한카드 ****1234',
      invoice: 'INV-2025-06-001'
    },
    {
      id: 'pay_002',
      date: '2025-05-11',
      plan: 'Basic Plan',
      amount: '₩0',
      status: 'completed',
      method: '무료 플랜',
      invoice: 'INV-2025-05-001'
    },
    {
      id: 'pay_001',
      date: '2025-04-15',
      plan: 'Pro Plan',
      amount: '₩19,900',
      status: 'failed',
      method: '국민카드 ****5678',
      invoice: 'INV-2025-04-001'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '완료';
      case 'failed': return '실패';
      case 'pending': return '대기중';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-500/10';
      case 'failed':
        return 'text-red-500 bg-red-500/10';
      case 'pending':
        return 'text-yellow-500 bg-yellow-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">결제 내역</h2>
        <div className="flex gap-2">
          <select className="border border-gray-600 rounded-lg px-3 py-2 text-sm" style={{backgroundColor: '#0E1012'}}>
            <option>전체 기간</option>
            <option>최근 3개월</option>
            <option>최근 6개월</option>
            <option>최근 1년</option>
          </select>
        </div>
      </div>

      <div className="rounded-lg border border-gray-700 overflow-hidden" style={{backgroundColor: '#0E1012'}}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{backgroundColor: '#0E1012'}}>
              <tr>
                <th className="text-left p-4 font-medium text-gray-300">날짜</th>
                <th className="text-left p-4 font-medium text-gray-300">플랜</th>
                <th className="text-left p-4 font-medium text-gray-300">금액</th>
                <th className="text-left p-4 font-medium text-gray-300">결제수단</th>
                <th className="text-left p-4 font-medium text-gray-300">상태</th>
                <th className="text-left p-4 font-medium text-gray-300">액션</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="border-t border-gray-700 hover:bg-gray-800/50">
                  <td className="p-4 text-gray-300">{payment.date}</td>
                  <td className="p-4">{payment.plan}</td>
                  <td className="p-4 font-semibold">{payment.amount}</td>
                  <td className="p-4 text-gray-300">{payment.method}</td>
                  <td className="p-4">
                    <div className={`flex items-center gap-1 w-fit px-2 py-1 rounded-full text-sm ${getStatusColor(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      {getStatusText(payment.status)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setShowInvoice(payment.invoice)}
                        className="text-orange-500 hover:text-orange-400 text-sm font-medium"
                      >
                        영수증
                      </button>
                      <button className="p-1 hover:bg-gray-700 rounded">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="rounded-lg p-6 max-w-md w-full border border-gray-700" style={{backgroundColor: '#0E1012'}}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">영수증 다운로드</h3>
              <button onClick={() => setShowInvoice(null)} className="text-gray-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-300 mb-6">영수증 번호: {showInvoice}</p>
            <div className="flex gap-3">
              <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg">
                PDF 다운로드
              </button>
              <button 
                onClick={() => setShowInvoice(null)}
                className="flex-1 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold py-2 px-4 rounded-lg"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;