import { css } from "@emotion/react";
import { CiCompass1 } from "react-icons/ci";

export const root = css`

  margin: auto;
  max-width: max-content;
  max-height: max-content;
  overflow-x: auto;
`;


export const container = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: rgb(10, 10, 10);
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;


export const mainImgs = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
  width: 100%;
  text-align: center;
  padding: 1rem;
  background-color: #111;
  font-size: 2.5rem;
  color: #aaa;
`;
