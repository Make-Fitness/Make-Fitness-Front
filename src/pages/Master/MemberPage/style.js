import { css } from "@emotion/react";

export const memberPage = css`
  padding: 3rem;
  background-color: #111;
  color: #fff;
  font-size: 1.625rem;
`;

export const headerArea = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const editButton = css`
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: #fff;
  background-color: #ff4444;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: -6rem;

  &:hover {
    background-color: #dd2222;
  }
`;

export const description = css`
  margin-bottom: 2rem;
  font-size: 1.375rem;
  font-weight: bold;
`;

export const memberTableWrapper = css`
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  max-height: 70vh;
  margin-top: 2rem;
`;

export const memberTable = css`
  width: 100%;
  min-width: 104rem;
  border-collapse: collapse;
  background-color: #2c2c2c;
  color: #fff;
  font-size: 1.5625rem;

  th,
  td {
    border: 1px solid #444;
    padding: 1.375rem;
    text-align: center;
  }

  thead th {
    background-color: #3a3a3a;
    font-size: 1.625rem;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  tbody tr:nth-of-type(even) {
    background-color: #2a2a2a;
  }
`;

export const searchBar = css`
  display: flex;
  padding-right: 0.5rem;
  gap: 1rem;
  margin-bottom: 1rem;

  input {
    padding: 0.5rem;
    background-color: rgb(96, 96, 96);
    border: none;
    color: #fff;
  }
`;

export const button = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  color: black;
  background-color: rgb(96, 96, 96);
  border: none;
  cursor: pointer;
`;

export const roleDropdown = css`
  position: relative;
  display: inline-block;
  font-size: 1.4rem;

  button {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    padding-left: 0.5rem;
  }
`;

export const successMessage = css`
  color: #00e676;
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: 1rem;
  text-align: left;
`;

export const dropdownMenu = css`
  position: absolute;
  top: 3rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #222;
  border: 1px solid #444;
  border-radius: 0.5rem;
  z-index: 10;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 10rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

export const dropdownItem = css`
  padding: 0.75rem;
  color: #fff;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #555;
  }
`;

export const selectBox = css`
  padding: 0.5rem 1rem;
  background-color: #444;
  color: #fff;
  font-weight: 600;
  border: 1px solid #666;
  border-radius: 0.4rem;
  font-size: 1.4rem;
`;

export const footer = css`
  margin-top: 3rem;
  font-size: 1.25rem;
  text-align: center;
  color: #888;
`;