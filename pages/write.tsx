import ButtonCustom from '@/components/ButtonCustom';
import { css } from '@emotion/react';
import { EditorState, convertToRaw } from 'draft-js';
import { NextPage } from 'next';
import { useRef, useState } from 'react';
import FadeIn from '@/components/FadeIn';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useRouter } from 'next/router';

const EditorCustom = dynamic(() => import('@/components/EditorCustom'), {
  loading: () => <div>Loading...</div>,
});

const Write: NextPage = () => {
  const router = useRouter();

  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined,
  );

  const titleRef = useRef<HTMLInputElement>(null);

  // 글 등록 요청 함수
  // onClick으로 데이터 body에 담아 보냄
  const handleSave = async () => {
    try {
      const response = await axios.post('/api/write', {
        title: titleRef.current?.value,
        content: JSON.stringify(convertToRaw(editorState!.getCurrentContent())),
      });

      if (response.status === 200) {
        alert('Success');
        router.push('/');
      } else {
        alert('Fail');
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
      <FadeIn index={1}>
        <input
          ref={titleRef}
          css={css`
            width: 100%;
            /* background-color: red; */
            box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.2);
            margin: 20px 0px;
            padding: 10px 30px;
          `}
          placeholder="제목"
        />
      </FadeIn>

      <FadeIn index={2}>
        <div>
          <EditorCustom
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
        >
          <ButtonCustom onClick={handleSave}>등록하기</ButtonCustom>
        </div>
      </FadeIn>
    </main>
  );
};

export default Write;
