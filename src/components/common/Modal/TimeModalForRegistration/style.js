import { css } from "@emotion/react";

export const modalWrapper = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #2c2c2c;
  padding: 2rem;
  border-radius: 12px;
  color: white;
  width: 600px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  text-align: center;
`;

export const timeGrid = css`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
  margin: 1.5rem 0;
`;

export const selectedButton = css`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 0;
  border-radius: 5px;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 0 0 3px 1px rgba(255, 0, 0, 0.5);
  transition: background 0.3s, box-shadow 0.3s;
  &:hover {
    background-color: #c0392b;
  }
`;

export const disabledButton = css`
  background-color: #444;
  color: #bbb;
  border: none;
  padding: 0.5rem 0;
  border-radius: 5px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background-color: #666;
  }
`;

export const alreadyRegisteredButton = css`
  background-color: #2c2c2c;
  color: #777;
  border: 1px solid #555;
  padding: 0.5rem 0;
  border-radius: 5px;
  font-size: 0.95rem;
  cursor: not-allowed;
  opacity: 0.6;
`;

export const confirmButton = css`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background-color: #c0392b;
  }
`;

export const closeButton = css`
  background-color: #888;
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #666;
  }
`;

export const buttonWrapper = css`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

export const deleteButton = css`
  background-color: #333;
  color: #ff5f5f;
  border: 1px solid #ff5f5f;
  padding: 0.5rem 0;
  border-radius: 5px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background-color: #552222;
  }
`;

export const deleteSelectedButton = css`
  background-color: #ff5f5f;
  color: white;
  border: none;
  padding: 0.5rem 0;
  border-radius: 5px;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 0 0 3px 1px rgba(255, 100, 100, 0.5);
  transition: background 0.3s, box-shadow 0.3s;
  &:hover {
    background-color: #ff2f2f;
  }
`;

export const deleteTitle = css`
  color: #ff5f5f;
`;
