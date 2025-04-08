/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import * as s from "./style";
import { fetchReviews, postReview } from "../../apis/reviewApi";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);


  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  
  const roleName = localStorage.getItem("roleName");

  // 리뷰 목록 불러오기
  const loadReviews = async () => {
    try {
      const data = await fetchReviews();
      setReviews(data);
    } catch (error) {
      console.error("리뷰 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  // 리뷰 등록 핸들러
  const handleReviewSubmit = async () => {
    if (roleName !== "ROLE_CUSTOMER") {
      alert("리뷰 작성은 고객만 가능합니다.");
      return;
    }

    if (newReview.trim() === "" || rating === 0) {
      alert("별점과 리뷰 내용을 모두 입력해주세요.");
      return;
    }

    const reviewData = {
      content: newReview,
      likeStar: rating
    };

    try {
      await postReview(reviewData);
      setNewReview("");
      setRating(0);
      await loadReviews();
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      alert("리뷰 등록 중 문제가 발생했습니다.");
    }
  };

    const renderPageNumbers = () => {
      const pages = [];
  
      pages.push(
        <button
          key="prev"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          css={s.pageButtonStyle(false)}
        >
          ◀
        </button>
      );
  
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={`page-${i}`}
            onClick={() => setCurrentPage(i)}
            css={s.pageButtonStyle(i === currentPage)}
          >
            {i}
          </button>
        );
      }
  
      pages.push(
        <button
          key="next"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          css={s.pageButtonStyle(false)}
        >
          ▶
        </button>
      );
  
      return pages;
    };
  

  return (
    <>
      <div css={s.mainImg}>
        <img src="/main/PT_3.jpg" alt="메인 이미지" />
      </div>

      <div css={s.reviewList}>
        <h2>리뷰 목록</h2>
        {reviews.length === 0 ? (
          <p>등록된 리뷰가 없습니다.</p>
        ) : (
          <div css={s.reviewGrid}>
            {currentReviews.map((review, index) => (
              <div key={index} css={s.reviewBox}>
                <div css={s.reviewRating}>
                  {"★".repeat(review.likeStar) + "☆".repeat(5 - review.likeStar)}
                </div>
                <p>{review.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div css={s.paginationWrapperStyle}>{renderPageNumbers()}</div>
      )}
      
      {roleName === "ROLE_CUSTOMER" && (
        <div css={s.reviewContainer}>
          <h2>리뷰 남기기</h2>
          <div css={s.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                css={s.star}
                onClick={() => setRating(star)}
                style={{ cursor: "pointer" }}
              >
                {star <= rating ? "★" : "☆"}
              </span>
            ))}
          </div>
          <textarea
            css={s.reviewInput}
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="리뷰를 작성하세요..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // 줄바꿈 막고
                handleReviewSubmit(); // 리뷰 등록
              }
            }}
          />
          
          <button css={s.submitButton} onClick={handleReviewSubmit}>
            등록
          </button>
        </div>
      )}
    </>
  );
};

export default ReviewPage;
