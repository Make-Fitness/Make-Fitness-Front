import { css } from "@emotion/react";

export const containerStyle = css`
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  padding: 2rem;
  width: 100%;
`;

export const titleStyle = css`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1.5rem;
  `;

export const searchWrapperStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;

  label {
    margin-right: 0.5rem;
    font-size: 2rem;
  }
`;

export const inputStyle = css`
  width: 200px;
  padding: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  color: black;
`;

export const buttonStyle = css`
  padding: 0.6rem 1rem;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  font-size: 1.5rem;
  

  th,
  td {
    border: 1px solid #555;
    padding: 0.8rem;
    text-align: center;
  }

  thead {
    background-color: #222;
  }
`;

export const noDataStyle = css`
  text-align: center;
  padding: 1rem;
  color: #ccc;
`;

export const labelStyle = css`
  font-size: 2.5rem;
`;

export const paginationWrapperStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

