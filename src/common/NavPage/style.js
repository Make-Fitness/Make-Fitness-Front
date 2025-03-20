import { css } from "@emotion/react";

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
