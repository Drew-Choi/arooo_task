import ButtonCustom from '@/components/ButtonCustom';
import { css } from '@emotion/react';
import { EditorState, convertFromRaw } from 'draft-js';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import FadeIn from '@/components/FadeIn';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { getPathId } from '../api/library/content/path';
import { getArticleDetail } from '../api/library/content/[id]';
import { OrigianlDataType } from '@/function/types';

const EditorCustom = dynamic(() => import('@/components/EditorCustom'), {
  loading: () => <div>Loading...</div>,
});

export async function getStaticPaths() {
  console.log('path실행');
  const paths = await getPathId();
  console.log(paths);

  return {
    paths,
    fallback: true,
  };
}

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

const ArticleDetail: NextPage<SsgDataType> = ({ postData }) => {
  const router = useRouter();
  console.log(postData);

  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined,
  );

  useEffect(() => {
    // postData.content가 undefined인 경우에 대한 처리
    if (postData.content) {
      const contentState = convertFromRaw(JSON.parse(postData.content));
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [postData.content]);

  return (
    <main
      css={css`
        position: relative;
        padding: 0px 20px;
        padding-top: 50px;
      `}
    >
      <FadeIn index={1}>
        <input
          className="flex-1"
          css={css`
            position: relative;
            width: 100%;
            text-align: center;
            box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.2);
            margin: 20px 0px;
            padding: 10px 30px;
          `}
        />
      </FadeIn>

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
        <div
          css={css`
            text-align: right;
            padding: 0px 20px;
          `}
        ></div>
      </FadeIn>
    </main>
  );
};

export default ArticleDetail;
