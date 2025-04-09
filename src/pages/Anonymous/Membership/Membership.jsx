/** @jsxImportSource @emotion/react */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import * as PortOne from "@portone/browser-sdk/v2";
import axios from '../../../../src/apis/axiosInstance';
import { AuthContext } from '../../../../src/context/AuthContext';
import * as s from './style';

function Membership() {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const user_id = loginUser?.jti;
  const manager_id = 0;
  const amount = 15000;
  const promotionId = 13;
  const payMethodName = "KAKAOPAY";

  const handleSingleUsePayment = async () => {
    if (!user_id) {
      alert("로그인이 필요합니다.");
      return;
    }

    const paymentId = uuid();

    try {
      const paymentResponse = await PortOne.requestPayment({
        storeId: import.meta.env.VITE_PORTONE_STOREID,
        paymentId,
        orderName: "1회 이용권",
        totalAmount: amount,
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
            id: "single",
            name: "1회 이용권",
            amount,
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
            promotionId,
          },
          reqPayDto: {
            uuid: paymentId,
            userId: user_id,
            managerId: manager_id,
            promotionId,
            paymentMethod: payMethodName,
          },
        };

        await axios.post("/api/makefitness/pay", payload);
        alert("1회 이용권 결제가 완료되었습니다!");
      } else if (isFailure) {
        console.warn("결제 실패 또는 취소:", paymentResponse);
        alert(`❌ 결제가 완료되지 않았습니다.\n사유: ${message || "결제가 중단되었거나 실패했습니다."}`);
      } else {
        console.warn("결제 상태 불확실:", paymentResponse);
        alert("결제 상태를 확인할 수 없습니다. 결제 내역에서 확인해주세요.\n\nTXID: " + txId);
      }
    } catch (error) {
      console.error("결제 요청 중 오류:", error);
      alert("결제 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div css={s.main}>
      <h1 css={s.title}>
        MAKE YOUR BODY, MAKE YOUR LIFE.<br />몸이 변하면 인생이 변한다.
      </h1>

      <div css={s.buttonGrid}>
        <button
          css={[s.button, !user_id && s.disabledButton]}
          onClick={user_id ? handleSingleUsePayment : null}
          disabled={!user_id}
        >
          <h3>1회 이용권</h3>
          <p>15,000원</p>
        </button>

        <button css={s.button} onClick={() => navigate("/makefitness/hmembership")}>
          <h3>헬스 멤버십</h3>
          <p>느리지만 단단하게</p>
        </button>

        <button css={s.button} onClick={() => navigate("/makefitness/pilates")}>
          <h3>그룹 필라테스</h3>
          <p>혼자보다 강하게! 그룹 필라테스로 최상의 시너지!</p>
        </button>

        <button css={s.button} onClick={() => navigate("/makefitness/selecttrainer")}>
          <h3>1:1 PT</h3>
          <p>조각같은 몸을 위한 첫걸음</p>
        </button>
      </div>
    </div>
  );
}

export default Membership;
