    import { css } from "@emotion/react";

    export const staffPage = css`
    padding: 3rem;
    background-color: #111;
    color: #fff;
    font-size: 1.625rem;
    `;

    export const description = css`
    margin-bottom: 2rem;
    font-size: 1.375rem;
    font-weight: bold;
    `;

    export const staffTable = css`
    width: 100%;
    min-width: 104rem;
    border-collapse: collapse;
    background-color: #2c2c2c;
    color: #fff;
    font-size: 1.5625rem;
    margin-top: 2rem;

    th,
    td {
        border: 1px solid #444;
        padding: 1.375rem;
        text-align: center;
    }

    thead {
        background-color: #3a3a3a;
        font-size: 1.625rem;
    }

    tbody tr:nth-of-type(even) {
        background-color: #2a2a2a;
    }
    `;

    export const searchBar = css`
    display: flex;
    padding-right: 0.5rem;
    gap: 1rem;
    margin-bottom: 1rem;

    input {
        padding: 0.5rem;
        background-color: rgb(96, 96, 96);
        border: none;
    }
    `;

    export const button = css`
    display: flex;
    color: black;
    background-color: rgb(96, 96, 96);
    `;