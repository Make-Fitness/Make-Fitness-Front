/**@jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import * as s from './style';
import React, { useContext } from 'react';
import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuid } from "uuid";
import axios from '../../../../src/apis/axiosInstance';
import { AuthContext } from '../../../../src/context/AuthContext';

function Membership() {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
  const user_id = loginUser?.jti;
  const manager_id = 0; // 1회 이용권은 담당 트레이너 없음

  const handleSingleUsePayment = async () => {
    if (!user_id) return;

    const paymentId = uuid();
    const amount = 15000;
    const promotionId = 13;
    const payMethodName = "KAKAOPAY";

    try {
      const paymentResponse = await PortOne.requestPayment({
        storeId: import.meta.env.VITE_PORTONE_STOREID,
        paymentId: paymentId,
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
            amount: amount,
            quantity: 1,
          },
        ],
      });

      console.log("결제 성공 응답:", paymentResponse);

      const payload = {
        reqMembershipDto: {
          userId: user_id,
          promotionId: promotionId,
        },
        reqPayDto: {
          uuid: paymentId,
          userId: user_id,
          managerId: manager_id,
          promotionId: promotionId,
          paymentMethod: payMethodName,
        },
      };

      await axios.post("/api/makefitness/pay", payload);
      alert("1회 이용권 결제가 완료되었습니다!");

    } catch (error) {
      console.error("결제 실패:", error);
      alert("결제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div css={s.main}>
      <h1 css={s.title}>MAKE YOUR BODY, MAKE YOUR LIFE. 몸이 변하면 인생이 변한다.</h1>

      {!user_id && (
        <p css={s.warning}>※ 로그인이 필요합니다. 로그인 후 이용해주세요.</p>
      )}

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
