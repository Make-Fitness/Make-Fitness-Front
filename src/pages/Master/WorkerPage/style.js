import { css } from "@emotion/react";

export const pageContainer = css`
  background-color: #121212;
  color: #ffffff;
  padding: 30px;
  min-height: 100vh;
`;

export const title = css`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const filterBox = css`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  select {
    margin-left: 5px;
    padding: 4px;
    background-color: #333;
    color: white;
    border: 1px solid #555;
  }

  label {
    color: #ccc;
  }
`;

export const searchButton = css`
  padding: 6px 12px;
  background-color: #e53935;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
  border-radius: 4px;

  &:hover {
    background-color: #d32f2f;
  }
`;

export const workerTable = css`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th, td {
    padding: 10px;
    border: 1px solid #444;
    text-align: center;
  }

  thead {
    background-color: #2c2c2c;
  }

  tbody tr:nth-of-type(even) {
    background-color: #1e1e1e;
  }

  tbody tr:nth-of-type(odd) {
    background-color: #2a2a2a;
  }
`;
