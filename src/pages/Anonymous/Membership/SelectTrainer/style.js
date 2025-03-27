import { css } from '@emotion/react';

export const topGroup = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const toptext1 = css`
  font-size: 5rem;
  padding-top: 7rem;
`;

export const toptext2 = css`
  font-size: 3rem;
  padding-bottom: 5rem;
`;

export const managerIntroduceTitle = css`
  font-size: 3rem;
  margin-bottom: 5rem;
  text-align: center;
`;

export const trainerCard = css`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 2rem;
  border: 2px solid transparent;
  border-radius: 1rem;
  transition: all 0.3s ease;
  background-color: #1e1e1e;

  &:hover {
    background-color: #2a2a2a;
    transform: scale(1.02);
  }
`;

export const selectedTrainerCard = css`
  border-color: white;
  transform: scale(1.03);
  color: white;
`;

export const toptext5 = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80rem;
  font-size: 2rem;
`;

export const mainImgs4 = css`
  display: flex;
  padding: 2rem;

  img {
    width: 25rem;
    height: auto;
    object-fit: cover;
    border-radius: 1rem;
  }
`;

export const topTextGroup6 = css`
  padding-left: 3rem;
  flex-grow: 1;
`;

export const toptext6 = css`
  color: white;
  font-size: 1.6rem;
  padding-left: 2rem;
  padding-bottom: 0.5rem;
`;

export const toptext7 = css`
  color: white;
  font-size: 2rem;
  font-weight: 750;
  padding-left: 2rem;
  padding-bottom: 0.5rem;
`;

export const selectBtnWrapper = css`
  text-align: center;
  margin-top: 1.5rem;
  padding-bottom: 3rem;
  
`;

export const completeBtn = css`
  background-color: red;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  padding: 1.5rem 3rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e60023;
    transform: scale(1.05);
  }
`;
