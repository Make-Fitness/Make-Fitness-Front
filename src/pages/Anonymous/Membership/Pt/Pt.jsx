/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as s from "./style";
import { MENUS } from "../../../../constants/menu"; // ✅ MENUS import 추가

const plans = [
  { name: "BASIC", sessions: 12, price: "₩840,000" },
  { name: "STANDARD", sessions: 24, price: "₩1,440,000" },
  { name: "ADVANCED", sessions: 36, price: "₩1,800,000" },
  { name: "ELITE", sessions: 50, price: "₩2,000,000" },
];

const Pt = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("anonymous");
  const [selectedPlan, setSelectedPlan] = useState(null);

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
              <p>{plan.price}</p>
            </div>
          ))}
        </div>
        {selectedPlan && <button css={s.purchaseBtn}>구매하기</button>}
      </div>
    </div>
  );
};

export default Pt;