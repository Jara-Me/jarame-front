import axios from "axios";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Button from "./button";
import defaultGroupImg from "../assets/images/defaultGroupImg.jpg";


interface GroupImgProps {
    groupImg: string;
    className: string;
};

interface GroupImgUploaderProps {
    groupImg : string;
    setGroupImg : React.Dispatch<React.SetStateAction<string>>;
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
    justify-content: center;
    align-items: center;

`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 3px;

    .GroupImgButton:hover {
        font-weight: bold;
    }
`;

const GroupImgContainer = styled.img`
    border-radius: 50%;
    width: 110px;
    height: 110px;
    object-fit: cover;
`;

const GroupImg : React.FC<GroupImgProps> = ({groupImg, className}) => (
    <GroupImgContainer src={groupImg} className={className}></GroupImgContainer>
);

const GroupImgInput = styled.input`
    display: none;
`;

const GroupImgUploader:React.FC<GroupImgUploaderProps> = ({groupImg, setGroupImg}) => {

    
    const [fileURL, setFileURL] = useState<string>("");
    const [file, setFile] = useState<FileList | null>();
    const imgUploadInput = useRef<HTMLInputElement | null>(null);
    // const [GroupImgSrc, setGroupImg] = useState(groupImg);

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files) {
            setFile(event.target.files);
            const newFileURL = URL.createObjectURL(event.target.files[0]);
            setFileURL(newFileURL);
            setGroupImg(newFileURL);
        };
    };

    const onImageRemove = ():void => {
        URL.revokeObjectURL(fileURL);
        setFileURL(""); // 렌더링 이미지 초기화
        setFile(null);
        setGroupImg(defaultGroupImg);
    };

    const submitHandler = async( event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        // 서버 통신
        const formData = new FormData();

        if (file) {
            formData.append("file", file[0]);
      
            try {
              const response = await axios.post("/api/upload", formData, {
                headers: { "content-type": "multipart/form-data" },
              });
              console.log(response);
            } catch (error: any) {
              console.log("이미지업로드 에러 발생");
              throw new Error(error);
            }
          } else {
            alert("업로드할 이미지가 없습니다");
          }
        };

        return (
        <Wrapper>
            <GroupImg
                groupImg={groupImg}
                className="GroupImg"
            ></GroupImg>
            <GroupImgInput
                type="file"
                id="img"
                accept="image/*"
                ref={imgUploadInput}
                onChange={onImageChange}
            ></GroupImgInput>
            <ButtonWrapper>
            <Button
                type="button"
                className="GroupImgButton"
                $buttonColor="white"
                $fontColor="jarameGrey"
                $fontSize="10"
                $width="auto"
                onClick={submitHandler}>대표 이미지 변경</Button>
            <Button
                type="button"
                className="GroupImgButton"
                $buttonColor="white"
                $fontColor="jarameGrey"
                $fontSize="10"
                $width="auto"
                onClick={onImageRemove}>기본 이미지로 설정</Button>
            </ButtonWrapper>
        </Wrapper>
        );
};

export default GroupImgUploader;
