import { css } from "@emotion/react";

export const staffPage = css`
  padding: 3rem;
  background-color: #111;
  color: #fff;
  font-size: 1.625rem;
`;

export const description = css`
  margin-bottom: 2rem;
  font-size: 1.375rem;
  font-weight: bold;
`;

export const staffTable = css`
  width: 100%;
  min-width: 104rem;
  border-collapse: collapse;
  background-color: #2c2c2c;
  color: #fff;
  font-size: 1.5625rem;
  margin-top: 2rem;

  th,
  td {
    border: 1px solid #444;
    padding: 1.375rem;
    text-align: center;
  }

  thead {
    background-color: #3a3a3a;
    font-size: 1.625rem;
  }

  tbody tr:nth-of-type(even) {
    background-color: #2a2a2a;
  }
`;

export const filterBox = css`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 1.5rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.375rem;

    select {
      background-color: #2a2a2a; // 어두운 배경
      color: #fff;
      padding: 0.5rem 1rem;
      border: 1px solid #444;
      border-radius: 0.4rem;
      font-size: 1.25rem;
      cursor: pointer;
    }
  }
`;

export const button = css`
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: #fff;
  background-color: #ff4444;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #dd2222;
  }
`;
