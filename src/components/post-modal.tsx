import { PropsWithChildren, useState } from "react";
import Button from "./button";
import Modal, { ModalTitle } from "./modal";
import styled from "styled-components";

interface PostModalDefaultType {
    onClickToggleModal: () => void;
    onSubmitPost: () => void;
}

const Form = styled.form`
    margin-top : 50px;
    margin-bottom : 10px;
    gap: 10px;
    width: 100%;
    padding: 30px;
    display: flex;
    flex-direction: column;
    height: 85%;
`;

const Input = styled.input`
    margin: 5px 0;
    padding: 10px 20px;
    font-size: 16px;
    border: 1px solid #F0F0F0;

    &.title {
        border-radius : 0px 50px 50px 0px;
        width: 90%;
    }
`;

const Textarea = styled.textarea`
    border-radius: 20px;
    border: 1px solid #F0F0F0;
    resize: none;
    width: 100%;
    height: 100%;

    &::placeholder{
        font-size: 15px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
`;

const TitleBox = styled.div`
    width: 100%;
`;

function PostModal(
   { onClickToggleModal,
    onSubmitPost,
   }: PropsWithChildren<PostModalDefaultType>
) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [publishState, setPublishState] = useState("전체 공개");
    const [publishClass, setPublishClass] = useState("all");

    const handlePublish = () => {
        if(publishState === "전체 공개") {
            setPublishState("나만 보기");
            setPublishClass("onlyMe");
        } else {
            setPublishState("전체 공개");
            setPublishClass("all");
        }
    };

    const onChangeTitle = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target : {name, value}} = e;
        
        if (name === "title") {
            setTitle(value);
        }
    };

    const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {target : {name, value}} = e;

        if (name === "content") {
            setContent(value);
        }
    };

    return (
        <Modal dialogClassName="post" onClickToggleModal={onClickToggleModal}>
        <Button onClick={onSubmitPost} className="postBtn" $buttonColor="jarameBlue">작성</Button>
        <ModalTitle>글 작성</ModalTitle>
        <Form>
        <TitleBox>
          <Button type="button" onClick={handlePublish} className={publishClass} $buttonColor="jarameGrey" $fontSize="15spx" $width="10%" $borderRadius="50px 0px 0px 50px">{publishState}</Button>
          <Input onChange = {onChangeTitle} name="title" className="title" value={title} placeholder="제목" type="text" required></Input>
        </TitleBox>
        <Textarea onChange = {onChangeContent} name="content" value={content} placeholder="오늘의 미션 과정과 결과를 자유롭게 작성해 주세요." required></Textarea>

        </Form>
    </Modal>
    );

}

export default PostModal;