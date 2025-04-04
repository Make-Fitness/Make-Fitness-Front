import { css } from "@emotion/react";

export const topcon = css`
  display: flex;
  flex-direction: row; 
  justify-content: center;
  align-items: flex-start;
  gap: 10rem; 
  width: 100%;
  margin-top: 5rem;
`;

export const maincontainer = css`
  width: 50rem;
  padding: 2rem;
  margin-top: 5rem;
  margin-bottom: 15rem;
  background-color: black;
  border-radius: 1.75rem;
  border: 0.125rem solid #444;
  color: white;
  box-shadow: 0rem 0.25rem 0.625rem rgba(255, 255, 255, 0.1);
  
  h2 {
    display: flex;
    justify-content: center;
    font-size: 3rem;
    color: white;
    margin-bottom: 3rem;
  }

  label {
    display: flex;
    justify-content: flex-start;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #dbdbdb;
  }
`;

export const calendarWrapper = css`
  width: 450px; 
  margin-top: 5rem; 
`;

export const numbercontainer = css`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

export const passwordcon = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1rem;
`;

export const input = css`
  width: 20rem;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  background-color: #d1d1d1;
  font-size: 1.5rem;
  color: black;
`;

export const input2 = css`
  width: 20rem;
  padding: 10px;
  margin-bottom: 10px;
  border: none; 
  border-radius: 5px;
  background-color: #d1d1d1;
  font-size: 1.5rem;
  color: black;
`;

export const button = css`
  background-color: #b71c1c;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: 0.3s;
  margin-left: 1rem;

  &:hover {
    background-color: #a61717;
  }
`;

export const button2 = css`
  background-color: #b71c1c;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: 0.3s;
  margin-left: 1.5rem;
  margin-bottom: 0.75rem;

  &:hover {
    background-color: #a61717;
  }
`;

export const buttonContainer = css`
  display: flex;
  justify-content: space-between;
  margin-top: 22px;
`;
