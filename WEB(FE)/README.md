## `src/` 디렉토리 구조

* `pages/`: 각각의 라우트에 해당되는 페이지 컴포넌트들의 디렉토리
* `components/`: 공동(common) 컴포넌트 및 페이지 컴포넌트를 채우는 컴포넌트들의 디렉토리
* `hooks/`: custom hook를 모아놓는 디렉토리
* `modules/`: redux의 action 및 reducer를 정의한 디렉토리    
    기능별로 1차적으로 구분하고, 해당 파일의 크기(로직)가 커지면, `actions`와 `reducer`로 구분한다.
    ```
    * modules
    | -- index.ts
    | -- auth.ts
    | -- * board
    |    | -- index.ts
    |    | -- actions.ts
    |    | -- reducer.ts
    |
    | -- carpool.ts
    | -- * manage
         | -- index.ts
         | -- actions.ts
         | -- reducer.ts
    ```
* `constants/`: 모든 상수를 모아놓은 디렉토리
* `utils/`: 반복되는 로직의 리펙토링 코드 등 타 컴포넌트 및 모듈의 작성에 도움이 되는 코드들의 디렉토리