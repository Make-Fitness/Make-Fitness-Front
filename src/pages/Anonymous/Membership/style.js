import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  padding: 1rem;
`;

export const title = css`
  font-size: 3.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 5rem;
  margin-top: -15rem;
`;

export const buttonGrid = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 50rem;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const button = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  background: #222;
  color: white;
  border-radius: 1rem;
  text-align: center;
  transition: 0.3s;
  cursor: pointer;
  border: none;
  font-size: 2rem;
  height: 25rem;
  width: 40rem;

  &:hover {
    background: #333;
  }

  & > h3 {
    margin: 1rem 0 0.5rem;
    font-size: 2.2rem;
  }

  & > p {
    font-size: 1.6rem;
  }
`;

export const footer = css`
  padding-top: 5rem;
`;
