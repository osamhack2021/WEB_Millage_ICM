/**
 * 페이지 정보를 필요로 하는 데이터 타입
 */
export type PaginationResults<T> = {
    results: T[];           // 데이터 리스트
    curPage: number;        // 현재 페이지
    totalCounts: number;    // 총 데이터 수
    totalPages: number;     // 총 페이지 수
};

/**
 * 리팩토링한 컴포넌트에게 ClassName을 추가로 부여할 수 있도록\
 * className을 props로 넘길 수 있게 해주는 PropsType
 */
export type ClassNameProps = {
    className?: string;
};

/**
 * Response의 상태 정보를 정의한 공통 Response 타입.
 */
export type CommonResponse = {
    result: 'success' | 'fail' | 'error';
    message?: string;
};
