/** @jsxImportSource @emotion/react */
import * as s from "./style";
import Calendar from "../../components/common/Calendar/Calendar";



function Reservation() {
  return (
    <div css={s.container}>
      <h1 css={s.title}>수업 예약 페이지</h1>
      <p css={s.description}>
        이곳에서 원하는 강사의 수업을 예약하실 수 있습니다.
      </p>

      
      <Calendar />

      
      <img css={s.image} src={"/Trainer/reservation.jpg"} alt="예약 이미지" />
    </div>
  );
}

export default Reservation;
