import { PropsWithChildren, useEffect, useState } from "react";
import Button from "./button";
import Modal, { ModalTitle } from "./modal";
import styled from "styled-components";
import axios from "axios";

export interface PostModalDefaultType {
    onClose: () => void;
    jaraUsId: number;
}

export const Form = styled.form`
    margin-top : 50px;
    margin-bottom : 10px;
    width: 100%;
    padding: 30px;
    display: flex;
    flex-direction: column;
    height: 85%;
`;

export const Input = styled.input`
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

export const Toolbar = styled.div`
    padding: 0 10px;
    width: 100%
    height: 8%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    border: 1px solid #F0F0F0;
    border-radius: 30px;

    .imgBtn {
        cursor: pointer;
    }
`;

export const Textarea = styled.textarea`
    border: 1px solid #F0F0F0;
    resize: none;
    width: 100%;
    height: 92%;

    &::placeholder{
        font-size: 15px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
`;

export const TitleBox = styled.div`
    width: 100%;
`;

export const ImagePreview = styled.div`
    display: flex;
    margin-top: 10px;
    width: 100%;
    height: 100%;
    overflow-x: auto;
`;


export const RemoveImageButton = styled.button`
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
   { onClose,
    jaraUsId
   }: PropsWithChildren<PostModalDefaultType>
) {
    
    const [userId, setUserId] = useState(1);

    /*
    useEffect(()=> {
        const fetchUserId = async () => {
            try {
                const response = await axios.get("/api/profile");
        
                if(response.status === 200) {
                    setUserId(response.data.userId);
                    
                } else {
                    console.error("Error get User Info")
                }
            } catch (error) {
                console.error("Error get User Info", error);
            }
    }
        fetchUserId();
    }, []);
    */




    const [image, setImage] = useState<string|null>(null);
    const maxImageCount = 1;

    const handleImageUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;

        if (selectedFiles) {

            const imageURL = URL.createObjectURL(selectedFiles[0]);

            if (image) {
                URL.revokeObjectURL(image);
            }
            
            if(selectedFiles.length > maxImageCount) {
                alert("이미지는 1개만 업로드할 수 있습니다");
            }

            setImage(imageURL);
        }
    }

    const removeImage = () => {
        if(image) {
            URL.revokeObjectURL(image);
        }
        setImage(null);
    };

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    
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

    // 공개 여부
    const [display, setDisplay] = useState<boolean>(true);

    // 익명
    const [anonymous, setAnonymous] = useState<boolean>(false);

    const postMissionPost = async() => {
        try {
            const postData = {
                textTitle: title,
                textContent: content,
                imageContent: image,
                display: display,
                anonymous: anonymous,
                postDateTime: new Date().toISOString(),
                jarausId : jaraUsId
            }

            const response = await axios.post(`api/missionPost/post&userId=${userId}`, postData);

            if (response.status === 200) {
                //성공 로직
                alert(response.statusText);
            } 
            
        } catch (error) {
            console.error("Error post mission", error);
        }
    }

    const onSubmit = () => {
        //postMissionPost();
        alert("인증글이 작성되었습니다");
    };

    return (
        <Modal dialogClassName="post" onClose={onClose}>
        <ModalTitle>글 작성</ModalTitle>
        <Form onSubmit={onSubmit}>
        <Button type="submit" className="postBtn" $buttonColor="jarameBlue">작성</Button>

        <TitleBox>
          <Button type="button" onClick={()=>setDisplay(!display)} $buttonColor="jarameGrey" $fontSize="15spx" $width="10%" $borderRadius="50px 0px 0px 50px">{display ? "전체공개" : "나만보기"}</Button>
          <Input onChange = {onChangeTitle} name="title" className="title" value={title} placeholder="제목" type="text" required></Input>
        </TitleBox>

        <Toolbar>
            <label className="imgBtn" title="이미지 업로드">
                <input type="file" accept="image/*" onChange={handleImageUpload} multiple style={{display: "none"}}/>
                <svg fill="none" width="30px" strokeWidth={1.5} stroke="grey" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
            </label>

            <label className="anonymous" title="익명 공개 여부">
                <input type="checkbox" name="anonymous" checked={anonymous} onChange={()=>{setAnonymous(!anonymous)}}/>
                익명
            </label>
        </Toolbar>

        {image ? (<ImagePreview>
                <ImagePreviewItem>
                <RemoveImageButton title="이미지 삭제" onClick={() => removeImage()}>&times;</RemoveImageButton>
                <img src={image} alt="인증 이미지" />
                </ImagePreviewItem>         
        </ImagePreview>) : null}
        <Textarea onChange = {onChangeContent} name="content" value={content} placeholder="오늘의 미션 과정과 결과를 자유롭게 작성해 주세요." required></Textarea>
        </Form>
    </Modal>
    );

}

export default PostModal;