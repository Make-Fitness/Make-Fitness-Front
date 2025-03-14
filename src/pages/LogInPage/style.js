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

  &:hover {
    cursor: pointer;
  }
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
  width: calc(100%);
  margin-top: 2rem;
  gap: 5rem;
`;

export const googleLogin = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  width: 48%;
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
  background-color: white;
  padding: 1rem;

  & > span {
    width: 2rem;
    margin-right: 0.875rem;
  }
`;

export const naverLogin = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #03c75a;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  width: 48%;
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
  padding: 1rem;

  & > img {
    width: 2rem;
    margin-right: 0.875rem;
  }
`;

export const loginButton = css`
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
  width: 100%;

  &:hover {
    background-color: #ff4747;
  }
`;

export const signupContainer = css`
  padding-top: 1rem;
  font-size: 1.3rem;
  

  &:hover {
    cursor: pointer;
  }
`;

export const qtext = css`
  padding-right: 1rem;
`;

export const highlightedText = css`
  color:rgb(37, 102, 242);
  font-weight: bold;
`;



