/** @jsxImportSource @emotion/react */
import React, { useState, useContext } from "react";
import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuid } from "uuid";
import * as s from "./style";
import { AuthContext } from "../../../../context/AuthContext";
import { postHealthPayment } from "../../../../apis/payApi"; // ✅ API 분리된 부분

const plans = [
  { name: "BASIC", month: 1, price: "₩120,000", amount: 120000 },
  { name: "STANDARD", month: 3, price: "₩240,000", amount: 240000 },
  { name: "ADVANCED", month: 6, price: "₩300,000", amount: 300000 },
  { name: "ELITE", month: 12, price: "₩420,000", amount: 420000 },
];

const promotionMap = { 1: 9, 3: 10, 6: 11, 12: 12 };

const HealthMembership = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { loginUser, loading } = useContext(AuthContext);

  if (loading) return <div>로그인 확인 중...</div>;

  const user_id = loginUser?.jti;

  const handlePayment = async () => {
    const plan = plans.find((p) => p.month === selectedPlan);
    if (!plan || !user_id) {
      alert("로그인이 필요합니다.");
      console.log("❌ 플랜 또는 유저 ID 없음:", plan, user_id);
      return;
    }

    const promotion_id = promotionMap[selectedPlan];
    const paymentId = uuid();
    const payMethodName = "KAKAOPAY";

    try {
      console.log("🟡 결제 시작");

      const paymentResponse = await PortOne.requestPayment({
        storeId: import.meta.env.VITE_PORTONE_STOREID,
        paymentId: paymentId,
        orderName: plan.name + " 헬스 멤버십 플랜",
        totalAmount: plan.amount,
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",
        easyPay: { provider: payMethodName },
        channelKey: "channel-key-2ddfd112-33ac-4c5d-8d4d-a98848300f31",
        customer: {
          customerId: user_id,
          fullName: "홍길동",
        },
        products: [
          {
            id: plan.month.toString(),
            name: plan.name + " 플랜",
            amount: plan.amount,
            quantity: 1,
          },
        ],
      });

      console.log("🟢 결제 성공:", paymentResponse);

      const payload = {
        reqMembershipDto: {
          userId: user_id,
          promotionId: promotion_id,
        },
        reqPayDto: {
          uuid: paymentId,
          userId: user_id,
          managerId: 0,
          promotionId: promotion_id,
          paymentMethod: payMethodName,
        },
      };

      await postHealthPayment(payload); // ✅ API 호출 분리

      alert("헬스 멤버십 결제가 완료되었습니다!");
    } catch (error) {
      console.error("❌ 결제 실패:", error);
      alert("결제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div css={s.main}>
      <h1 css={s.title}>STRONG INSIDE, GRACEFUL OUTSIDE.</h1>
      <h2 css={s.title}>내면은 강하게, 외면은 우아하게.</h2>

      <div css={s.subscriptionContainer}>
        <h2>헬스 멤버십 구독플랜</h2>
        <div css={s.plansWrapper}>
          {plans.map((plan, index) => (
            <div
              key={index}
              css={[s.planCard, selectedPlan === plan.month && s.selected]}
              onClick={() => setSelectedPlan(plan.month)}
            >
              <h3>{plan.name}</h3>
              <p>{plan.month}개월</p>
              <p>{plan.price}</p>
            </div>
          ))}
        </div>
        {selectedPlan && (
          <button css={s.purchaseBtn} onClick={handlePayment}>
            구매하기
          </button>
        )}
      </div>
    </div>
  );
};

export default HealthMembership;
