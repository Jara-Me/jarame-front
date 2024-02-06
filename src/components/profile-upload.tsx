import axios from "axios";
import { useRef, useState } from "react";
import styled from "styled-components";
import Button from "./button";
import defaultProfile from "../assets/images/defaultProfile.jpg";


interface ProfileProps {
    profile: string;
    className: string;
};

interface ImgUploaderProps {
    userProfile: string;
    setUserProfile : React.Dispatch<React.SetStateAction<string>>;
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100px;
    gap: 5px;
    position: relative;

    .profileButton{
        display: none;
        transition: translateX(-50%);  
    }

    &:hover .profileButton {
        display: flex;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
`;

const ProfileContainer = styled.img`
    border-radius: 50%;
    width: 90px;
    height: 90px;
    object-fit: cover;
`;

const ProfileImg : React.FC<ProfileProps> = ({profile, className}) => (
    <ProfileContainer src={profile} className={className}></ProfileContainer>
);

const ProfileInput = styled.input`
    display: none;
`;

const ProfileUploader:React.FC<ImgUploaderProps> = ({userProfile, setUserProfile}) => {
    const [fileURL, setFileURL] = useState<string>("");
    const [file, setFile] = useState<FileList | null>();
    const imgUploadInput = useRef<HTMLInputElement | null>(null);
    const [profileSrc, setProfileSrc] = useState(userProfile);

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files) {
            setFile(event.target.files);
            const newFileURL = URL.createObjectURL(event.target.files[0]);
            setFileURL(newFileURL);
            setProfileSrc(newFileURL);
            setUserProfile(newFileURL);
        };
    };

    const onImageRemove = ():void => {
        URL.revokeObjectURL(fileURL);
        setFileURL(""); // 렌더링 이미지 초기화
        setFile(null);
        setProfileSrc(defaultProfile);
        setUserProfile(defaultProfile);
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
            <ProfileImg
                profile={profileSrc}
                className="profile"
            ></ProfileImg>
            <ProfileInput
                type="file"
                id="img"
                accept="image/.jpg, image/.png"
                required
                ref={imgUploadInput}
                onChange={onImageChange}
            ></ProfileInput>
            <ButtonWrapper>
            <Button
                type="button"
                className="profileButton"
                $buttonColor="white"
                $fontColor="jarameGrey"
                $fontSize="10"
                $width="auto"
                $hasBorder={true}
                $borderColor="jarameGrey"
                onClick={ (event) => {
                    event.preventDefault();
                    if(imgUploadInput.current) {
                        imgUploadInput.current.click();
                    }
            }}>프로필 변경</Button>
            <Button
                type="button"
                className="profileButton"
                $buttonColor="white"
                $fontColor="jarameGrey"
                $fontSize="10"
                $width="auto"
                onClick={onImageRemove}>프로필 제거</Button>
            </ButtonWrapper>
        </Wrapper>
        );
};

export default ProfileUploader;
