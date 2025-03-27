import { css } from "@emotion/react";

export const calendarWrapper = css`
  display: flex;
  flex-direction: column;
  width: 500xp;
  max-width: 500px;
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
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: #333;
  color: #fff;
  border: 2rem;
  font-size: 15px;
  width: 60px;
  padding: 10px;
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
  width: 50px;
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
  width: 50px;
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
  justify-content: space-between;
  flex-direction: column;
  background: #fff;
  width: 450px;
  padding: 20px;
  border-radius: 8px;
  font-size: 2rem;
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
  display: flex;
  flex-direction: row;
  width: 40rem;
  padding: 1.2rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  color: black;
  box-sizing: 5rem;
`;

export const modalButtonContainer = css`
  display: flex;
  justify-content: space-between;
`;

export const button2 = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  color: #fff;
  border: none;
  font-size: 15px;
  padding: 8px;
  margin-right: 3px;
  margin-top: 35px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #555;
  }
`;



export const reservationListWrapper = css`
  
  background-color: #222;
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid #666;
  color: white;
  margin-top: 20px;
  width: 250px;
  height: 350px;

  h3 {
    font-size: 2rem;
  }

  p {
    font-size: 1.5rem;
  }
`;

export const reservationList = css`
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
`;

export const reservationItem = css`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  border-bottom: 1px solid #444;
  padding-bottom: 5px;
`;

export const calendarAndListWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: auto;
  gap: 20px;
`;

export const box = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
`;

export const box2 = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  width: 400;
`;

export const buttonbox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
`;

export const timeSlotContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: baseline;
  flex-wrap: wrap;      
  gap: 0.5rem;          
  justify-content: center;
  margin-bottom: 1.5rem; 
`;
