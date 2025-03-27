import { css } from "@emotion/react";

export const root = css`
  margin: auto;
  max-width: 100vw;
  overflow-x: hidden;
  font-size: 1.2rem;
  background-color: #0a0a0a;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 80rem;
  min-height: 100vh;
  font-size: 1.2rem;
`;

export const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 2rem;
  background-color: #0a0a0a;
  font-size: 1.5rem;
`;

export const logo = css`
  cursor: pointer;

  & > img {
    width: 16rem;
  }
`;

export const signinbox = css`
  display: flex;
  gap: 2rem;
  font-size: 1.5rem;
`;

export const signin = css`
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: #ddd;
  }
`;

export const signup = css`
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: #ddd;
  }
`;

export const navigation = css`
  width: 100%;
  background-color: red;
  padding: 1.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;

  ul {
    display: flex;
    justify-content: space-around;
    list-style: none;
    padding: 0 5rem;
    margin: 0;
    width: 100%;
    max-width: 85rem;
  }

  li {
    font-size: 1.8rem;
    font-weight: bold;
    white-space: nowrap;
    cursor: pointer;
    transition: ease-in-out;

    &:hover {
      border-bottom: 0.3rem solid white;
    }
  }
`;

export const main = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 90rem;
  padding: 2rem 0;
  gap: 3.5rem;
  font-size: 1.5rem;
`;

export const title = css`
  margin-top: 5rem;
  font-size: 3.5rem;
  font-weight: bold;
  text-align: center;
  color: #fff;
`;

export const subscriptionContainer = css`
  text-align: center;
  padding: 4rem;
  max-width: 70rem;
  width: 100%;
  margin: auto;
  border-radius: 1rem;
  background-color: #111;
  color: white;
`;

export const plansWrapper = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

export const planCard = css`
  background: #222;
  padding: 3rem;
  border-radius: 0.7rem;
  text-align: center;
  color: white;
  font-size: 1.7rem;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s;
  width: 18rem;
  max-width: 90%;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: scale(1.05);
    background-color: #444;
  }
`;

export const selected = css`
  border: 2px solid red;
`;

export const purchaseBtn = css`
  margin-top: 2rem;
  padding: 1.2rem 2.5rem;
  font-size: 1.7rem;
  color: white;
  background: red;
  border: none;
  border-radius: 0.7rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: darkred;
  }
`;

export const footer = css`
  width: 100%;
  text-align: center;
  padding: 2rem;
  background-color: #111;
  font-size: 1.5rem;
  color: #aaa;
  margin-top: 3rem;
`;
