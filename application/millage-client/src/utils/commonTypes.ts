/**
 * 페이지 정보를 필요로 하는 데이터 타입
 */
export type PaginationResults<T> = {
    results: T[];           // 데이터 리스트
    curPage: number;        // 현재 페이지
    totalCounts: number;    // 총 데이터 수
    totalPages: number;     // 총 페이지 수
};
