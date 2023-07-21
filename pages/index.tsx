import { color } from '@/theme/theme_other';
import { css } from '@emotion/react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
import FadeIn from '@/components/FadeIn';
import { Fade } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

// 서버사이드렌더
export const getServerSideProps = async () => {
  console.log('server');
  try {
    const response = await axios.get(
      `http://localhost:3000/api/library/content?skip=0&take=9`,
    );

    if (response.status === 200) {
      return {
        props: {
          ssrData: response.data.items,
        },
      };
    } else {
      console.log(response.data.message);
    }
  } catch (err) {
    console.error(err);
  }
};

const Home: NextPage = ({ ssrData }) => {
  console.log('인덱스컴포');

  // 리덕스 state 타입
  interface TestRedux {
    scroll_Handle: number;
  }
  const scrollValue = useSelector((state: TestRedux) => state.scroll_Handle);

  // 모든 아이템 가져오기

  return (
    // 메인 컨테이너
    <main
      css={css`
        position: relative;
        width: 100%;
      `}
    >
      {/* 섹션1 메인화면 */}
      <section
        css={css`
          position: relative;
          width: 100%;
          height: 1000px;
        `}
      >
        {/* 사람이미지 */}
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

        {/* 필름이미지 */}
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

        {/* 메인 글 */}
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

        {/* 화살표 바운스 */}
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
      </section>

      {/* 섹션2 아티클 */}
      <section
        css={css`
          position: relative;
          width: 100%;
          height: auto;
        `}
      >
        {/* {data &&
          data.map((el) => (
            <div
              key={el.id}
              css={css`
                background-color: red;
              `}
            >
              <p>{el.id}</p>
              <p>{el.title}</p>
              <p>{el.content}</p>
              <p>{el.like_count}</p>
            </div>
          ))} */}
      </section>
    </main>
  );
};

export default Home;
