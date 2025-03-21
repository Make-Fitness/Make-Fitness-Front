import { css } from "@emotion/react";

export const root = css`

  margin: auto;
  max-width: max-content;
  max-height: max-content;
  overflow-x: hidden;
`;

export const container = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: rgb(10, 10, 10);
  max-width:100%;
  min-width:100%;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box
`;
 



export const mainImgs = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 73%;
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
