import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {
    Error,
    Form,
    Input,
    InputWrapper,
    Switcher,
    Title,
    Wrapper,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";
import axios from "axios";


// 에러에 따라 에러 멘트 출력
const errors = {
    "auth/email-already-in-use":"이미 존재하는 이메일입니다."
}

export default function CreateAccount() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target : {name, value}} = e;
        
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
  
        if(isLoading || email === "" || password==="") return;

        try {
        // redirect to the home page
        setIsLoading(true);
        await signInWithEmailAndPassword(auth, email, password);

        navigate("/main");

        } catch(e) {
            // setError
            if(e instanceof FirebaseError){
                setError(e.message);
            }
        } finally {
            setIsLoading(false);
        }

        console.log(name, email, password);
    };

    return <Wrapper>
        <Title> 로그인 </Title>

        <Form onSubmit={onSubmit}>
        <InputWrapper className="login"><Input onChange = {onChange} name="email" value={email} placeholder="이메일" type="email" required/></InputWrapper>
        <InputWrapper className="login"><Input onChange = {onChange} name="password" value={password} placeholder="비밀번호" type="password" required/></InputWrapper>
            <Input onChange = {onChange} type="submit" value={isLoading ? "Loading..." : "로그인"}/>
        </Form>
        {error !== "" ? <Error className="bottom">{error}</Error> : null}

        <Switcher>
            자라미가 처음이신가요? {" "}
            <Link to="/create-account">회원가입하기</Link>
        </Switcher>

        <GithubButton/>

    </Wrapper>
} 