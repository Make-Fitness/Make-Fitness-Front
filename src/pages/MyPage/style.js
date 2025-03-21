import { css } from "@emotion/react";

export const topcon = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const maincontainer = css`
  width: 30rem;
  margin-top: 5rem;
  padding: 2rem;
  margin-bottom: 20rem;
  background-color: #313030;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

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
  }

`;

export const numbercontainer = css`
  display: flex;
  align-items: center;
  justify-content: row;
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

export const change = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
`;

export const input = css`
  display: flex;
  justify-content: first baseline;
  width: 15rem;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  background-color: #d1d1d1;
  font-size: 1rem;
  color: black;
`;

export const input2 = css`
  display: flex;
  justify-content: first baseline;
  width: 20rem;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  background-color:#d1d1d1;
  font-size: 1rem;
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

export const footer = css`
  width: 100%;
  text-align: center;
  padding: 1rem;
  background-color: #111;
  font-size: 2rem;
  color: #aaa;
  margin-top: auto;
`;