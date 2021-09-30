/**
 * 비동기 API (Backend에 Fetch 요청 등)의 반환값을 담는 State
 */
export type AsyncState<T> = {
    loading: boolean;
    data: T | null;
    error: Error | string | null | undefined;
};
