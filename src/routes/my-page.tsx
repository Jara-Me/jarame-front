import styled from "styled-components";
import puppyProfile from "../assets/images/puppyProfile.jpg";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import { useEffect, useState } from "react";
import axios from "axios";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 13px;
`;

const ProfileContainer = styled.img`
    border-radius: 50%;
    width: 150px;
`;

interface ProfileProps {
    profile: string;
    className: string;
}

const ProfileImg : React.FC<ProfileProps> = ({profile, className}) => (
    <ProfileContainer src={profile} className={className}></ProfileContainer>
);

const Content = styled.div`

    display: flex;
    align-items: center;

    &.h1{
      font-size: 22px;
      margin-bottom: 15px;
    }

    &.h3{
        font-size: 15px;
    }

    svg {
        width: 20px;
        margin-right: 10px;
    }

    &.logout{
        position: fixed;
        bottom: 0;
        margin-bottom: 30px;
    }
`;

interface User {
    userId: number;
    nickname: string;
    profileImage: string;
    points: number;
    passTicket: number;
    participatingJaraUsCount: number;
  }

export default function MyPage() {

    const navigate = useNavigate();

    const onClickLogout = () => {
        // 로그아웃 로직
        console.log("로그아웃");
        navigate("/");
    };

    const [userInfo, setUserInfo] = useState<User|null>(null);
    
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
        userName: "지우",
        title: "Sample Title",
        content: "In the heart of the bustling city, where the neon lights paint the sky with vibrant hues, there exists a certain charm that captivates the soul. The rhythm of life echoes through the crowded streets, a symphony of diverse cultures and aspirations. As the sun sets behind the towering skyscrapers, the cityscape transforms into a canvas of twinkling lights, each one telling a story of dreams and ambitions. Amidst the urban chaos, hidden gems emerge – cozy cafes with the aroma of freshly brewed coffee, quaint bookshops inviting literary exploration, and serene parks offering an escape from the urban hustle. Every corner of the city has a tale to tell, from the historic landmarks standing as witnesses to bygone eras to the modern art installations pushing the boundaries of creativity. The people, a mosaic of backgrounds and experiences, create the tapestry of this metropolis. From the laughter of friends sharing a meal in a local diner to the solitary artist finding inspiration in a quiet studio, the city embraces diversity as its heartbeat. It's a place where innovation meets tradition, and where the relentless pursuit of excellence intertwines with the appreciation of simple pleasures.",
        profile: puppyProfile,
        dateTime: "1월 13일 오후 8:01",
        point: "136",
        passTicket: "2"
    }

    return (
        <Wrapper>
            { userInfo && <>
            <ProfileImg profile={userInfo.profileImage} className="mypage"></ProfileImg>
            <Content className="h1">안녕하세요, {userInfo.nickname}님!</Content>
            <Content className="h3">
            <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
</svg>보유 포인트: {userInfo.points}</Content>
            <Content className="h3">
            <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
</svg>보유 패스권: {userInfo.passTicket}개</Content>
            
            <Content className="logout"><Button type="button" onClick={onClickLogout} className="save" $buttonColor="jarameGrey" $fontColor="white" $fontSize="6">로그아웃</Button></Content>
            </>}
        </Wrapper>
    );
};