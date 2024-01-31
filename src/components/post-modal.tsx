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
        margin-bottom: 20px;
    }
`;

const Toolbar = styled.div`
    padding: 0 10px;
    width: 50px;
    height: 8%;
    display: flex;
    justify-content: center;

    border: 1px solid #F0F0F0;
    border-radius: 30px;

    .imgBtn {
        cursor: pointer;
    }
`;

const Textarea = styled.textarea`
    border: 1px solid #F0F0F0;
    resize: none;
    width: 100%;
    height: 92%;

    &::placeholder{
        font-size: 15px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
`;

const TitleBox = styled.div`
    width: 100%;
`;

export const ImagePreview = styled.div`
    display: flex;
    margin-top: 10px;
    width: 100%;
    height: 100%;
    overflow-x: auto;
`;


const RemoveImageButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    padding: 4px;
    cursor: pointer;
    font-size: 12px;
`;

export const ImagePreviewItem = styled.div`
    position: relative;
    display: inline-block;
    max-width: 200px;
    max-height: 200px;
    margin-right: 10px;
    margin-bottom: 10px;
    overflow: hidden;
`;


function PostModal(
   { onClickToggleModal,
    onSubmitPost,
   }: PropsWithChildren<PostModalDefaultType>
) {
    
    const [images, setImages] = useState<string[]>([]);
    const maxImageCount = 3;

    const handleImageUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;

        if (selectedFiles && selectedFiles.length > 0) {
            const newImages: string[] = [];

            for (let i=0; i< selectedFiles.length;i++) {

                const imageURL = URL.createObjectURL(selectedFiles[i]);
                newImages.push(imageURL);
            }

            const combinedImages = [...images, ...newImages];

            if(combinedImages.length > maxImageCount) {
                alert("이미지는 최대 3개까지 업로드할 수 있습니다");
            }

            const slicedImages = combinedImages.slice(0, maxImageCount);

            setImages(slicedImages);
        }
    }

    const removeImage = (indexToRemove:number) => {
        const newImages = images.filter((_, index) => index !== indexToRemove);
        setImages(newImages);
      };


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

        <Toolbar>
            <label className="imgBtn" title="이미지 업로드">
                <input type="file" accept="image/*" onChange={handleImageUpload} multiple style={{display: "none"}}/>
                <svg fill="none" width="30px" strokeWidth={1.5} stroke="grey" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
            </label>
        </Toolbar>

        {images.length > 0 ? (<ImagePreview>
            {images.map((imageURL, index) => (
                <ImagePreviewItem key={index}>
                <RemoveImageButton title="이미지 삭제" onClick={() => removeImage(index)}>&times;</RemoveImageButton>
                <img src={imageURL} alt={`Image ${index + 1}`} />
                </ImagePreviewItem>            ))} 
        </ImagePreview>) : null}
        <Textarea onChange = {onChangeContent} name="content" value={content} placeholder="오늘의 미션 과정과 결과를 자유롭게 작성해 주세요." required></Textarea>
        </Form>
    </Modal>
    );

}

export default PostModal;