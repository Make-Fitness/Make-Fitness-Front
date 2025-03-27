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
import SalesPage from '../../pages/Master/SalesPage/SalesPage.jsx';
import MemberPage from '../../pages/Master/MemberPage/MemberPage.jsx';
import WorkerPage from '../../pages/Master/WorkerPage/Workerpage.jsx';
import Reservation from '../../pages/Reservation/Reservation.jsx';
import Hmembership from '../../pages/Anonymous/Membership/Hmembership/Hmembership.jsx';
import Pay from '../../Pay.jsx';
import Pt from '../../pages/Anonymous/Membership/Pt/Pt.jsx';
import SelectTrainer from '../../pages/Anonymous/Membership/SelectTrainer/SelectTrainer.jsx';
import ClassRegistration from '../../pages/ClassRegistration/ClassRegistration.jsx';

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
                <Route path="makefitness/sales" element={<SalesPage />} />
                <Route path="makefitness/member" element={<MemberPage />} />
                <Route path="makefitness/worker" element={<WorkerPage />} />
                <Route path="makefitness/reservation" element={<Reservation />} />
                <Route path="makefitness/hmembership" element={<Hmembership />} />
                <Route path="makefitness/pay" element={<Pay />} />
                <Route path="makefitness/selecttrainer" element={<SelectTrainer />} />
                <Route path="makefitness/classregistration" element={<ClassRegistration />} />
            </Routes>
        </MainContainer>
    );
}

export default MainRoute;
