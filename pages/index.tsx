import { color } from '@/style/theme';
import { css } from '@emotion/react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useSelector } from 'react-redux';

const Home: NextPage = () => {
  return (
    <main
      css={css`
        height: auto;
        position: relative;
      `}
    >
      <MainImageComponent />
    </main>
  );
};

const MainImageComponent = () => {
  // 리덕스 state 타입
  interface TestRedux {
    scroll_Handle: number;
  }
  const scrollValue = useSelector((state: TestRedux) => state.scroll_Handle);

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        height: 1000px;
      `}
    >
      <Image
        css={css`
          position: absolute;
          top: 7vw;
          right: 3vw;
          transition: 0.2s ease;

          @media screen and (max-width: 1295px) {
            right: 50%;
            transform: translateX(50%);
          }
        `}
        src="/person.svg"
        width={600}
        height={600}
        alt="main_Image"
      />

      <Image
        css={css`
          position: absolute;
          display: ${scrollValue < 200 ? 'block' : 'none'};
          top: 20px;
          opacity: 0.7;
          right: 50%;
          transform: translateX(50%);
          opacity: ${scrollValue < 70 ? '0.7' : '0'};
          transition: 0.5s ease-in-out;
        `}
        src="/film.png"
        width={1400}
        height={1000}
        alt="main_Image"
      />

      <div
        css={css`
          position: relative;
          display: block;
          top: 28vw;
          padding: 0px 250px;
          transition: 0.2s ease;

          @media screen and (max-width: 1295px) {
            padding: unset;
            text-align: center;
            top: 700px;
          }

          @media screen and (max-width: 690px) {
            top: 100vw;
          }
        `}
      >
        <p
          css={css`
            display: inline-block;
            letter-spacing: 5px;
            line-height: 1.5em;
            font-size: 25px;
            font-weight: 600;
            text-align: right;

            @media screen and (max-width: 1295px) {
              text-align: center;
            }

            @media screen and (max-width: 690px) {
              font-size: 3.5vw;
            }
          `}
        >
          글로 다시 보는 영화 이야기
          <br />
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
        </p>
      </div>
    </div>
  );
};

export default Home;
