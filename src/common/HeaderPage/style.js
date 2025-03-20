import { css } from "@emotion/react";
import { CiCompass1 } from "react-icons/ci";

export const root = css`

  margin: auto;
  max-width: max-content;
  max-height: max-content;
  overflow-x: auto;
`;
export const logout = css`
 color: white;
 background-color: black;
 box-shadow: none;
 border: none;

  &:hover {
    cursor: pointer;
  }
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

export const welcome = css`
  color: white;
`

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

  & > img {
    width: 100%;
    height: 100%;
  }
`;

