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

export const buttonWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const button = css`
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  background-color: #444; 
  font-size: 1rem;
`;


export const contentWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
`;


export const reservationListWrapper = css`
  width: 350px;
  height: 470px;
  background-color: #222;
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid #666; 
  font-size: 1.5rem;
  

  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
  }
`;


export const reservationList = css`
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
  
`;



export const reservationItem = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  span {
    flex-grow: 1;
  }

  button {
    background-color: #b71c1c;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;

    &:hover {
      background-color: #a61717;
    }
  }
`;

export const box = css`
  display: flex;
  justify-content: space-between;
  margin-right: 15rem;
  width: 450px;
`;
