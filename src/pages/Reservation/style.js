import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  min-height: 80vh;
  background-color: #000;
  color: #fff;
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
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const button = css`
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: #444;
  font-size: 1rem;
  cursor: pointer;
`;

export const contentWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 2rem;
`;

export const leftPane = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #222;
  border-radius: 10px;
  padding: 2rem;
  border: 1px solid #666;
`;

export const subtitle = css`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const instructorPhotoContainer = css`
  width: 250px;
  height: 250px;
  border: 1px solid #666;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

export const instructorPhotoPlaceholder = css`
  font-size: 1.2rem;
  color: #999;
`;

export const instructorPhotoPreview = css`
  max-width: 100%;
  max-height: 100%;
`;

export const box = css`
  display: flex;
  justify-content: center;
  width: 450px;
`;

export const reservationListWrapper = css`
  background-color: #222;
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid #666;
  color: #fff;
  width: 250px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
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
  align-items: center;
  justify-content: space-between;
`;
