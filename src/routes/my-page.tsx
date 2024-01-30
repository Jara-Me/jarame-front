import styled from "styled-components";
import puppyProfile from "../assets/images/puppyProfile.jpg";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
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

const Content = styled.h1`
    font-size: 22px;
`;

export default function MyPage() {
    
    const dummyData = {
        userName: "지우",
        title: "Sample Title",
        content: "In the heart of the bustling city, where the neon lights paint the sky with vibrant hues, there exists a certain charm that captivates the soul. The rhythm of life echoes through the crowded streets, a symphony of diverse cultures and aspirations. As the sun sets behind the towering skyscrapers, the cityscape transforms into a canvas of twinkling lights, each one telling a story of dreams and ambitions. Amidst the urban chaos, hidden gems emerge – cozy cafes with the aroma of freshly brewed coffee, quaint bookshops inviting literary exploration, and serene parks offering an escape from the urban hustle. Every corner of the city has a tale to tell, from the historic landmarks standing as witnesses to bygone eras to the modern art installations pushing the boundaries of creativity. The people, a mosaic of backgrounds and experiences, create the tapestry of this metropolis. From the laughter of friends sharing a meal in a local diner to the solitary artist finding inspiration in a quiet studio, the city embraces diversity as its heartbeat. It's a place where innovation meets tradition, and where the relentless pursuit of excellence intertwines with the appreciation of simple pleasures.",
        profile: puppyProfile,
        dateTime: "1월 13일 오후 8:01"
    }

    return (
        <Wrapper>
            <ProfileImg profile={puppyProfile} className="mypage"></ProfileImg>
            <Content>안녕하세요, {dummyData.userName}님!</Content>
        </Wrapper>
    );
};