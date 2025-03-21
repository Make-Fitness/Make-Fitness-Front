import { css } from "@emotion/react";

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
export const dropdownMenu = css`

position: absolute;
  top: 2.5rem;
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  list-style: none;
  display: block;
  visibility: visible;
  z-index: 1000;

  li {
    padding: 8px;
    cursor: pointer;
    color: black;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

export const topGroup = css`
  display: block;
  padding-left: 35rem;
  width: fit-content;
  cursor: default;
`;

export const topimg = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30rem;

  img {
    height: 100%;
  }
`;

export const mainImgs2 = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;

  img {
    display: block;
    width: 100%;        
    max-width: 100%;    
    height: auto;
  }
`;

export const mainImgs3 = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;

  img {
    display: block;
    width: 100%;        
    max-width: 100%;    
    height: auto;
  }
`;


export const mainImgs4 = css`
  display: flex;
  flex-direction: row;    
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2rem;         
  padding: 2rem; 

  img {
    width: 25rem;   
    height: auto;   
    display: block;
    object-fit: cover; 
  }
`;


export const toptext1 = css`
  display: center;
  justify-content: center;
  align-items: center;
  padding-top: 7rem;
  width: auto;
  height: auto;
  font-size: 10rem;
`;

export const toptext2 = css`
  display: center;
  justify-content: center;
  align-items: center;
  padding-bottom: 10rem;
  width: auto;
  height: auto;
  font-size: 5rem;
`;

export const toptext3 = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: auto;
  font-size: 3rem;
`;

export const toptext4 = css`
  width: 25rem;
  height: auto;
  font-size: 3rem;
  text-align: center;
`;

export const managerIntroduceTitle = css`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 5rem;
`;

export const toptext5 = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 2rem;
  background-color: #1E1E1E;
  margin-bottom: 5rem;
`;

export const topTextGroup6 = css`
  padding-left: 3rem;
  flex-grow: 1;
`;

export const toptext6 = css`
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  padding-bottom: 0.5rem;
  color: white;
  font-size: 1.6rem;
  line-height: 1.5;
`;

export const toptext7 = css`
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  padding-bottom: 0.5rem;
  color: white;
  font-size: 2rem;
  line-height: 1.5;
  font-weight: 750;
`;

export const footer = css`
  width: 100%;
  text-align: center;
  padding: 1rem;
  background-color: #111;
  font-size: 2.5rem;
  color: #aaa;
`;
