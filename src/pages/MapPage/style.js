import { css } from "@emotion/react";

export const mapContainer = css`
    margin: 3rem auto 5rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80rem;  
    height: 50rem;
    overflow: hidden;
`;

export const box = css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
`;

export const title = css`
    display: flex;
    justify-content: center;
    margin: 5rem 0 0;
    font-size: 3.5rem;
    cursor: default;
`;

export const button = css`
    margin: 1rem 2rem;
    border: none;
    padding: 0.5rem 1rem;
    background-color: #b64d4d;
`;

export const addressbox = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    margin-bottom: 5rem;
    font-size: 2rem;
`;

export const contentWrapper = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const address = css`
    display: flex;
    align-items: center;
    justify-content: flex-start; 
    font-size: 2rem;
`;

export const subwayinfo = css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 2rem;
    flex-wrap: wrap;
`;

export const businfo = css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 2rem;
`;

export const numberone = css`
    & > svg {
        fill: #f78f07;
        margin-right: 1rem;
    }
`;

export const numbertwo = css`
    & > svg {
        fill: #39cf73;
    }
`;
