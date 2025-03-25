import { css } from "@emotion/react";

    export const sales = css`
    padding: 3rem; /* 48px */
    background-color: #111;
    color: #fff;
    font-size: 1.625rem; /* 26px */
    `;

    export const filterArea = css`
    margin-bottom: 2.375rem; /* 38px */
    font-size: 1.625rem;

    input,
    select,
    button {
        margin-right: 1.4375rem; /* 23px */
        padding: 1.125rem 1.375rem; /* 18px 22px */
        background-color: #333;
        color: #fff;
        border: 1px solid #555;
        border-radius: 0.875rem; /* 14px */
        font-size: 1.5rem; /* 24px */
    }

    span {
        margin: 0 1.4375rem;
    }
    `;

    export const salesTable = css`
    width: 100%;
    border-collapse: collapse;
    background-color: #2c2c2c;
    color: #fff;
    font-size: 1.5625rem; /* 25px */

    th,
    td {
        border: 1px solid #444;
        padding: 1.375rem; /* 22px */
        text-align: center;
    }

    thead {
        background-color: #3a3a3a;
        font-size: 1.625rem; /* 26px */
    }

    tbody tr:nth-of-type(even) {
        background-color: #2a2a2a;
    }

    tbody tr:last-of-type {
        background-color: #1f1f1f;
        font-weight: bold;
        font-size: 1.625rem;
    }
`;
