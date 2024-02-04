import styled from "styled-components"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
    margin-top : 15px;
    background-color : white;
    font-weight: 530;
    padding: 10px 20px;
    border-radius: 50px;
    border: 0;
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: center;
    color: black;
    width: 100%;
    cursor: pointer;
    border: 1px solid #F0F0F0;
`;


const Logo = styled.img`
    height: 25px;
    margin-right: 10px;
`;

export default function GithubButton() {

    const navigate = useNavigate();
    
    const onClick = async () => {
        try {
            //const provider = new GithubAuthProvider();
            // await signInWithPopup(auth, provider);
            navigate("/");
        } catch (error) {
            console.error(error)
        }
    }

    return <Button onClick = {onClick}>
        <Logo src="/github-mark.svg"/>
        Continue with Github
    </Button>
}