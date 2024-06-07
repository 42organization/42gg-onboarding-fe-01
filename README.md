# 42gg 프론트엔드 온보딩 1단계

## 공통 조건

- 온보딩 프로젝트는 개인 계정으로 fork하여 진행하고 PR로 제출합니다.
- git / github / code 컨벤션은 42gg notion에 있는 자료를 적극 반영합니다.
- 기본 기능 외 추가 기능, 디자인 구현은 자유입니다.
- 최종 제출품에는 README 작성이 되있어야 합니다.([예시](https://github.com/42organization/42gg.client/blob/main/README.md))

## todo list 만들기

- (필수) Javascript, HTML, CSS
- (필수) todo 생성(Create), 조회(Read) 기능 구현하기 (새로고침 고려 X)
- (필수) todo 완료 상태 체크 기능 구현하기 (정렬은 선택사항) 
- (필수) todo 수정(Update), 삭제(Delete) 기능 구현하기 (새로고침 고려 X)
- (선택) 디자인 적용하기
- (선택) 무료로 배포하기


## 구현 요약
- MVVM 패턴을 적용하여 Model, View, ViewModel 로 분리
- todoList를 localStorage에 저장하여 데이터 관리

## 기능

1. 생성(Create) 및 조회
- '할 일을 입력해주세요.' input에 입력 후 `enter` 또는 `+` 버튼을 눌러 생성

  <img width="400" alt="image" src="https://github.com/42organization/42gg-onboarding-fe-01/assets/74870834/b0c71a1c-9470-430a-a92f-3233f2e84c8a">

2. 완료 상태 체크
- 체크 박스를 클릭하여 완료 상태 체크
- 완료된 항목은 완료되지 않은 항목 아래로 이동

  <img width="400" alt="image" src="https://github.com/42organization/42gg-onboarding-fe-01/assets/74870834/164d98e5-fd4f-456e-a0bc-411ec7727af3">

3. 수정(Update)
- 리스트의 항목을 더블클릭하여 수정 가능

  <div>
  <img width="400" alt="image" src="https://github.com/42organization/42gg-onboarding-fe-01/assets/74870834/a69fee65-33bc-4911-a3ae-8b4ec5dcce76">
  <img width="400" alt="image" src="https://github.com/42organization/42gg-onboarding-fe-01/assets/74870834/84a36828-e1c7-4c72-9ff2-676b6c5e231a">
 </div>

4. 삭제(Delete)
- 각 항목의 오른쪽 `X` 버튼을 클릭하여 삭제 

  <img width="400" alt="image" src="https://github.com/42organization/42gg-onboarding-fe-01/assets/74870834/1b9c429d-7cce-4e3c-b85e-5aeca776039c">


## 참고

- 데이터 관리는 하단의 방식 중 하나 선택하시면 됩니다.
  - localstorage
  - local server(예. [https://github.com/shal0mdave/todo-api.git](https://github.com/shal0mdave/todo-api.git), lowdb)
  - mock api(예. [https://dummyjson.com/](https://dummyjson.com/))
- todo list를 구현하기 위해 필요한 기능들을 미리 생각(그려보고)해보고, 구현해보세요.
- 궁금한 사항은 issue에 등록해주세요.
- yoouyeon 님 배포 페이지| https://verysimpletodolist.netlify.app/
- github io 배포방법 | https://velog.io/@mangojang/github-pages-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0
