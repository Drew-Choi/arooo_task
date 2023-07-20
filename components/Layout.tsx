import { value } from '@/store/modules/scroll_Handle';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';

type ChildreProps = {
  children: ReactNode;
};

const Container = styled.div`
  position: relative;
  width: 100vw;
  padding: 0px 10vw;
  margin: auto;
  transition: 0.2s ease;

  @media screen and (max-width: 820px) {
    padding: 0px 5vw;
  }
`;

const Layout: NextPage<ChildreProps> = ({ children }) => {
  // 리덕스 설정
  const dispatch = useDispatch();

  // 레이아웃에서 스크롤 감지
  const handleScrollValue = () => {
    dispatch(value(window.scrollY));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollValue);

    return () => {
      window.removeEventListener('scroll', handleScrollValue);
    };
  }, []);

  return <Container>{children}</Container>;
};

export default Layout;
