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

export const errorText = css`
  color: red;
  font-size: 1rem;
  margin-top: 0.25rem;
`;

export const inputError = css`
  border: 2px solid red !important;
`;

export const logo = css`
  width: 14rem;
  margin-bottom: 2rem;

  &:hover {
    cursor: pointer;
  }
`;

export const genderContainer = css`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 1rem; 
  margin-top: 0.05rem; 
`;

export const genderBox = css`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1rem;
  font-size: 1.3rem;
  color: white;
  font-weight: bold;
  white-space: nowrap; 


`;

export const genderInput = css`
  transform: scale(1.2);
  cursor: pointer;
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
    width: 100%;
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

export const letterg = css`
  display: flex;
  color: black;
  white-space: nowrap;
`;

export const lettern = css`
  display: flex;
  padding-bottom:0.2rem;
  white-space: nowrap;
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

export const signinContainer = css`
  padding-top: 1rem;
  font-size: 1.3rem;
`;

export const qtext = css`
  padding-top: 1rem;
  padding-right: 1rem;
`;

export const highlightedText = css`
  padding-left: 1rem;
  color:rgb(37, 102, 242);
  font-weight: bold;

  
  &:hover {
    cursor: pointer;
  }
`;
