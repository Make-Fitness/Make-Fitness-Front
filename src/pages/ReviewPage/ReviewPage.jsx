/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import HeaderPage from "../../common/HeaderPage/HeaderPage";
import FooterPage from "../../common/FooterPage/FooterPage";
import * as s from "./style";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleReviewSubmit = () => {
    if (newReview.trim() === "") return;
    const reviewData = { text: newReview, rating };
    setReviews([...reviews, reviewData]);
    setNewReview("");
    setRating(0);
  };

  return (
    <div css={s.root}>
        <div css={s.container}>
          <HeaderPage />
            <div css={s.mainImg}><img src="/main/PT_3.jpg" alt="메인4 이미지" /></div>
          
        

        <div css={s.reviewList}>
          <h2>리뷰 목록</h2>
          {reviews.length === 0 ? (
            <p>등록된 리뷰가 없습니다.</p>
          ) : (
            <div css={s.reviewGrid}>
              {reviews.map((review, index) => (
                <div key={index} css={s.reviewBox}>
                  <div css={s.reviewRating}>{"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}</div>
                  <p>{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div css={s.reviewContainer}>
          <h2>리뷰 남기기</h2>
          <div css={s.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} css={s.star} onClick={() => setRating(star)}>
                {star <= rating ? "★" : "☆"}
              </span>
            ))}
          </div>
          <textarea
            css={s.reviewInput}
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="리뷰를 작성하세요..."
          />
          <button css={s.submitButton} onClick={handleReviewSubmit}>등록</button>
        </div>
          <FooterPage />
          </div>
        </div>
  );
};

export default ReviewPage;
