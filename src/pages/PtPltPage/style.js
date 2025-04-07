import { css } from "@emotion/react";

export const topGroup = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  cursor: default;
`;

export const topimg = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100%;
  }
`;

export const toptext1 = css`
  display: center;
  justify-content: center;
  align-items: center;
  padding-top: 7rem;
  font-size: 10rem;
`;

export const toptext2 = css`
  display: center;
  justify-content: center;
  align-items: center;
  padding-bottom: 10rem;
  width: auto;
  height: auto;
  font-size: 5rem;
`;

export const mainImgs2 = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;

  img {
    display: block;
    width: 100%;        
    max-width: 100%;    
    height: auto;
  }
`;

export const buttonbox = css`
  box-sizing: border-box;
  padding: 2rem 6rem;
  font-size: 5rem;
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
