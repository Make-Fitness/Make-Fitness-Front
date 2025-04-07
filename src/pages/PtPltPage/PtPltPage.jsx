import React from 'react';
/**@jsxImportSource @emotion/react */
import * as s from './style';
import { useNavigate } from 'react-router-dom';

function PtPltPage(props) {

    const navigate = useNavigate();

    return (
        <div>
            <div css={s.topimg}>
                <img src="/Trainer/ppmain.jpg" alt="메인 이미지1" />
            </div>
            <div css={s.topGroup}>
                <div css={s.toptext1}>START YOUR FIT</div>
                <div css={s.toptext2}>근력운동 시작을 위한 모든것</div>
            </div>
            <div css={s.mainImgs2}><img src="/Trainer/Reservation.jpg" alt="메인 이미지3" /></div>
            <div css={s.mainImgs2}><img src="/Trainer/ppmain1.jpg" alt="메인 이미지3" /></div>
            <div css={s.mainImgs2}><img src="/Trainer/ppmain2.jpg" alt="메인 이미지3" /></div>
            <div css={s.mainImgs2}><img src="/Trainer/ppmain3.jpg" alt="메인 이미지3" /></div>
            <div css={s.mainImgs2}><img src="/Trainer/ppmain4.jpg" alt="메인 이미지3" /></div>
            <div css={s.mainImgs2}><img src="/Trainer/ppmain5.jpg" alt="메인 이미지3" /></div>
            <div css={s.mainImgs2}><img src="/Trainer/ppmain6.jpg" alt="메인 이미지3" /></div>

            <div css={s.buttonbox}>
                <button css={s.floatingButton} onClick={() => navigate("/makefitness/membership")}>
                    멤버십 가입하기
                </button> 
            </div>
        </div>
    );
}

export default PtPltPage;