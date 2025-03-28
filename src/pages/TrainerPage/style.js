import { css } from "@emotion/react";

export const topGroup = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  cursor: default;
`;

export const topimg = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100%;
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
  width: 80rem;
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

export const buttonbox = css`
  box-sizing: border-box;
  padding: 2rem 6rem;
  font-size: 5rem;
`;
export const floatingButton = css`
  position: fixed;
  bottom: 3.5rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: red;
  color: white;
  width: 25rem;
  height: 5rem;
  font-size: 2rem;
  border: none;
  border-radius: 2rem;
  
  font-weight: bold;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    transform: translateX(-50%) scale(1.05);
    background-color: #e60000;
  }
`;
