import { color } from '@/style/theme';
import { css } from '@emotion/react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
import FadeIn from '@/components/FadeIn';
import { Fade } from '@mui/material';

const Home: NextPage = () => {
  // 리덕스 state 타입
  interface TestRedux {
    scroll_Handle: number;
  }
  const scrollValue = useSelector((state: TestRedux) => state.scroll_Handle);

  return (
    <main
      css={css`
        position: relative;
        width: 100%;
        height: 1000px;
      `}
    >
      <FadeIn index={0}>
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
          priority
        />
      </FadeIn>

      <div
        css={css`
          opacity: ${scrollValue < 70 ? '0.5' : '0'};
          display: ${scrollValue < 200 ? 'block' : 'none'};
          transition: 0.5s ease-out;
        `}
      >
        <Fade
          in
          timeout={500}
          style={{
            transitionDelay: `${500 * 2}ms`,
          }}
        >
          <Image
            css={css`
              position: absolute;
              top: 20px;
              right: 50%;
              transform: translateX(50%);
            `}
            src="/film.png"
            width={1400}
            height={1000}
            alt="main_Image"
          />
        </Fade>
      </div>

      <FadeIn index={1}>
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
      </FadeIn>

      <FadeIn index={3}>
        <div
          css={css`
            position: relative;
            display: flex;
            top: 730px;
            justify-content: center;

            @media screen and (max-width: 600px) {
              top: 120vw;
            }

            @media screen and (max-width: 280px) {
              top: 150vw;
            }
          `}
        >
          <BsFillArrowDownCircleFill
            className="animate-bounce"
            css={css`
              color: ${color.primary};
              font-size: 25px;
            `}
          />
        </div>
      </FadeIn>
    </main>
  );
};

export default Home;
