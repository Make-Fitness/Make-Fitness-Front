import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUpPage from '../../pages/SignUpPage/SignUpPage';
import LogInPage from '../../pages/LogInPage/LogInPage';

function AuthRoute() {
    return (
        <Routes>
            <Route path="signup" element={<SignUpPage />} />
            <Route path="signin" element={<LogInPage />} />
        </Routes>
    );
}

export default AuthRoute;