import styled from '@emotion/styled';
import { NextPage } from 'next';

type navProps = {
  navTextArr: string[];
};

// 전체 Container---
const Nav = styled.nav`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
`;
// ---------

// Logo 부분---
const LogoWrap = styled.div`
  position: relative;
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
`;

const Logo = styled.p`
  position: relative;
  margin: 0px;
  font-size: 30px;
  font-weight: 900;
`;

// Menu 부분---
const StyleBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #1c1c1c;
  color: white;
  padding: 0px 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 5px;
`;

const P = styled.p`
  margin: 0px;
  padding-right: 30px;
  font-size: 15px;
  :last-child {
    padding-right: 0px;
  }
`;
// ------------

const Navbar: NextPage<navProps> = ({ navTextArr }) => {
  return (
    <Nav>
      <LogoWrap>
        <Logo>RE:CINE</Logo>
      </LogoWrap>

      <StyleBox>
        {navTextArr.map((text) => (
          <P key={text}>{text}</P>
        ))}
      </StyleBox>
    </Nav>
  );
};

export default Navbar;
