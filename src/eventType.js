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
// selectItemMode, //아이템 선택하기 for 삭제

function createModel() {
	return {
		Model:
	}
	
}

function createItem (name) {
	return {
		name : name,
		status: "active",
	}
}