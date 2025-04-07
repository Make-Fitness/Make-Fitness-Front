/** @jsxImportSource @emotion/react */
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

export const reservableButton = css`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 0;
  border-radius: 5px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.3s;
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
  cursor: not-allowed;
`;

export const confirmButton = css`
  margin-right: 1rem;
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
  background-color: #666;
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background-color: #444;
  }
`;

export const buttonWrapper = css`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;
