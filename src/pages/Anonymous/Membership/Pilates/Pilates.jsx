/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as s from "./style";
import { MENUS } from "../../../../constants/menu"; // ✅ MENUS import 추가

const plans = [
  { name: "BASIC", sessions: 12, price: "₩120,000" },
  { name: "STANDARD", sessions: 24, price: "₩220,000" },
  { name: "ADVANCED", sessions: 36, price: "₩310,000" },
  { name: "ELITE", sessions: 50, price: "₩400,000" },
];

const Pilates = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("anonymous");
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div css={s.root}>
      <div css={s.container}>
        <div css={s.header}>
          <div css={s.logo}>
            <img src="/main/logo.png" alt="메인 로고" onClick={() => navigate("/")} />
          </div>
          <div css={s.signinbox}>
            {nickname ? (
              <span css={s.welcome}>
                {nickname}님 환영합니다{" "}
                <button css={s.logout} onClick={() => setNickname("")}>로그아웃</button>
              </span>
            ) : (
              <>
                <span css={s.signin} onClick={() => navigate("/auth/signin")}>
                  로그인
                </span>
                <span css={s.signup} onClick={() => navigate("/auth/signup")}>
                  회원가입
                </span>
              </>
            )}
          </div>
        </div>
        <div css={s.navigation}>
          <ul>
            {MENUS["anonymous"]?.map((menu) => (
              <li key={menu.id}>
                <Link to={menu.path}>{menu.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div css={s.main}>
          <h1 css={s.title}>STRONG INSIDE, GRACEFUL OUTSIDE.</h1>
          <h2 css={s.title}>내면은 강하게, 외면은 우아하게.</h2>
          
          <div css={s.subscriptionContainer}>
            <h2>필라테스 구독 플랜</h2>
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
        <div css={s.footer}>
          <p>© MAKE FITNESS. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Pilates;