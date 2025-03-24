import { css } from "@emotion/react";

export const calendarWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
`;

export const calendarHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  background-color: black;
  border: 0.125rem solid #444;
  color: white;
  box-shadow: 0rem 0.25rem 0.625rem rgba(255, 255, 255, 0.1);
  border-radius: 8px 8px 0 0;

  h2 {
    font-size: 2.5rem;
  }
`;

export const calendarGrid = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  font-size: 1.5rem;
`;

export const button = css`
  background-color: #333;
  color: #fff;
  border: 2rem;
  font-size: 15px;
  padding: 12px;
  margin-right: 7px;
  margin-bottom: 3px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #555;
  }
`;

export const calendarDayHeader = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: #e0e0e0;
  padding: 8px;
  border-radius: 4px;
`;

export const calendarDateCell = css`
  height: 50px;
  text-align: center;
  line-height: 50px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background-color: #fff;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e0f7fa;
  }
  
  &:active {
    background-color: #b2ebf2;
  }
`;

export const emptyCell = css`
  height: 50px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
`;


export const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
`;

export const modalContent = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  font-size: 2rem;
  width: 500px;  
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  h3{
    color: black !important;
    padding-bottom: 30px;
  }

  p {
    color: black !important;
    margin-bottom: 50px;
  }
`;

export const modalInput = css`
  width: 100%;
  padding: 10px;
  font-size: 1.2rem;
  color: black;
  margin-bottom: 20px;
  margin-left: 1.5rem;
  margin-right: 3rem;
  box-sizing: border-box;
`;

export const modalButtonContainer = css`
  display: flex;
  justify-content: space-between;
`;

export const button2 = css`
  background-color: #333;
  color: #fff;
  border: none;
  font-size: 15px;
  padding: 8px;
  margin-right: 3px;
  margin-bottom: 3px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #555;
  }
`;

export const box = css`
display: flex;
justify-content: end;
flex-direction: row;
margin-bottom: 2rem;
margin-top: 2rem;
`;