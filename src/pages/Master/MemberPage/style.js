import { css } from "@emotion/react";

export const memberPage = css`
  padding: 40px;
  background-color: #111;
  color: #fff;
`;

export const headerArea = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const editButton = css`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
`;

export const searchBox = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const searchInput = css`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #000;
  font-size: 14px;
  width: 200px;
`;

export const searchButton = css`
  background-color: #666;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #888;
  }
`;

export const memberTable = css`
  width: 100%;
  border-collapse: collapse;
  background-color: #1e1e1e;

  th,
  td {
    border: 1px solid #333;
    padding: 12px;
    text-align: center;
  }

  th {
    background-color: #2c2c2c;
    font-weight: bold;
  }
`;

export const button = css`
  background-color: #555;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #777;
  }
`;

export const footer = css`
  margin-top: 40px;
  text-align: center;
  color: #aaa;
  font-size: 0.9rem;
`;
