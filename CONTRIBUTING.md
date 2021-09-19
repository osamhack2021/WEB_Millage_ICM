## Code Styling

- 코드 스타일링에는 eslint 활용
- Google TS Style Guideline 을 기준으로 코드 스타일링
- 'yarn lint'로 코드 스타일 준수 여부 확인, 'yarn lint:fix'로 자동 수정

## Commit Message

Christ Beams의 [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/) 를 참고하였습니다.

1. Separate subject from body with a blank line
2. Limit the subject line to 50 characters
3. Capitalize the subject line
4. Do not end the subject line with a period
5. Use the imperative mood in the subject line

Ex.
```
Add contributing.md

- Code styling
- Commit message guideline
```

커밋 메시지의 제목은 영어로 작성하여주시기 바랍니다

## Contributing Code

1. Repository clone 후 (혹은 code-server로 접속 후) 개발하고자 하는 기능의 Branch 생성
2. 코드 작성 완료 후 Eslint 테스트 모두 통과시 Pull Request. 이때 구현한 기능의 핵심 내용을 본문에 요약.
4. Maintainer 확인 후 main branch 로 merge
