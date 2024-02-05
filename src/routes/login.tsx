import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Error,
    Form,
    Input,
    InputWrapper,
    Switcher,
    Title,
    Wrapper,
} from "../components/auth-components";
import axios from "axios";



export default function CreateAccount() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState("");

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target : {name, value}} = e;
        
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const setSessionCookie = (name:string, value:string|object) => {
        document.cookie = `${name}=${value}; path=/;`;
    };
    
    const handleLogin = async() => {
        const user = {
            email: email,
            password: password
        }

        try {
            const response = await axios.post("api/user/login", user);
            
            // 서버 응답 확인
            if(response.data.success) {
                const sessionId = response.data.sessionId;
                setSessionCookie('JSESSIONID', sessionId);

                navigate("/main");
            }
            else {
                setError("비밀번호가 틀렸습니다.");
            }
        } catch(error) {
            console.error("Error post login: ", error);
            setError("유효하지 않은 아이디입니다.");
        }
    }

    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
  
        if(isLoading || email === "" || password==="") return;


        try {
        // redirect to the home page
        setIsLoading(true);
        await handleLogin();

        } catch(e) {

        } finally {
            setIsLoading(false);
        }
    };

    return <Wrapper>
        <Title> 로그인 </Title>
        <Form onSubmit={onSubmit}>
        <InputWrapper className="login"><Input onChange = {onChange} name="email" value={email} placeholder="이메일" type="email" required/></InputWrapper>
        <InputWrapper className="login"><Input onChange = {onChange} name="password" value={password} placeholder="비밀번호" type="password" required/></InputWrapper>
            <Input onChange = {onChange} type="submit" value={isLoading ? "Loading..." : "로그인"}/>
        </Form>
        {error !== "" ? <Error className="bottom">{error}</Error> : null}

        <Switcher className="to-create-account">
            자라미가 처음이신가요? {" "}
            <Link to="/create-account">회원가입하기</Link>
        </Switcher>
    </Wrapper>;
} ;