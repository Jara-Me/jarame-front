import styled from "styled-components";
import { Container, Title, Wrapper } from "../components/mypage-components";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import SaveButton from "../components/saveButton";
import { useState } from "react";
import puppyProfile from "../assets/images/puppyProfile.jpg";
import ProfileUploader from "../useEffectcomponents/profile-upload";
import { User } from "./my-activites";
import { Error, OkMsg } from "../components/auth-components";


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

    const [userInfo, setUserInfo] = useState<User>({
        "userId": 1,
        "nickname": "silicondream",
        "profileImage": puppyProfile,
        "points": 150,
        "passTicket": 3,
        "participatingJaraUsCount": 5
      });
    
    const getUserInfo = async() => {
        try {
            const response = await axios.get("/api/profile");

            if(response.status === 200) {
                setUserInfo(response.data);
            } else {
                console.error(response.statusText);
            }
        } catch (error) {
            console.error("Error get user info", error);
        }
    }

    useEffect(()=> {
        getUserInfo();
    },[])

    const dummyData = {
        nickname: "짱구",
        profile: puppyProfile,
        email: "example@jarame.co",
        password: "userPassword"
    };

    interface Error {
        available: boolean|undefined;
        msg: string;
    }

    const [nickname, setNickname] = useState(dummyData.nickname);
    const [nicknameError, setNicknameError] = useState<Error>({ available: undefined, msg: "" });
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [password, setPassword] = useState("");
    const [profile, setProfile] = useState<string>("");

    
    const handleNicknameAvailable = async() => {
        try {
            if(nickname==="") {
                alert("닉네임을 입력해 주세요.");
                return;
            }

            const response = await axios.post(`/api/checkNicknameDuplicate?nickname=${nickname}`);

            if (response.status === 200) {
                setNicknameError({ available: true, msg: "사용 가능한 닉네임입니다" });
            } else {
                setNicknameError({ available: false, msg: "중복된 닉네임입니다" });
            }
        } catch (error) {
            console.error("Error check nickname duplicate", error);
        }
    };

    const handleChangeNickname = async() => {
        try {
            if(userInfo === null) return;

            const request = {
                userid : userInfo.userId,
                nickname : nickname,
                password: password
            }

            const response = await axios.post('/api/user/changeNickname', request);

            if(response.status === 200) {
                alert("닉네임이 성공적으로 변경되었습니다");
            } else {
                alert("닉네임 변경에 실패했습니다");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onSubmit = () => {
        const ok = confirm("변경 사항을 모두 저장하시겠습니까?");
        if(ok) {
            handleChangeNickname();
            console.log("변경 사항 저장");
        }
    };

    const onClickUnregister = async () => {
        const ok = confirm("정말로 자라미를 떠나시나요?");
        if(ok) {
            try {
                const response = await axios.delete("/api/user/delete");

                if(response.status === 200) {
                    alert("성공적으로 탈퇴되었습니다!");
                    navigate("/");
                } else {
                    console.log("로그인하지 않았거나 만료된 세션입니다.");
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const onChangeNickname = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target : {name, value}} = e;
        console.log(name);
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
                <ProfileUploader userProfile={userInfo.profileImage} setUserProfile={setProfile}></ProfileUploader>
                <Form onSubmit={onSubmit}>
                <Label>닉네임
                <InputWrapper><Input onChange = {onChangeNickname} id="nickname" value={userInfo.nickname} type="text" required/>
            <Button onClick={handleNicknameAvailable} type="button" $width="auto" $fontColor="jarameGrey" $fontSize="10" $height="auto">중복 확인</Button></InputWrapper></Label>
            {nicknameError.available ? (
                <OkMsg className="middle">{nicknameError.msg}</OkMsg>
            ) : (
                <Error className="middle">{nicknameError.msg}</Error>
            )}
            {nicknameError.available && showPasswordInput && (
                <Label>비밀번호 확인<InputWrapper><Input onChange={onPasswordChange} id="password" type="password" required/></InputWrapper></Label>
            )}
            {/* <Label>이메일<InputWrapper><Input id="email" value={userInfo.email} type="email" disabled/></InputWrapper></Label> */}
            
            <SaveButton></SaveButton>

            </Form>
            </Container>



            <Container className="register">
                <Title>회원 탈퇴</Title>
                <Button onClick={onClickUnregister} className="unregister" $fontSize="15" $fontColor="white" $buttonColor="jarameBlue" >회원 탈퇴</Button>
            </Container>

        </Wrapper>
    );

};