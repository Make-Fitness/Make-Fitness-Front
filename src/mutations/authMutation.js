import { useMutation } from "@tanstack/react-query";
import { joinApi, loginApi } from "../apis/authApi";

export const useJoinMutation = () => useMutation({
    mutationKey: ["joinMutation"],
    mutationFn: joinApi,
    retry: 0,
});

export const useLoginMutation = () => useMutation({
    mutationKey: ["loginMutation"],
    mutationFn: async (loginInfo) => {
        console.log("로그인 요청 데이터:", loginInfo); // 요청 데이터 확인
        return await loginApi(loginInfo);
    },
    retry: 0,
});
