import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/MainPage/MainPage';
import Membership from '../../pages/Anonymous/Membership/Membership';
import MapPage from '../../pages/MapPage/MapPage';
import MyPage from '../../pages/MyPage/MyPage';
import TrainerPage from '../../pages/TrainerPage/TrainerPage';
import Pilates from '../../pages/Anonymous/Membership/Pilates/Pilates';
import ReviewPage from '../../pages/ReviewPage/ReviewPage';

function MainRoute() {
    return (
        <Routes>
            <Route path="*" element={<MainPage />} />
            <Route path="makefitness/membership" element={<Membership />} />
            <Route path="makefitness/map" element={<MapPage />} />
            <Route path="makefitness/mypage" element={<MyPage />} />
            <Route path="makefitness/trainerpage" element={<TrainerPage />} />
            <Route path="makefitness/pilates" element={<Pilates />} />
            <Route path="makefitness/review" element={<ReviewPage />} />
        </Routes>
    );
}

export default MainRoute;
