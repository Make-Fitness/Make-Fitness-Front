import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 44rem;
  height: auto;
  margin: auto;
  padding: 4rem 3rem;
  background-color: black;
  border-radius: 1.75rem;
  border: 0.125rem solid #444;
  color: white;
  box-shadow: 0rem 0.25rem 0.625rem rgba(255, 255, 255, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (min-height: 700px) {
    height: auto;
  }
`;

export const logo = css`
  width: 14rem;
  margin-bottom: 2rem;
`;

export const form = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 3.5rem;

  label {
    font-size: 1.25rem;
    margin: 1rem 0rem 0.5rem;
  }

  input {
    width: 96%;
    padding: 1.125rem;
    border: none;
    border-radius: 0.625rem;
    background-color: #222;
    color: white;
    font-size: 1.375rem;
  }

  input:focus {
    outline: 0.125rem solid #ff4747;
  }
`;



export const socialLogin = css`
  display: flex;
  justify-content: space-between;
  padding: 0 5rem;
  width: calc(100% - 7rem);
  margin-top: 2rem;
`;

export const googleLogin = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  border: none;
  padding: 1rem rem;
  border-radius: 0.625rem;
  cursor: pointer;
  width: 48%;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;

  & > span {
    padding-right: 1.5rem;
    width: 2.5rem;
    margin-right: 0.875rem;  
  }
`;

export const naverLogin = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 0.625rem;
  cursor: pointer;
  width: 48%;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;

  & > img {
    padding-right: 1.5rem;
    width: 2.5rem;
    margin-right: 0.875rem;
    color: green;
  }
`;

export const signUpButton = css`

  margin-top: 2rem;
  background-color: #a30000;
  color: white;
  border: none;
  padding: 1.125rem;
  border-radius: 0.625rem;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  width: calc(100% );
  
  &:hover {
    background-color: #ff4747;
  }
`;
