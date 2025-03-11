import { css } from "@emotion/react";

export const container = css`
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color:rgb(10, 10, 10);
  width: 100%;
  overflow-y: auto;
`;


export const header = css`

  display: flex;
  justify-content: space-between; 
  align-items: center; 
  margin: 10px;
  padding-top: 30px;
  width: 100%;
  background-color:rgb(10, 10, 10);
  font-size: 17px;

`;

export const logo = css`

  display: flex;
  align-items: center;
  padding-left: 30px;
  padding-bottom: 40px;

  & > img {

    width: 140px; /* 로고 크기 조절 */
  }

  &:hover {
    cursor: pointer;
  }
`;

export const auth = css`

  padding-top: 60px;
  padding-right: 13%;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  color: white;
`;

export const navigation = css`

  width: 75%;
  background-color: red;
  padding: 10px 0;

  ul {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    position: relative;
    margin: 0 100px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    transition:  border-bottom 0.3s ease-in-out;

    &:hover {
    border-bottom: 1px solid white; /* 호버 시 줄 추가 */
  }
  }
`;

export const mainImgs = css`
  display: flex;
  flex-direction: column; 
  align-items: center;
  width: 75%;
`;

export const mainImg = css`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%; 
  
  align-items: center;
  
  flex-grow: 1;

  & > img {
    width: 100%; 
    height: 100%; 
  }
`;

export const footer = css`
  width: 100%;
  text-align: center;
  padding: 15px;
  background-color: #111;
  font-size: 14px;
  color: #aaa;
`;
