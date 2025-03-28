import { css } from "@emotion/react";

export const mainImgs = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing:border-box;
`;

export const mainImg = css`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  flex-grow: 1;
  margin-bottom: 10px;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

export const footer = css`
  display: flex;
  justify-content:center;
  width: 100%;
  padding: 1rem;
  background-color: #111;
  font-size: 2.5rem;
  color: #aaa;
`;

export const floatingButton = css`
  position: fixed;
  bottom: 3.5rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: red;
  color: white;
  width: 25rem;
  height: 5rem;
  font-size: 2rem;
  border: none;
  border-radius: 2rem;
  
  font-weight: bold;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    transform: translateX(-50%) scale(1.05);
    background-color: #e60000;
  }
`;
