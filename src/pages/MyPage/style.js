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

export const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem; 
  padding-top: 2rem; 
  width: 100%;
  background-color: rgb(10, 10, 10);
  font-size: 2rem; 
`;

export const logo = css`
  display: flex;
  align-items: center;
  padding-bottom: 1rem;

  & > img {
    width: 20rem; 
  }

  &:hover {
    cursor: pointer;
  }
`;

export const signinbox = css`
  display:flex;
  justify-content: space-between;
  margin-top: 4rem;
`;

export const signin = css`
  padding-right: 1rem;
  font-size: 2rem;

  &:hover {
    cursor: pointer;
  }
`;

export const signup = css`
  padding-right: 1rem;
  font-size: 2rem;

  &:hover {
    cursor: pointer;
  }
`;

export const auth = css`

  padding-top: 5.5rem; 
  padding-right: 1rem; 
  font-size: 1.7rem; 
  font-weight: bold;
  cursor: pointer;
  color: white;
`;

export const navigation = css`
  width: 100%;
  height: 6rem;
  background-color: red;
  padding: 0.5rem 0;

  ul {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    position: relative;
    margin: 1rem 12rem;
    font-size: 2.5rem; 
    font-weight: bold;
    white-space: nowrap;
    cursor: pointer;
    transition: ease-in-out;
   
  
    &:hover {
      border-bottom: 0.2rem solid white;
    }
  }
`;

export const changeButton = css`
  margin-top: 10px;  
  padding: 8px 16px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #d32f2f;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #b71c1c;
  }
`;

export const formContainer = css`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 8px;
  
  h1 {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }

  label {
    font-size: 18px;
     }
`;


export const genderRow = css`
  display: flex;
  gap: 40px;

  label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 16px;
  }
`;

export const input = css`
  width: 100%;
  height: 50px;
  padding: 10px;
  border: 1px solid #666;
  border-radius: 8px;
  font-size: 14px;
  background-color: #222;
  color: white;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #d32f2f;
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