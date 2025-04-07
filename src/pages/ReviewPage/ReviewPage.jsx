/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import * as s from "./style";
import { fetchReviews, postReview } from "../../apis/reviewApi";

const reviewsPerPage = 6;

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const roleName = localStorage.getItem("roleName");

  // ✅ 전체 리뷰 불러오기
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

  // ✅ 리뷰 등록
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
      setCurrentPage(1); // 리뷰 등록 시 첫 페이지로 이동
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      alert("리뷰 등록 중 문제가 발생했습니다.");
    }
  };

  // ✅ 페이징 관련 계산
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

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
          <>
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

            {totalPages > 1 && (
              <div css={s.paginationWrapper}>
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  css={s.pageButton(currentPage === 1)}
                >
                  ◀
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    css={s.pageButton(currentPage === page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  css={s.pageButton(currentPage === totalPages)}
                >
                  ▶
                </button>
              </div>
            )}
          </>
        )}
      </div>

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
                e.preventDefault();
                handleReviewSubmit();
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
