import { color } from '@/theme/theme_other';
import { css } from '@emotion/react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
import FadeIn from '@/components/FadeIn';
import { Fade } from '@mui/material';
import axios from 'axios';
import { IndexDataType } from '@/function/types';
import { useCallback, useEffect, useState } from 'react';
import { AutoSizer, List } from 'react-virtualized';
import dynamic from 'next/dynamic';

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
// -------------------------------------------------------

// ---- 다이나믹 임폴트
const ArticleThum = dynamic(() => import('../components/ArticleThum'));

// ssr 프롭스 데이터 타입 설정
type SsrDataType = {
  ssrData: [IndexDataType];
};

const Home: NextPage<SsrDataType> = ({ ssrData }) => {
  // 리덕스 state 타입
  interface TestRedux {
    scroll_Handle: number;
  }
  const scrollValue = useSelector((state: TestRedux) => state.scroll_Handle);
  console.log(scrollValue);

  // 이전 skip위치 확인용
  const [skip, setSkip] = useState<number>(0);
  console.log('skip위치: ', skip);

  // 이전 스크롤 위치 확인용
  const [scrollSpot, setScrollSpot] = useState<number>(2100);
  console.log('stop위치: ', scrollSpot);

  // 첫 페이지 로딩시 SSR의 take값(고정)
  const Take = 9;

  // 처음에 SSR로 받아서 data전용 상태보관이 없어 생성
  const [data, setData] = useState<IndexDataType[]>([]);
  console.log('데이터들어온다잉 :', data);

  // 무한스크롤, 스크롤 위치에 다라 요청이 가도록 설정
  const getArticleInfinit = useCallback(async () => {
    console.log('큐!!!!!!!!');

    setScrollSpot((cur) => cur + 1350);
    const nextPage = skip + Take;
    try {
      const response = await axios.get(
        `/api/library/content?skip=${nextPage}&take=${Take}`,
      );

      if (response.status === 200 && response.data.items.length !== 0) {
        setData((cur) => {
          let copy = [...cur, ...response.data.items];
          return copy;
        });
        setSkip(nextPage);
      }
    } catch (err) {
      console.error('API요청 오류: ', err);
    }
  }, [skip]);

  useEffect(() => {
    console.log('스크롤감시자!!!!!!!');

    if (scrollValue >= scrollSpot) {
      getArticleInfinit();
    }
  }, [scrollValue]);

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
          height: 1500px;
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
          margin-bottom: 200px;
        `}
      >
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={850}
              width={1600}
              rowCount={ssrData.length + data.length}
              rowHeight={600}
              rowRenderer={({ index, key, style }) => (
                <>
                  <div className="grid grid-cols-3 gap-5">
                    {ssrData &&
                      scrollValue > 571 &&
                      ssrData.map((article, index) => (
                        <ArticleThum
                          index={index}
                          key={article.id}
                          article={article}
                        />
                      ))}
                  </div>
                  <div className="grid grid-cols-3 gap-5 mt-5">
                    {data &&
                      data.map((article, index) => (
                        <ArticleThum
                          index={index}
                          key={article.id}
                          article={article}
                        />
                      ))}
                  </div>
                </>
              )}
            />
          )}
        </AutoSizer>
      </section>
    </main>
  );
};

export default Home;
