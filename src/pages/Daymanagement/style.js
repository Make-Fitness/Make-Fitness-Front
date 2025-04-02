import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  min-height: 80vh;
  background-color: black;
  color: white;
  padding: 2rem;
  box-sizing: border-box;
`;

export const title = css`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

export const description = css`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const buttonWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const button = css`
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  background-color: #444;
  font-size: 1.8rem;
`;

export const contentWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 2rem;
  padding-top: 5rem;
`;

export const box = css`
  display: flex;
  justify-content: center;
  width: 450px;
  height: 470px;
`;

export const reservationListWrapper = css`
  background-color: #222;
  border-radius: 10px;
  padding: 1rem;
  width: 400px;
  min-height: 450px;
  margin-top: 0;

  h3 {
    display: flex;
    justify-content: center;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    margin-left: 1rem;
  }

  p {
    display: flex;
    justify-content: start;
    font-size: 2rem;
    margin-left: 1rem;
  }

  h5 {
    font-size: 2.5rem;
    margin-left: 1rem;
  }
`;

export const reservationList = css`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const reservationItem = css`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  border-bottom: 1px solid #444;
  padding-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const cancelButton = css`
  margin-left: 1rem;
  background-color: #880000;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.3rem 0.7rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #aa2222;
  }
`;

export const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const modalContent = css`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  width: 350px;
  max-height: 80vh;
  overflow-y: auto;
  outline: black;

  h2 {
    color: black;
    font-size: 2rem;
    margin-left: 4rem;
  }

  p {
    font-size: 1.5rem;
    color: black;
  }
`;

export const button2 = css`
  font-size: 1.5rem;
  background-color: #444;
  border-radius: 5px;
  margin-left: 5rem;
  margin: 0.5rem;
`;