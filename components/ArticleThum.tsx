import { IndexDataType } from '@/function/types';
import { css } from '@emotion/react';
import { NextPage } from 'next';
import Image from 'next/image';
import { AiOutlineHeart } from 'react-icons/ai';
import { color } from '@/theme/theme_other';
import FadeIn from './FadeIn';
import { useEffect, useState } from 'react';

// ssr 프롭스 데이터 타입 설정
type SsrDataType = {
  article: IndexDataType;
  index: number;
};

const ArticleThum: NextPage<SsrDataType> = ({ article, index }) => {
  return (
    <FadeIn index={index % 3 === 0 ? 0 : index % 3 === 2 ? 1 : 0.5}>
      <div
        css={css`
          position: relative;
          width: 25vw;
          box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.5);
          background-color: white;
          padding: 30px 20px;
          border-radius: 10px;
        `}
      >
        <Image
          css={css`
            border-radius: 10px;
            margin: auto;
            cursor: pointer;
            transition: 0.4s ease-in-out;
            :hover {
              transform: scale(1.1);
              transform-origin: center;
            }
            :active {
              transform: scale(1.4);
            }
          `}
          src={`/${article.img}`}
          width={200}
          height={285}
          alt="mainPoster"
        />
        <p
          css={css`
            position: relative;
            font-size: 15px;
            margin-top: 30px;
            text-align: justify;
            cursor: pointer;

            :hover {
              color: gray;
            }
            :active {
              color: #bdbdbd;
            }
          `}
        >
          {article.title}
        </p>
        <div
          css={css`
            display: flex;
            justify-content: right;
            padding-top: 15px;
            font-size: 40px;
          `}
        >
          <AiOutlineHeart
            css={css`
              color: ${color.primary};
              cursor: pointer;
              :hover {
                color: #ffcf55;
              }
              :active {
                color: #fff3d3;
              }
            `}
          />
        </div>
      </div>
    </FadeIn>
  );
};

export default ArticleThum;
