import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/MainPage/MainPage';
import Membership from '../../pages/Anonymous/Membership/Membership';
import MapPage from '../../pages/MapPage/MapPage';
import MyPage from '../../pages/MyPage/MyPage';
import TrainerPage from '../../pages/TrainerPage/TrainerPage';

function MainRoute() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/makefitness/membership" element={<Membership />} />
            <Route path="/makefitness/map" element={<MapPage />} />
            <Route path="/makefitness/mypage" element={<MyPage />} />
            <Route path="/makefitness/trainerpage" element={<TrainerPage />} />
        </Routes>
    );
}

export default MainRoute;
