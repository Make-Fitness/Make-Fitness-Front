/**@jsxImportSource @emotion/react */
import * as s from './style';

import React from 'react';
import MainHeader from '../MainHeader/MainHeader';
import MainFooter from '../MainFooter/MainFooter';

function MainContainer({children}) {
    return (
        <div css={s.container}>
            <MainHeader />
            <main css={s.main}>
                {children}
            </main>
            <MainFooter />
        </div>
    );
}

export default MainContainer;