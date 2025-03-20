import { css } from "@emotion/react";

export const root = css`
  margin: auto;
  max-width: 110rem;
  overflow-x: hidden;
  font-size: 1.2rem;
`;

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  background-color: #0a0a0a;
  width: 100%;
  min-height: 100vh;
  font-size: 1.2rem;
`;

export const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 3rem;
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
  gap: 2.5rem;
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
  padding: 5rem 0;
  gap: 3.5rem;
  font-size: 1.5rem;
`;

export const title = css`
  font-size: 3.5rem;
  font-weight: bold;
  text-align: center;
  color: #fff;
`;

export const cardContainer = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  width: 100%;
  font-size: 1.5rem;
`;

export const card = css`
  background: #222;
  padding: 3rem;
  border-radius: 1rem;
  text-align: center;
  color: white;
  font-size: 1.8rem;
  transition: transform 0.2s;
  width: calc(50% - 1.5rem);
  max-width: 35rem;
  
  &:hover {
    transform: scale(1.05);
  }

  & > svg {
    margin-bottom: 1.5rem;
    color: #f39c12;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;


export const footer = css`
  width: 100%;
  text-align: center;
  padding: 2.5rem;
  background-color: #111;
  font-size: 2rem;
  color: #aaa;
`;
