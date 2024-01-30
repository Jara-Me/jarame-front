import styled, {css} from "styled-components";
import { palette } from "../assets/styles/palette";
import { Container, Title, Wrapper } from "../components/mypage-components";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import SaveButton from "../components/saveButton";
import { useRef, useState } from "react";
import puppyProfile from "../assets/images/puppyProfile.jpg";
import axios from "axios";
import ImgUploader from "../components/image-uploader";

const Form = styled.form`
    display: block;
`;

const Label = styled.label`
    display: flex;
    align-items: center;
    margin-left: 20px;
    white-space: nowrap;
    font-weight: bold;
`;

interface InputWrapperProps {
    disabled?: boolean; 
  }

const InputWrapper = styled.div<InputWrapperProps>`
    display: flex;
    padding: 10px 20px;
    align-items: center;
    margin: 5px 0;
    margin-left: 10px;
    justify-content: space-between;
    border-radius: 50px;
    border: 1px solid #f0f0f0;
    min-width: 90%;
`;

const Input = styled.input`
  margin-left: 10px;
  border: none;
  font-size: 16px;
  width: 70%;
`;

export default function MyAccount() {
    const navigate = useNavigate();

    const dummyData = {
        name: "지우",
        nickname: "짱구",
        profile: puppyProfile,
        email: "example@jarame.co",
        password: "userPassword"
    };

    const [nickname, setNickname] = useState(dummyData.nickname);
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [password, setPassword] = useState("");


    const onClickUnregister = () => {
        const ok = confirm("정말로 자라미를 떠나시나요?");
        if(ok) {
            console.log("회원 탈퇴");
            navigate("/");
        }
    };

    const onChangeNickname = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target : {name, value}} = e;
        
        setNickname(value);
        setShowPasswordInput(true);
    };

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
      };

    return (
        <Wrapper>
            <Title>회원 정보 수정</Title>
            <Container className="editInfo">
                {/* <ProfileImg profile={dummyData.profile} className="profile"></ProfileImg> */}
                <ImgUploader userProfile={dummyData.profile}></ImgUploader>
                <Form>
                <Label>닉네임
                <InputWrapper><Input onChange = {onChangeNickname} id="nickname" value={nickname} type="text" required/>
            <Button type="button" $width="auto" $fontColor="jarameGrey" $fontSize="10" $height="auto">중복 확인</Button></InputWrapper></Label>
            {showPasswordInput && (
                <Label>비밀번호 확인<InputWrapper><Input onChange={onPasswordChange} id="password" type="password" required/></InputWrapper></Label>
            )}
            <Label>이름<InputWrapper><Input id="name" value={dummyData.name} type="text" disabled/></InputWrapper></Label>
            <Label>이메일<InputWrapper><Input id="email" value={dummyData.email} type="email" disabled/></InputWrapper></Label>
            
            </Form>
            </Container>

            <Container><SaveButton></SaveButton></Container>


            <Container className="register">
                <Title>회원 탈퇴</Title>
                <Button onClick={onClickUnregister} className="unregister" $fontSize="15" $fontColor="white" $buttonColor="jarameBlue" >회원 탈퇴</Button>
            </Container>

        </Wrapper>
    );

};