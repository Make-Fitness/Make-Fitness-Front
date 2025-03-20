import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUpPage from '../../pages/SignUpPage/SignUpPage';
import LogInPage from '../../pages/LogInPage/LogInPage';
import OAuth2LoginPage from '../../pages/OAuth2LoginPage/OAuth2LoginPage';

function AuthRoute() {
    return (
        <Routes>
            <Route path="signup" element={<SignUpPage />} />
            <Route path="signin" element={<LogInPage />} />
            <Route path="oauth2" element={<OAuth2LoginPage />} />
        </Routes>
    );
}

export default AuthRoute;  
