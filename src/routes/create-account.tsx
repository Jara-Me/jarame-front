// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import {
//     Error,
//     Form,
//     Input,
//     Switcher,
//     Title,
//     Wrapper,
//     RadioContainer,
//     InputWrapper,
//     OkMsg,
// } from "../components/auth-components";
// import Button from "../components/button";
// import axios from "axios";


// export default function CreateAccount() {

//     const navigate = useNavigate();
//     const [isLoading, setIsLoading] = useState(false);
//     const [nickname, setNickname] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [interest, setInterest] = useState("health");

//     interface Error {
//         available: boolean|undefined;
//         msg: string;
//     }
//     const [nicknameError, setNicknameError] = useState<Error>({ available: undefined, msg: "" });
//     const [emailError, setEmailError] = useState<Error>({ available: undefined, msg: "" });
    
//     const [error, setError] = useState<string>("");


//     const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
//         const {target : {name, value}} = e;
//         if (name === "nickname") {
//             setNickname(value);
//         } else if (name === "email") {
//             setEmail(value);
//         } else if (name === "password") {
//             setPassword(value);
//         } else if (name === "confirmPassword") {
//             setConfirmPassword(value);
//         } else if (name === "interest") {
//             setInterest(value);
//         } 
//     };

//     useEffect(()=>{
//     }, [nicknameError, emailError, error]);

//     const handleNicknameAvailable = async() => {
//         try {
//             if(nickname==="") {
//                 alert("닉네임을 입력해 주세요.");
//                 return;
//             }

//             const response = await axios.post(`/api/user/checkNicknameDuplicate?nickname=${nickname}`);

//             if (response.status === 200) {
//                 setNicknameError({ available: true, msg: "사용 가능한 닉네임입니다" });
//             } else {
//                 setNicknameError({ available: false, msg: "중복된 닉네임입니다" });
//             }
//         } catch (error) {
//             console.error("Error check nickname duplicate", error);
//         }
//     };

//     const handleEmailAvailable = async() => {
//         try {
//             if(email==="") {
//                 alert("이메일을 입력해 주세요.");
//                 return;
//             }

//             const response = await axios.post(`/api/user/checkEmailDuplicate?email=${email}`);

//             if (response.status === 200) {
//                 setEmailError({ available: true, msg: "사용 가능한 이메일입니다" });
//             } else {
//                 setEmailError({ available: false, msg: "사용 가능한 이메일입니다" });                
//             }
//         } catch (error) {
//             console.error("Error check email duplicate", error);
//         }
//     };

//     const handleCreateAccount = async() => {
//         try {
//             const userInfo = {
//                 userid: null,
//                 nickname: nickname,
//                 password: password,
//                 confirmPassword: confirmPassword,
//                 email: email,
//                 interest: interest
//             }

//             const response = await axios.post('/api/user/signup', userInfo);

//             if(response.status === 201) {
//                 alert(response.data.message);
//                 // redirect to the home page
//                 navigate("/login");
//             } else {
//                 setError(response.data.message);
                
//             }

//         } catch (error) {
//             console.error("Error post account", error);
//         }
//     }

//     const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         if(isLoading || nickname === "" || email === "" || password==="") return;

//         if(!nicknameError.available) {
//             alert("닉네임 중복 확인을 해 주세요");
//             return;
//         }

//         if(!emailError.available) {
//             alert("이메일 중복 확인을 해 주세요");
//             return;
//         }

//         try {
//             setIsLoading(true);
//             // create an account
//             handleCreateAccount();
//         } catch(e) {
//             console.error("Error submit create-account", e);
           
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return <Wrapper>
//         <Title>회원가입</Title>
//         <Form onSubmit={onSubmit}>
//             <InputWrapper className="createaccount"><Input onChange = {onChange} name="nickname" value={nickname} placeholder="닉네임" type="text" required/>
//             <Button onClick={handleNicknameAvailable} type="button" $width="auto" $fontColor="jarameGrey" $fontSize="10" $height="auto">중복 확인</Button></InputWrapper>
//             {nicknameError.available ? (
//                 <OkMsg className="middle">{nicknameError.msg}</OkMsg>
//             ) : (
//                 <Error className="middle">{nicknameError.msg}</Error>
//             )}
//             <InputWrapper className="createaccount"><Input onChange = {onChange} name="email" value={email} placeholder="이메일" type="email" required/>
//             <Button onClick={handleEmailAvailable} type="button" $width="auto" $fontColor="jarameGrey" $fontSize="10" $height="auto">중복 확인</Button></InputWrapper>
//             {emailError.available ? (
//                 <OkMsg className="middle">{emailError.msg}</OkMsg>
//             ) : (
//                 <Error className="middle">{emailError.msg}</Error>
//             )}
//             <InputWrapper className="createaccount"><Input onChange = {onChange} name="password" value={password} placeholder="비밀번호" type="password" required/></InputWrapper>
//            <InputWrapper className="createaccount"> <Input onChange = {onChange} name="confirmPassword" value={confirmPassword} placeholder="비밀번호 확인" type="password" required/></InputWrapper>
//            <div style={{"display":"flex", "justifyContent":"space-evenly"}}>
//             <RadioContainer style={{ flex: 1 }}><Input onChange = {onChange} type="radio" name="interest" value="health" checked={interest === "health"} id="healthBtn"/><label htmlFor="healthBtn">건강(운동)</label></RadioContainer>
//             <RadioContainer style={{ flex: 1 }}><Input onChange = {onChange} type="radio" name="interest" value="study" checked={interest === "study"} id="studyBtn" /><label htmlFor="studyBtn">공부</label></RadioContainer>
//             <RadioContainer style={{ flex: 1 }}><Input onChange = {onChange} type="radio" name="interest" value="hobby" checked={interest === "hobby"} id="hobbyBtn"/><label htmlFor="hobbyBtn">취미</label></RadioContainer>
//             </div>
//             <Input type="submit" value={isLoading ? "Loading..." : "계정 생성"}/>

//         </Form>
//         {error !== "" ? <Error className="bottom">{error}</Error> : null}
//         <Switcher>
//             이미 계정이 있으신가요? {" "}
//             <Link to="/login">로그인</Link>
//         </Switcher>
        
//     </Wrapper>
// } 


import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Link } from "react-router-dom";
import {
    Error,
    Form,
    Input,
    Switcher,
    Title,
    Wrapper,
    RadioContainer,
    InputWrapper,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";


// 에러에 따라 에러 멘트 출력
const errors = {
    "auth/email-already-in-use":"이미 존재하는 이메일입니다."
}

export default function CreateAccount() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [interest, setInterest] = useState("health");
    const [error, setError] = useState("");


    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target : {name, value}} = e;
        if(name === "name") {
            setName(value);
        } else if (name === "nickname") {
            setNickname(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        } else if (name === "interest") {
            setInterest(value);
        } 
    };

    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if(isLoading || nickname === "" || email === "" || password==="") return;

        try {
            setIsLoading(true);
            // create an account
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log(credentials.user);

            // redirect to the home page
            navigate("/");

        } catch(e) {
            // setError
            if(e instanceof FirebaseError){
                setError(e.message);
            }
        } finally {
            setIsLoading(false);
        }

        console.log(name, nickname, email, password, confirmPassword, interest);
    };

    return <Wrapper>
        <Title>회원가입</Title>
        <Form onSubmit={onSubmit}>
        <InputWrapper><Input onChange = {onChange} name="nickname" value={nickname} placeholder="닉네임" type="text" required/></InputWrapper>
        <InputWrapper><Input onChange = {onChange} name="email" value={email} placeholder="이메일" type="email" required/></InputWrapper>
        <InputWrapper><Input onChange = {onChange} name="password" value={password} placeholder="비밀번호" type="password" required/></InputWrapper>
        <InputWrapper><Input onChange = {onChange} name="confirmPassword" value={confirmPassword} placeholder="비밀번호 확인" type="password" required/></InputWrapper>
            <div style={{"display":"flex", "justifyContent":"space-evenly"}}>
             <RadioContainer style={{ flex: 1 }}><Input onChange = {onChange} type="radio" name="interest" value="health" checked={interest === "health"} id="healthBtn"/><label htmlFor="healthBtn">건강(운동)</label></RadioContainer>
             <RadioContainer style={{ flex: 1 }}><Input onChange = {onChange} type="radio" name="interest" value="study" checked={interest === "study"} id="studyBtn" /><label htmlFor="studyBtn">공부</label></RadioContainer>
             <RadioContainer style={{ flex: 1 }}><Input onChange = {onChange} type="radio" name="interest" value="hobby" checked={interest === "hobby"} id="hobbyBtn"/><label htmlFor="hobbyBtn">취미</label></RadioContainer>
            </div>
        <Input type="submit" value={isLoading ? "Loading..." : "계정 생성"}/>


        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
            이미 계정이 있으신가요? {" "}
            <Link to="/login">로그인</Link>
        </Switcher>

        <GithubButton/>
        
    </Wrapper>
} 