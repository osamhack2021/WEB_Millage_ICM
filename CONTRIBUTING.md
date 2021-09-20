## Code Styling

- 코드 스타일링에는 eslint 활용
- Google TS Style Guideline 을 기준으로 코드 스타일링
- 'yarn lint'로 코드 스타일 준수 여부 확인, 'yarn lint:fix'로 자동 수정

## Commit Message

아래 내용은 Christ Beams의 [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)와 [Git Commit Message Style Guide - 개인/팀을 위한 커밋 메시지 스타일 가이드](https://blog.munilive.com/posts/my-git-commit-guide.html)를 참고하였습니다.

먼저 기본적인 가이드라인입니다.

> 1. Separate subject from body with a blank line
> 2. Limit the subject line to 50 characters
> 3. Capitalize the subject line
> 4. Do not end the subject line with a period
> 5. Use the imperative mood in the subject line

추가적으로 커밋메시지 전에 type 라벨을 추가합니다.

type 라벨은 아래와 같습니다

> -   `feat`: 새로운 기능을 추가하거나 기존의 기능을 요구 사항 변경으로 변경한 경우\
기능 추가와 수정을 나누어서 쓰고 싶은 경우 아래 처럼 2개로 나누어서 타입을 지정할 수 있다.
    -   `new`: 새로운 기능을 추가 한 경우
    -   `improve`: 기존 기능을 수정 한 경우, 요구 사항이 변경되어 수정된 경우에도  `improve`  타입으로 한다.
> -   `fix`: 기능상 버그 픽스를 했을 경우
> -   `docs`: 문서(주석)의 추가/수정의 경우, 직접적인 코드의 변화 없이 순수하게 문서(주석)만 추가/수정했을 경우
> -   `style`: UI를 추가/변경 하거나 스타일 관련 작업을 했을 경우
> -   `refactor`: 기능의 변화가 아닌 코드를 리팩토링했을 경우, 코드 리뷰 등으로 로직(기능)의 변화 없이 단순 함수 내부에서만 사용하는 이름을 변경하였거나, 코드 pretty 등을 적용했을 경우
> -   `test`: 테스트 코드를 별도로 추가하거나, 변경했을 경우, 만약 기능을 추가하면서 테스트 코드를 동시에 작성했으면  `feat`  타입으로 사용
> -   `chore`: 기능/테스트 코드, 문서, 스타일, 리팩토링을 제외한, 배포, 빌드 등과 같이 프로젝트의 기타 작업들에 대해 추가/수정했을 경우, lint 등의 적용으로 코드 스타일을 수정 했을 때도 chore 사용
> -   `release`: 릴리스를 하기 위해 패키지 버전을 올리거나, 릴리스 버전 커밋을 찍기 위한 경우


Ex.
```
docs: Add contributing.md

- Code styling
- Commit message guideline
```

커밋 메시지의 제목은 영어로 작성하여주시기 바랍니다

## Contributing Code

1. Repository clone 후 (혹은 code-server로 접속 후) 개발하고자 하는 기능의 Branch 생성
2. 코드 작성 완료 후 Eslint 테스트 모두 통과시 Pull Request. 이때 구현한 기능의 핵심 내용을 본문에 요약.
4. Maintainer 확인 후 main branch 로 merge
