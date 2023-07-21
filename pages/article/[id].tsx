const ArticleDetail = () => {
  // const [editorState, setEditorState] = useState<EditorState | undefined>(
  //   undefined,
  // );
  // const getAllArticle = async () => {
  //   try {
  //     const response = await axios.get(`/api/library/content?skip=0&take=9`);

  //     if (response.status === 200) {
  //       setEditorState(
  //         EditorState.createWithContent(
  //           convertFromRaw(JSON.parse(response.data.items[0].content)),
  //         ),
  //       );
  //       return console.log(response.data.message);
  //     } else {
  //       console.log(response.data.message);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   getAllArticle();
  // }, []);
  return <div>Enter</div>;
  {
    /* <EditorCustom
          readOnly={true}
          editorState={editorState}
          onEditorStateChange={setEditorState}
        /> */
  }
};

export default ArticleDetail;
