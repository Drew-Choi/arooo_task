// 초기 상태 설정
const initState: string[] = [];

// 액션 타입(문자열) 설정. user는 밑에 정의된 리듀서.
const TEST = 'test/TEST';

// 액션 생성 함수. 바깥에서 사용하므로 export.
export const inputTest = (data: string) => {
  // 바깥에서 정보를 받아와야.
  return {
    type: TEST,
    payload: data,
  };
};

interface Action {
  type: string;
  payload: any;
}

// 리듀서 일해라. export default ; 이 파일을 import 하면 기본으로 나가는.
export default function test(state = initState, action: Action) {
  switch (action.type) {
    case TEST:
      return [...state, action.payload];
    default:
      return state;
  }
}
