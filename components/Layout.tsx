import { reset, value } from '@/store/modules/scroll_Handle';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';

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

// 레이아웃 props타입
type LayoutProps = {
  children: ReactNode;
  currentURL: string;
};

const Layout: NextPage<LayoutProps> = ({ children, currentURL }) => {
  // 리덕스 설정
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScrollValue = () => {
      dispatch(value(window.scrollY));
    };

    if (currentURL !== '/write' && currentURL !== '/article/[id]') {
      window.addEventListener('scroll', handleScrollValue);
    }

    dispatch(reset());
    return () => {
      window.removeEventListener('scroll', handleScrollValue);
    };
  }, [currentURL]);

  return <Container>{children}</Container>;
};

export default Layout;
