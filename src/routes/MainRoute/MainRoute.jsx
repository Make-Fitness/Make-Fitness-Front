import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/MainPage/MainPage';
import Membership from '../../pages/Anonymous/Membership/Membership';
import MapPage from '../../pages/MapPage/MapPage';
import MyPage from '../../pages/MyPage/MyPage';
import TrainerPage from '../../pages/TrainerPage/TrainerPage';
import Pilates from '../../pages/Anonymous/Membership/Pilates/Pilates';
import ReviewPage from '../../pages/ReviewPage/ReviewPage';
import MainContainer from '../../components/common/MainContainer/MainContainer';
import Pt from '../../pages/Anonymous/Membership/PT/Pt';

function MainRoute() {
    return (
        <MainContainer>
            <Routes>
                <Route path="*" element={<MainPage />} />
                <Route path="makefitness/membership" element={<Membership />} />
                <Route path="makefitness/map" element={<MapPage />} />
                <Route path="makefitness/mypage" element={<MyPage />} />
                <Route path="makefitness/trainerpage" element={<TrainerPage />} />
                <Route path="makefitness/pilates" element={<Pilates />} />
                <Route path="makefitness/pt" element={<Pt />} />
                <Route path="makefitness/review" element={<ReviewPage />} />
            </Routes>
        </MainContainer>
    );
}

export default MainRoute;
