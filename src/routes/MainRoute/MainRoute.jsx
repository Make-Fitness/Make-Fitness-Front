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
import WorkerPage from '../../pages/Master/WorkerPage/WorkerPage.jsx';
import Daymanagement from '../../pages/Daymanagement/Daymanagement.jsx';
import Pay from '../../Pay.jsx';
import Pt from '../../pages/Anonymous/Membership/Pt/Pt.jsx';
import SelectTrainer from '../../pages/Anonymous/Membership/SelectTrainer/SelectTrainer.jsx';
import Reservations from '../../pages/Reservations/Reservations.jsx';
import MemberManagement from '../../pages/MemberManagement/MemberManagement.jsx'
import Hmembership from '../../pages/Anonymous/Membership/Hmembership/Hmembership.jsx'
import ClassesPage from '../../pages/ClassesPage/ClassesPage.jsx';
import MasterMyPage from '../../pages/Master/MasterMyPage/MasterMyPage.jsx';
import PtPltPage from '../../pages/PtPltPage/PtPltPage.jsx';

function MainRoute() {
    return (
        <MainContainer>
            <Routes>
                <Route path="*" element={<MainPage />} />
                <Route path="makefitness/membership" element={<Membership />} />
                <Route path="makefitness/map" element={<MapPage />} />
                <Route path="makefitness/hmembership" element={<Hmembership />} />
                <Route path="makefitness/mypage" element={<MyPage />} />
                <Route path="makefitness/trainerpage" element={<TrainerPage />} />
                <Route path="makefitness/pilates" element={<Pilates />} />
                <Route path="makefitness/pt" element={<Pt />} />
                <Route path="makefitness/review" element={<ReviewPage />} />
                <Route path="makefitness/sales" element={<SalesPage />} />
                <Route path="makefitness/member" element={<MemberPage />} />
                <Route path="makefitness/worker" element={<WorkerPage />} />
                <Route path="makefitness/reservations/daymanagement" element={<Daymanagement />} />
                <Route path="makefitness/manager/classes" element={<ClassesPage />} />
                <Route path="makefitness/pay" element={<Pay />} />
                <Route path="makefitness/selecttrainer" element={<SelectTrainer />} />
                <Route path="makefitness/manager/membermanagement" element={<MemberManagement />} />
                <Route path="makefitness/reservations" element={<Reservations />} />
                <Route path="makefitness/mastermypage" element={<MasterMyPage />} />
                <Route path="makefitness/ptplt" element={<PtPltPage />} />
            </Routes>
        </MainContainer>
    );
}

export default MainRoute;
