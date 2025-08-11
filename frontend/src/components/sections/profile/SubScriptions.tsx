"use client";

import CurrentSubscription from "./CurrentSubscription";
import PaymentHistory from "./PaymentHistory";
import BillingInfo from "./BillingInfo";

// import BillingInfo from "./BillingInfo";

const SubScriptions = () => {
  return (
    <section className="container py-8 space-y-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">구독 </h1>
        
      </header>

      {/* 현재 구독 */}
      <div>
        <h2 className="text-xl font-semibold mb-3">현재 구독</h2>
        <CurrentSubscription />
      </div>

      {/* 결제 내역 */}
      <div>
        <h2 className="text-xl font-semibold mb-3">결제 내역</h2>
        <PaymentHistory />
      </div>

      {/* 결제 정보*/
      <div>
        <h2 className="text-xl font-semibold mb-3">결제 정보</h2>
        <BillingInfo />
      </div> }
    </section>
  );
};

export default SubScriptions;