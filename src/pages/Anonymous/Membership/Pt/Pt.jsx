/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuid } from "uuid";
import * as s from "./style";
import { postHealthPayment } from "../../../../apis/payApi";

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
    if (!plan || !user_id || !manager_id) {
      alert("로그인 또는 트레이너 정보가 필요합니다.");
      console.log("❌ 유효하지 않은 정보:", plan, user_id, manager_id);
      return;
    }

    const promotion_id = promotionMap[selectedPlan];
    const paymentId = uuid();
    const payMethodName = "KAKAOPAY";

    try {
      const paymentResponse = await PortOne.requestPayment({
        storeId: import.meta.env.VITE_PORTONE_STOREID,
        paymentId,
        orderName: plan.name + " PT 플랜",
        totalAmount: plan.amount,
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",
        easyPay: { provider: payMethodName },
        channelKey: "channel-key-2ddfd112-33ac-4c5d-8d4d-a98848300f31",
        customer: {
          customerId: user_id,
          fullName: "홍길동",
        },
        customData: {
          user_id,
          manager_id,
          promotion_id,
          pay_method: payMethodName,
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

      console.log("결제 응답:", paymentResponse);

      const { status, code, pgCode, message, txId, paymentId: resPid } = paymentResponse;

      const isExplicitSuccess =
        status === "DONE" && code === "SUCCESS" && (!pgCode || pgCode !== "CANCEL");

      const isImplicitSuccess =
        !status && !code && txId && resPid;

      const isFailure = pgCode === "CANCEL" || code?.includes("FAILURE");

      if (isExplicitSuccess || isImplicitSuccess) {
        const payload = {
          reqMembershipDto: {
            userId: user_id,
            promotionId: promotion_id,
          },
          reqPayDto: {
            uuid: paymentId,
            userId: user_id,
            managerId: manager_id,
            promotionId: promotion_id,
            paymentMethod: payMethodName,
          },
        };

        await postHealthPayment(payload);
        alert("결제가 완료되었습니다!");
      } else if (isFailure) {
        console.warn("결제 실패 또는 취소:", paymentResponse);
        alert(`결제가 완료되지 않았습니다.\n사유: ${message || "사용자 결제 취소 또는 실패"}`);
      } else {
        console.warn("결제 상태 불확실:", paymentResponse);
        alert(
          "결제 상태를 확인할 수 없습니다. 결제 내역에서 상태를 확인해주세요.\n\nTXID: " + txId
        );
      }
    } catch (error) {
      console.error("결제 요청 중 오류:", error);
      alert("결제 중 오류가 발생했습니다. 다시 시도해주세요.");
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
          <button css={s.purchaseBtn} onClick={handlePayment}>
            구매하기
          </button>
        )}
      </div>
    </div>
  );
};

export default Pt;
