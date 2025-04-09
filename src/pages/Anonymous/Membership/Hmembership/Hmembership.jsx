/** @jsxImportSource @emotion/react */
import React, { useState, useContext } from "react";
import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuid } from "uuid";
import * as s from "./style";
import { AuthContext } from "../../../../context/AuthContext";
import { postHealthPayment } from "../../../../apis/payApi";

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
  const isLoggedIn = !!user_id;
  const selectedPlanObj = plans.find((p) => p.month === selectedPlan);

  const handlePayment = async () => {
    if (!selectedPlanObj) {
      alert("구매하실 플랜을 먼저 선택해주세요.");
      return;
    }

    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }

    const promotion_id = promotionMap[selectedPlan];
    const paymentId = uuid();
    const payMethodName = "KAKAOPAY";

    try {
      console.log("결제 시작");

      const paymentResponse = await PortOne.requestPayment({
        storeId: import.meta.env.VITE_PORTONE_STOREID,
        paymentId,
        orderName: `${selectedPlanObj.name} 헬스 멤버십 플랜`,
        totalAmount: selectedPlanObj.amount,
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",
        easyPay: { provider: payMethodName },
        channelKey: "channel-key-2ddfd112-33ac-4c5d-8d4d-a98848300f31",
        customer: {
          customerId: user_id,
          fullName: loginUser?.nickName || "비회원",
        },
        products: [
          {
            id: selectedPlan.toString(),
            name: `${selectedPlanObj.name} 플랜`,
            amount: selectedPlanObj.amount,
            quantity: 1,
          },
        ],
      });

      console.log("결제 응답:", paymentResponse);

      const { status, code, pgCode, message, paymentId: resPid, txId } = paymentResponse;

      const isExplicitSuccess = status === "DONE" && code === "SUCCESS";
      const isImplicitSuccess =
        !status && !code && paymentResponse.txId && paymentResponse.paymentId;
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
            managerId: 0,
            promotionId: promotion_id,
            paymentMethod: payMethodName,
          },
        };

        await postHealthPayment(payload);
        alert("헬스 멤버십 결제가 완료되었습니다!");
      } else if (isFailure) {
        console.warn("결제 실패 또는 취소:", paymentResponse);
        alert(`결제가 완료되지 않았습니다.\n사유: ${message || "결제 취소 또는 실패"}`);
      } else {
        console.warn("결제 상태 불확실:", paymentResponse);
        alert("결제 상태를 확인할 수 없습니다.\nTXID: " + txId);
      }
    } catch (error) {
      console.error("결제 요청 중 오류:", error);
      alert("결제 중 오류가 발생했습니다. 다시 시도해주세요.");
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
          <button
            css={s.purchaseBtn}
            onClick={handlePayment}
            disabled={!isLoggedIn}
          >
            {isLoggedIn ? "구매하기" : "로그인 후 결제"}
          </button>
        )}
      </div>
    </div>
  );
};

export default HealthMembership;
