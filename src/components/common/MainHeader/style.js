import { css } from "@emotion/react";

export const logout = css`
  color: white;
  background-color: rgb(10, 10, 10);
  box-shadow: none;
  border: none;
  font-size: 1.4rem;
  padding: 0.4rem 1rem;

  &:hover {
    cursor: pointer;
    background-color: #222;
  }
`;

export const header = css`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 2rem 0 1rem;
  background-color: rgb(10, 10, 10);
`;

export const logo = css`
  display: flex;
  align-items: center;
  width: 16rem;
  cursor: pointer;

  & > img {
    width: 100%;
  }
`;

export const signinbox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  color: white;
`;

export const sign = css`
  margin-left: 1rem;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const welcome = css`
  color: white;
  font-size: 1.5rem;
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
  box-sizing: border-box;
  padding: 0.5rem 2rem;
  width: 100%;
  height: 6rem;
  background-color: red;

  ul {
    display: flex;
    justify-content: space-around;
    list-style: none;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  li {
    position: relative;
    margin-top: -0.5rem;
    width: 15rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: bold;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  li a {
    display: block;
    width: 100%;
    height: 100%;
    line-height: 6rem;
    text-align: center;
    text-decoration: none !important;
    border-bottom: none !important;
    color: white;
    padding: 0 1rem;
  }

  li:hover {
    background-color: red;
    border-bottom: 0.2rem solid white;
  }
`;
