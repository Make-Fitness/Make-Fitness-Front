import { css } from "@emotion/react";

export const groupBox = css`
    box-sizing: border-box;
    padding: 0.6rem 0;
    width: 100%; 
`;

export const textInput = css`
    box-sizing: border-box;
    outline: none;
    border: none; 
    border-radius: 0.5rem;
    padding: 1.125rem; 
    width: 100%;
    height: 3.4rem;
    background-color: #222; 
    color: white;
    font-size: 1.375rem; 
    letter-spacing: 0.1rem;

    &:focus {
        outline: 0.125rem solid #ff4747; 
    }
`;

export const messageText = css`
    margin: 0;
    margin-top: 0.3rem;
    color: #ff3f3f;
    font-size: 1.2rem;
`;
