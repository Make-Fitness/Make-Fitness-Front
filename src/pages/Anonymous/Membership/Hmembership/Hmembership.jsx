/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as s from "./style";

const plans = [
  { name: "BASIC", month: 1, price: "₩120,000" },
  { name: "STANDARD", month: 3, price: "₩240,000" },
  { name: "ADVANCED", month: 6, price: "₩300,000" },
  { name: "ELITE", month: 12, price: "₩420,000" },
];

const Pilates = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("anonymous");
  const [selectedPlan, setSelectedPlan] = useState(null);

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
        {selectedPlan && <button css={s.purchaseBtn}>구매하기</button>}
      </div>
    </div>
  );
};

export default Pilates;