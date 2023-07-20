import styled from '@emotion/styled';
import { NextPage } from 'next';
import { ReactNode } from 'react';

type ChildreProps = {
  children: ReactNode;
};

const Container = styled.div`
  position: relative;
  width: 100vw;
  padding: 0px 10vw;
  margin: auto;
`;

const Layout: NextPage<ChildreProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;
