// import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Wrapper, Title, Subtitle, Btn } from "../components/home-components";

export default function Home() {

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/login");
    };

    return (<Wrapper>
    <Title>자라미</Title>
    <Subtitle>성장몽과 자라는 챌린지</Subtitle>
    <Btn onClick={navigateToLogin}>시작하기</Btn>
    </Wrapper>
    );
}