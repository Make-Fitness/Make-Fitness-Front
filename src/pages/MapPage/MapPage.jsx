/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import {
  useKakaoLoader,
  Map,
  MapMarker
} from "react-kakao-maps-sdk";
import * as s from './style';
import { TbCircleNumber1Filled, TbCircleNumber2Filled } from "react-icons/tb";

function MapPage() {
  // Kakao 지도 SDK 로드 상태 체크
  const [isLoading] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_API_KEY, // env 발급
    libraries: ['services', 'clusterer', 'drawing'],
  });

  // 주소 좌표 상태
  const [latAndLng, setLatAndLng] = useState({
    lat: 0,
    lng: 0,
  });

  /**
   * 주소 → 좌표 변환 (Geocoder)
   */
  useEffect(() => {
    if (isLoading || !window.kakao) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    const address = "부산 부산진구 중앙대로 668";

    geocoder.addressSearch(address, (result) => {
      if (result && result[0]) {
        setLatAndLng({
          lat: parseFloat(result[0].y),
          lng: parseFloat(result[0].x),
        });
      }
    });
  }, [isLoading]);

  /**
   *  컴포넌트 렌더링
   */
  return (
    <>
      
      <div css={s.title}>MakeFitness 오시는 길</div>

      {!isLoading && (
        <div css={s.mapContainer}>
          <Map
            center={latAndLng}
            style={{
              display: "block",
              margin: "3rem auto",
              width: "100%",
              height: "60rem",
            }}
            level={3}
          >
            <MapMarker position={latAndLng} />
          </Map>
        </div>
      )}

      <div css={s.addressbox}>
        <div css={s.contentWrapper}>
          
          <div css={s.address}>
            <div css={s.button}>주소</div>
            <span>부산 부산진구 중앙대로 668</span>
          </div>

          <div css={s.subwayinfo}>
            <div css={s.button}>지하철</div>
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
            <div css={s.button}>버스</div>
            <span>서면한전 정류장 하차 후 도보 2분</span>
          </div>

        </div>
      </div>
    </>
  );
}

export default MapPage;
