import { inputTest } from '@/store/modules/test';
import { css } from '@emotion/react';
import { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';

interface TestRedux {
  test: string[];
}

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const test = useSelector((state: TestRedux) => state.test);

  const redux = () => {
    dispatch(inputTest('리덕스 성공 하나요!'));
  };

  return (
    <main
      css={css`
        position: relative;
        background-color: beige;
        padding: 20px 20px;
      `}
    >
      <p
        css={css`
          padding: 50px;
          letter-spacing: 5px;
          font-size: 18px;
          font-weight: 600;
        `}
      >
        글로 다시 보는 영화 이야기
      </p>
      <button onClick={redux}>리덕스 테스트</button>
      {test.map((el, index) => (
        <p key={index}>{el}</p>
      ))}
    </main>
  );
};

export default Home;
