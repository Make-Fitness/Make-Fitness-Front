import { css } from "@emotion/react";

export const global = css`

    @import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');

    * {
        color: #dbdbdb;
    }

    html, body {
        margin: 0;
        padding: 0;
        height: 100vh;
        overflow: auto;
        background-color: rgb(10, 10, 10);
        font-family: "Noto Sans KR", serif;
        font-size: 62.5%;
    }

    
`;