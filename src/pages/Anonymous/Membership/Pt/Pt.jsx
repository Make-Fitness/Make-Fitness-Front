/** Pt.jsx */
/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuid } from "uuid";
import * as s from "./style";
import axios from "axios"; // axios 추가

const plans = [
  { name: "BASIC", sessions: 12, bonus: "+ 헬스 1개월", price: "₩840,000", amount: 840000 },
  { name: "STANDARD", sessions: 24, bonus: "+ 헬스 2개월", price: "₩1,440,000", amount: 1440000 },
  { name: "ADVANCED", sessions: 36, bonus: "+ 헬스 3개월", price: "₩1,800,000", amount: 1800000 },
  { name: "ELITE", sessions: 50, bonus: "+ 헬스 6개월", price: "₩2,000,000", amount: 2000000 },
];

const promotionMap = { 12: 1, 24: 2, 36: 3, 50: 4 };

const Pt = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const location = useLocation();
  const { user_id, trainer } = location.state || {};
  const manager_id = trainer?.manager_id;

  const handlePayment = async () => {
    const plan = plans.find(p => p.sessions === selectedPlan);
    if (!plan) return;
    const promotion_id = promotionMap[selectedPlan];

    try {
      const paymentResponse = await PortOne.requestPayment({
        storeId: import.meta.env.VITE_PORTONE_STOREID,
        paymentId: uuid(),
        orderName: plan.name + " PT 플랜",
        totalAmount: plan.amount,
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",
        easyPay: { provider: "KAKAOPAY" },
        channelKey: "channel-key-2ddfd112-33ac-4c5d-8d4d-a98848300f31",
        customer: {
          customerId: user_id,
          fullName: "홍길동",
        },
        customData: {
          user_id,
          manager_id,
          promotion_id,
          pay_method: "KAKAOPAY",
        },
        products: [
          {
            id: plan.sessions.toString(),
            name: plan.name + " 플랜",
            amount: plan.amount,
            quantity: 1,
          },
        ],
      });

      console.log("결제 성공 응답:", paymentResponse);

      // ✅ 백엔드로 결제 정보 전송
      const payload = {
        user_id,
        manager_id,
        promotion_id,
        pay_method: "KAKAOPAY",
        plan_name: plan.name,
        sessions: plan.sessions,
        amount: plan.amount,
        transaction_id: paymentResponse.transactionId,
        status: paymentResponse.status,
        paid_at: paymentResponse.paidAt,
      };

      await axios.post("https://your-backend-api.com/api/payment/save", payload); // URL은 실제 백엔드 주소로 교체

    } catch (error) {
      console.error("결제 실패:", error);
      alert("결제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div css={s.main}>
      <h1 css={s.title}>SCULPTED BODY, UNBREAKABLE MIND.</h1>
      <h2 css={s.title}>조각 같은 몸, 흔들리지 않는 정신.</h2>
      <div css={s.subscriptionContainer}>
        <h2>1 : 1 구독 플랜</h2>
        <div css={s.plansWrapper}>
          {plans.map((plan, index) => (
            <div
              key={index}
              css={[s.planCard, selectedPlan === plan.sessions && s.selected]}
              onClick={() => setSelectedPlan(plan.sessions)}
            >
              <h3>{plan.name}</h3>
              <p>{plan.sessions}회</p>
              <p>{plan.bonus}</p>
              <p>{plan.price}</p>
            </div>
          ))}
        </div>
        {selectedPlan && (
          <button css={s.purchaseBtn} onClick={handlePayment}>구매하기</button>
        )}
      </div>
    </div>
  );
};

export default Pt;
