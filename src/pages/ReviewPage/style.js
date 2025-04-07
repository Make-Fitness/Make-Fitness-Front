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
  }
`;

export const reviewList = css`
  width: 100%;
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
  box-sizing: border-box;
  background: #222;
  padding: 3rem 10rem;
  border-radius: 1rem;
  text-align: center;
  color: white;
  font-size: 1.5rem;
  width: 100%;
  margin: 5rem auto;
`;

export const ratingContainer = css`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 3rem;
`;

export const star = css`
  cursor: pointer;
  margin: 0 0.3rem;
  color: red;
  &:hover {
    color: red;
  }
`;

export const reviewInput = css`
  box-sizing: border-box;
  width: 100%;
  height: 20rem;
  padding: 2rem;
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

export const paginationWrapperStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding-bottom: 20px;
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
