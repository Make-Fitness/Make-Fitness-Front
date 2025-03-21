import React, { useEffect, useRef, useState } from 'react';
import { Map, MapMarker, StaticMap, useKakaoLoader } from "react-kakao-maps-sdk"; // 카카오 지도 SDK에서 제공하는 Map, MapMarker 컴포넌트
/**@jsxImportSource @emotion/react */
import * as s from './style';
import { useNavigate } from 'react-router-dom';
import HeaderPage from '../../common/HeaderPage/HeaderPage';
import FooterPage from '../../common/FooterPage/FooterPage';
import { container, footer, root } from '../MainPage/style';
import { TbCircleNumber1Filled } from "react-icons/tb";
import { TbCircleNumber2Filled } from "react-icons/tb";
function MapPage() {
  const [ loading ] = useKakaoLoader({appkey: import.meta.env.VITE_KAKAO_API_KEY, libraries: ['services', 'clusterer', 'drawing']});

  
  return (
    <div>
      <div css={s.root}>
        <div css={s.container}>
          <HeaderPage />
        </div>
      
          <div css={s.title}>MakeFitness 오시는 길</div>
            {
              !loading &&
              <div css={s.mapContainer}>
                <StaticMap // 지도를 표시할 Container
                center={{
                  // 지도의 중심좌표
                  lat: 35.1576,
                  lng: 129.0595,
                }}
                
                style={{
                  display: "block", // margin: auto 적용 가능하도록 변경
                  margin: "3rem auto",
                  width: "60%", // 적절한 너비 지정
                  
                  height: "40rem",
                }}
                level={3} // 지도의 확대 레벨
                
              />
              </div>
            }
            <div css={s.addressbox}>
              <div css={s.contentWrapper}>
                <div css={s.address}>
                  <div css={s.button}>
                    주소
                  </div>
                  <span>
                    부산 부산진구 중앙대로 668
                  </span>
                </div>
                <div css={s.subwayinfo}>
                <div css={s.button}>
                    지하철
                  </div>
                    <span>
                      서면역 2번출구 직진 도보 7분 삼정타워 옆건물
                      <span css={s.numberone}>
                        <TbCircleNumber1Filled />
                      </span>
                    </span>
                    <span>
                      <span css={s.numbertwo}>
                        범내골역 8번출구 직진 7분거리
                        <TbCircleNumber2Filled />
                      </span>
                    </span>
                </div>
                <div css={s.businfo}>
                  <div css={s.button}>
                    버스
                  </div>
                  <span>
                    서면한전 정류장 하차 후 도보 2분
                  </span>
                </div>
              </div>
            </div>
          <div css={s.footer}>
            <FooterPage />
          </div>
        </div>
      </div>
  );
}

export default MapPage;

// 움직이는 맵
// {
//   !loading && 
//   <Map
//     center={{ lat: 33.5563, lng: 126.79581 }}
//     style={{ width: "100%", height: "360px" }}
//   >
//     <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
//       <div style={{color:"#000"}}>Hello World!</div>
//     </MapMarker>
//   </Map>
// }