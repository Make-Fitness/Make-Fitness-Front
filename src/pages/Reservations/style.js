import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  min-height: 80vh;
  background-color: #000;
  color: #fff;
  padding: 2rem;
  box-sizing: border-box;
`;

export const title = css`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

export const tableHeader = css`
  border: 1px solid #999;
  padding: 12px;
  background-color: #222;
  color: #fff;
  text-align: center;
  font-size: 1.5rem;
`;

export const tableCell = css`
  border: 1px solid #444;
  padding: 14px;
  text-align: center;
  color: #fff;
  font-size: 1.4rem;
`;

export const reserveButton = css`
  padding: 0.7rem 1.5rem;
  font-size: 1.2rem;
  background-color: #e53935;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background-color: #c62828;
  }
`;
