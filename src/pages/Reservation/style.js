import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  min-height: 80vh;
  background-color: black;
  color: white;
  padding: 2rem;
  box-sizing: border-box;
`;

export const title = css`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

export const description = css`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const image = css`
  display: block;
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
  border: 2px solid #ff5252;
  border-radius: 10px;
`;
