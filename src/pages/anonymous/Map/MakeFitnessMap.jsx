import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "./style"; // 스타일 분리

const KakaoMap = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    
    // 환경 변수에서 API 키를 가져와 URL에 포함
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(35.1576, 129.0592), // 부산 서면역 좌표
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 마커 추가
        new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(35.1576, 129.0592),
          map: map,
        });
      });
    };

    document.head.appendChild(script);
  }, []);

  return (
    <div css={s.root}>
      <div css={s.container}>
        {/* 헤더 */}
        <div css={s.header}>
          <div css={s.logo}>
            <img src="/logo.png" alt="메인 로고" onClick={() => navigate("/auth")} />
          </div>
        </div>

        {/* 지도 */}
        <div id="map" css={s.map} />

        {/* 주차 정보 */}
        <div css={s.infoBox}>
          <h2>주차 안내</h2>
          <p><strong>짐박스 서면점 건물(통보프라자)</strong></p>
          <ul>
            <li>1시간 3,000원</li>
            <li>주차 1,000원 할인(인포데스크에서 주차도장 수령)</li>
            <li>SUV/RV 차량 불가</li>
            <li>주차 타워 협소</li>
            <li>22시 이후 출차 불가</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default KakaoMap;
