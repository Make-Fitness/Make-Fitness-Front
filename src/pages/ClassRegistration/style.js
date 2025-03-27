import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  min-height: 80vh;
  background-color: black;
  color: white;
  padding: 2rem;
  box-sizing: border-box;
`;

export const title = css`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

export const description = css`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const buttonWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const button = css`
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  background-color: #444;
  font-size: 1rem;
`;

export const contentWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 2rem;
`;

export const box = css`
  display: flex;
  justify-content: center;
  width: 450px;
`;

export const reservationListWrapper = css`
  background-color: #222;
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid #666;
  color: white;
  width: 400px;
  min-height: 490px;

  h3 {
    font-size: 3rem;
    margin-bottom: 1rem;
    margin-left: 1rem;
  }

  p {
    font-size: 3rem;
    margin-left: 1rem;
  }
`;

export const reservationList = css`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const reservationItem = css`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  border-bottom: 1px solid #444;
  padding-bottom: 5px;
`;