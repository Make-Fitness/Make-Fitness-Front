import { css } from "@emotion/react";

export const root = css`
  margin: auto;
  max-width: 110rem;
  overflow-x: hidden;
  font-size: 1.2rem;
  background-color: #0a0a0a;
  color: white;
`;

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  font-size: 1.2rem;
`;

export const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 2rem;
  background-color: #0a0a0a;
  font-size: 1.5rem;
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

export const reviewList = css`
  width: 90%;
  margin: auto;
  text-align: center;
  margin-bottom: 4rem;

  & > h2{
    font-size: 3rem;
  }

  & > p{
    font-size: 2rem;
  }
`;

export const reviewGrid = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
  width: 100%;

  & > div {
    width: 100%; /* 두 개씩 배치되도록 설정 */
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    & > div {
      width: 100%;
    }
  }
`;

export const reviewBox = css`
  background: #111;
  padding: 2rem;
  border-radius: 0.7rem;
  font-size: 1.4rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  word-wrap: break-word;
  white-space: normal;
  margin-bottom: 2rem;
`;

export const reviewRating = css`
  font-size: 1.6rem;
  margin-bottom: 0.8rem;
  color: red;
`;

export const reviewContainer = css`
  background: #222;
  padding: 3rem;
  border-radius: 1rem;
  text-align: center;
  color: white;
  font-size: 1.5rem;
  width: 80%;
  margin: 5rem auto;
`;

export const ratingContainer = css`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 1.2rem;
`;

export const star = css`
  cursor: pointer;
  margin: 0 0.3rem;
  transition: color 0.2s;
  &:hover {
    color: red;
  }
`;

export const reviewInput = css`
  width: 100%;
  height: 7rem;
  margin-left: -1.3rem;
  padding: 1.2rem;
  border: none;
  border-radius: 0.7rem;
  background: #333;
  color: white;
  font-size: 1.4rem;
  resize: none;
  &:focus {
    outline: none;
    border: 1px solid red;
  }
`;

export const submitButton = css`
  margin-top: 1.5rem;
  padding: 1.3rem 2.8rem;
  font-size: 1.6rem;
  color: white;
  background: red;
  border: none;
  border-radius: 0.7rem;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: darkred;
  }
`;

export const footer = css`
  width: 100%;
  text-align: center;
  padding: 2.5rem;
  background-color: #111;
  font-size: 1.5rem;
  color: #aaa;
  margin-top: 4rem;
`;