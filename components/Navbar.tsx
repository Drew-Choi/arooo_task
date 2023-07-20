import { color } from '@/style/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import Link from 'next/link';
import { useSelector } from 'react-redux';

// 전체 Container---
const Nav = styled.nav`
  position: fixed;
  display: flex;
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  padding: 0px 10vw;
  width: 100%;
  height: 50px;
  z-index: 3;
`;
// ---------

// Logo 부분---
const LogoWrap = styled.div`
  position: relative;
  display: ${({ scrollValue }: { scrollValue: number }) =>
    scrollValue < 20 ? 'none' : 'flex'};
  height: 50px;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;

  transform: ${({ scrollValue }: { scrollValue: number }) =>
    scrollValue < 70 ? 'translateY(-60px)' : 'translateY(0)'};
  transition: 0.5s ease-in-out;
`;

const Logo = styled.p`
  position: relative;
  margin: 0px;
  font-size: 30px;
  font-weight: 900;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
`;

// Menu 부분---
const StyleBox = styled.div`
  position: relative;
  display: ${({ scrollValue }: { scrollValue: number }) =>
    scrollValue < 20 ? 'none' : 'flex'};
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #1c1c1c;
  color: white;
  padding: 0px 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 5px;
  box-shadow: 0px 1px 3px 0.5px rgba(0, 0, 0, 0.5);

  transform: ${({ scrollValue }: { scrollValue: number }) =>
    scrollValue < 70 ? 'translateY(-60px)' : 'translateY(0)'};
  transition: 0.5s ease-in-out;
`;
// ------------

// Navbar컴포넌트 props타입
type navProps = {
  navTextArr: { text: string; href: string }[];
};

// 리덕스 state 타입
interface TestRedux {
  scroll_Handle: number;
}

const Navbar: NextPage<navProps> = ({ navTextArr }) => {
  // 리덕스 설정
  const scrollValue = useSelector((state: TestRedux) => state.scroll_Handle);
  console.log(scrollValue);

  return (
    <Nav>
      <LogoWrap scrollValue={scrollValue}>
        <Logo>
          <span
            css={css`
              color: ${color.primary};
            `}
          >
            RE
          </span>
          <span
            css={css`
              color: ${color.secondary};
            `}
          >
            :
          </span>
          CINE
        </Logo>
      </LogoWrap>

      <StyleBox scrollValue={scrollValue}>
        {navTextArr.map((el) => (
          <Link
            css={css`
              margin: 0px;
              padding-right: 30px;
              font-size: 15px;
              :last-child {
                padding-right: 0px;
              }
            `}
            href={el.href}
            key={el.text}
          >
            {el.text}
          </Link>
        ))}
      </StyleBox>
    </Nav>
  );
};

export default Navbar;
