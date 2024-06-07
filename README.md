# 42gg 프론트엔드 온보딩 1단계

## 구현 목표
- MVC 패턴을 적용한 TODO-list 만들기
- 함수 재사용성 높이기(실패)
- 로직 명확하게 분리하기(부분적 성공)

### eventtype
```js
const eventType = {
	addItem, //아이템 생성*
	deleteItem, // 아이템 제거*
	setItemStatus, //아이템 상태 변경
	editItemMode, // 아이템 내용 변경 가능상태
	editItemSave, //아이템 내용 변경 저장
	switchView, //화면보여주기 - all / active / disable
	dragItemMode, //아이템 드래그를 통한 위치 변경 상태
	dragItemSave,
}
```

## MVC 패턴에 따른 전체 구조
컨트롤러, 뷰, 모델로 구분하여 각자 클래스를 만들었습니다.
컨트롤러 클래스에서 전체 렌더/ 조정을 담당합니다.

### 1. 객체 초기화
#### 모델
생성 시 로컬스토리지 값을 확인하고 가져옵니다.
####  뷰
생성 시 현재 보여줄 item status만 가지고 있습니다.
#### 컨트롤러 
만들어진 모델, 뷰 객체를 받아 초기화합니다.
- 값이 없을 경우 "default" 값을 넣어줍니다.
- 뷰 객체로 함수를 넘기고, 뷰 객체는 이를 받아 이벤트리스너에 콜백으로 등록합니다(바인딩)
이때 감싸준 함수는 객체 클로저를 만들어, this가 컨트롤러 객체에 바인딩된 상태를 유지시킵니다. 
```js
this.view.bindEvent("deleteBtn", (event) => this.deleteItem(event));
this.view.bindEvent("deleteBtn", this.deleteItem);
```
### 2. 렌더
기본 index.html에 노드구조가 들어가 있습니다. 

컨트롤러 생성자는 이벤트리스너를 등록한 후 마지막으로 
모델 객체를 불러와 `getItemsByStatus` 
뷰에 아이템을 토스합니다. `updateItems`

- 모든 아이템 토글 이벤트는 전체 삭제 후 재등록으로 이뤄집니다.
따로 diff 로직을 넣는 등의 효율은 추구하지 않았습니다...

- 아이템 상태 변경/삭제 시에는 키값을 통해 추적합니다.

