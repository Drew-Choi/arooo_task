import { css } from '@emotion/react';
import { EditorState, convertFromRaw } from 'draft-js';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import FadeIn from '@/components/FadeIn';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import BackBTN from '@/components/BackBTN';
import { AiTwotoneHeart } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '@/theme/theme_other';
import { OrigianlDataType } from '@/function/types';
import { getPathId } from '../api/library/content/path';
import { getArticleDetail } from '../api/library/content/[id]';
import axios from 'axios';
import { reqLike } from '@/store/modules/likeget';

const EditorCustom = dynamic(() => import('@/components/EditorCustom'), {
  loading: () => <div>Loading...</div>,
});

// Server-Side-Path
export async function getStaticPaths() {
  const paths = await getPathId();
  console.log(paths);

  return {
    paths,
    fallback: true,
  };
}

// Server-Side-Static
export async function getStaticProps({ params }: { params: any }) {
  // nextAPI사용 : /api/library/content/[id]
  // 빠른 유저 경험을 위해 정적기반으로 진행
  const postData = await getArticleDetail(params.id);
  return {
    props: {
      postData,
    },
  };
}
type SsgDataType = {
  postData: OrigianlDataType;
};

interface DataType {
  id: number;
  title: string;
  content: string | any;
  img: string;
  like_count: number;
}

const ArticleDetail: NextPage<any> = ({ postData }) => {
  // 좋아요 용 쿼리 받기
  const router = useRouter();
  const { index, id } = router.query;
  const idx = parseInt(index as string, 10);

  // 좋아요 리덕스 state
  // 리덕스 state 타입
  interface LikeRedux {
    likeget: any;
  }
  const likeCount = useSelector((state: LikeRedux) => state.likeget.like);
  const dispatch = useDispatch();

  // 아티클 담는 곳
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined,
  );

  useEffect(() => {
    // postData.content가 undefined인 경우에 대한 처리
    if (postData?.content) {
      const contentState = convertFromRaw(JSON.parse(postData.content));
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [postData?.content]);

  // 좋아요 업데이트
  const likeUpdate = async (id: any) => {
    try {
      const response = await axios.post(`/api/library/content/${id}/like`, {
        like_count: 1,
      });

      if (response.status === 200) {
        console.log(response.data.message);
        dispatch(reqLike());
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main
      css={css`
        position: relative;
        padding: 0px 20px;
        padding-top: 50px;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-evenly;
        `}
      >
        <Image
          css={css`
            border-radius: 10px;
            box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.4);
          `}
          src={`/${postData?.img}`}
          width={350}
          height={500}
          alt="poster"
        />
        <div css={css``}>
          <p
            css={css`
              position: relative;
              text-align: center;
              top: 50%;
              transform: translateY(50%);
              font-size: 20px;
              font-weight: 600;
              padding-right: 180px;
              letter-spacing: 1px;
            `}
          >
            {postData?.title}
          </p>
          <div
            css={css`
              display: flex;
              justify-content: right;
              align-items: center;
              padding-top: 15px;
            `}
          >
            <span
              css={css`
                font-size: 20px;
                margin-top: 10px;
                margin-right: 20px;
              `}
            >
              {likeCount.length !== 0 && likeCount[idx].like_count}
            </span>
            <AiTwotoneHeart
              onClick={() => likeUpdate(id)}
              css={css`
                font-size: 40px;
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
      </div>

      <FadeIn index={2}>
        <div>
          <EditorCustom
            readOnly={true}
            editorState={editorState}
            onEditorStateChange={setEditorState}
          />
        </div>
      </FadeIn>
      <FadeIn index={3}>
        <Link
          href="/"
          css={css`
            z-index: 3;
          `}
        >
          <div
            css={css`
              position: relative;
              bottom: 80px;
              padding: 0px 20px;
              z-index: 3;
            `}
          >
            <BackBTN />
          </div>
        </Link>
      </FadeIn>
    </main>
  );
};

export default ArticleDetail;
