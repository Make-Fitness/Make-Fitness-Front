import { css } from "@emotion/react";

export const memberPage = css`
  background-color: #111;
  color: #fff;
  font-size: 1.625rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const headerArea = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const memberTableWrapper = css`
  width: 100%;
  max-height: 70vh;
  overflow: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  td:last-of-type {
    text-align: center;
  }
`;

export const memberTable = css`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  background-color: #2c2c2c;
  color: #fff;
  font-size: 1.5625rem;

  th, td {
    border: 1px solid #444;
    padding: 1rem 0.5rem;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 160px;
  }

  thead th {
    background-color: #3a3a3a;
    font-size: 1.625rem;
    position: sticky;
    top: 0;
    z-index: 10;
    height: 5.2rem;
    line-height: 1.4;
  }

  tbody tr:nth-of-type(even) {
    background-color: #2a2a2a;
  }
`;

export const selectBox = css`
  width: 100%;
  max-width: 100%;
  padding: 0.5rem;
  background-color: #444;
  color: #fff;
  font-weight: 600;
  border: 1px solid #666;
  border-radius: 0.4rem;
  font-size: 1.4rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const successMessage = css`
  color: #00e676;
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: 1rem;
  text-align: left;
`;

export const button = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 2rem;
  color: white;
  background-color: red;
  border: none;
  border-radius: 6px;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color:rgb(161, 2, 2);
  }
`;

export const footer = css`
  margin-top: 3rem;
  font-size: 1.25rem;
  text-align: center;
  color: #888;
`;

export const searchBar = css`
  display: flex;
  align-items: center;
  gap: 1rem;

  input {
    padding: 0.5rem 1rem;
    background-color: #333;
    color: #fff;
    border: 1px solid #666;
    border-radius: 0.4rem;
    font-size: 1.4rem;
  }

  button {
    background-color: #666;
    color: #fff;
    font-weight: bold;
    border: none;
    border-radius: 0.4rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
`;

export const buttonStyle = css`
  padding: 0.6rem 1rem;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

export const paginationWrapperStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const pageButtonStyle = (isActive) => css`
  background-color: ${isActive ? "#2196f3" : "#444"};
  color: ${isActive ? "#fff" : "#ccc"};
  font-weight: ${isActive ? "bold" : "normal"};
  padding: 6px 12px;
  border-radius: 4px;
  margin: 0 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${isActive ? "#1976d2" : "#555"};
  }
`;

export const alertBox = css`
  position: fixed;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #4caf50;
  color: white;
  padding: 16px 32px;
  border-radius: 10px;
  font-weight: bold;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: fadeInOut 3s ease-in-out;

  @keyframes fadeInOut {
    0% { opacity: 0; transform: translate(-50%, -60%); }
    10% { opacity: 1; transform: translate(-50%, -50%); }
    90% { opacity: 1; transform: translate(-50%, -50%); }
    100% { opacity: 0; transform: translate(-50%, -60%); }
  }
`;