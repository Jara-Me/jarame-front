import styled from "styled-components";
import { Title, Wrapper } from "../components/mypage-components";
import puppyProfile from "../assets/images/puppyProfile.jpg";
import catProfile from "../assets/images/catProfile.jpg";
import defaultImage from "../assets/images/defaultImage.jpg";
import { LI, UL, ULTitle } from "../components/dropdown";
import ViewPostModal from "../components/view-post-modal";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

interface ItemProps {
    src: string;
    onClick: () => void;
}

const Item = styled.img`
    width: 100%;
    object-fit: cover;
    cursor: pointer;
`;

const ItemImg : React.FC<ItemProps> = ({src, onClick}) => (
    <Item src={src} onClick={onClick}></Item>
);

const ItemContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0px;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
`;

export interface User {
    userId: number;
    nickname: string;
    profileImage: string;
    points: number;
    passTicket: number;
    participatingJaraUsCount: number;
}

interface JaraUs {
    adminUserId : number;
    jaraUsId : number;
    jaraUsName : string;
    missionName : string;
    explanation : string|null;
    rule : string|null;
    jaraUsProfileImage : string;
    maxMember: number;
    display: string;
    startDate : string;
    endDate : string;
    interest: string;
    recurrence : string[];
  }

interface ExtractedData {
    jaraUsId : number;
    jaraUsName : string;
}

interface MissionPost {
    missionPostId: number;
    jaraUsId: number;
    postDateTime: string;
    display: boolean;
    anonymous: boolean;
    textTitle: string;
    textContent: string;
    imageContent: string;
    userProfileImage: string;
  }

  interface Item {
    missionPostId: number;
    imageContent: string;
  }

export default function MyActivites() {

    const [isOpenViewPostModal, setOpenViewPostModal] = useState<boolean>(false);

    const onClickToggleViewPostModal  = useCallback(() => {
        setOpenViewPostModal(!isOpenViewPostModal);
    }, [isOpenViewPostModal]);

    
    const [userInfo, setUserInfo] = useState<User|null>(null);
    const [userId, setUserId] = useState<number>(1);
    
    /*
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
    */

    const [myJaraus, setMyJaraus] = useState<JaraUs[]>([{
        "adminUserId": 5,
        "jaraUsId": 4,
        "jaraUsName": "44",
        "missionName": "Test Mission",
        "explanation": null,
        "rule": null,
        "jaraUsProfileImage": "your_image_url_or_base64_data", 
        "interest": "study",
        "maxMember": 10,
        "display": "public",
        "startDate": "2024-02-05",
        "endDate": "2024-02-29",
        "recurrence": ["MONDAY"]},
        {
        "adminUserId": 4,
        "jaraUsId": 5,
        "jaraUsName": "hi",
        "missionName": "Test Mission",
        "explanation": null,
        "rule": null,
        "jaraUsProfileImage": "your_image_url_or_base64_data",
        "interest": "hobby",
        "maxMember": 10,
        "display": "public",
        "startDate": "2024-02-05",
        "endDate": "2024-02-29",
        "recurrence": ["TUESDAY","MONDAY"] 
        }]);

    const [extractedData, setExtractedData] = useState<ExtractedData[]>([]);

    const [view, setView] = useState(false);
    const [activeGroupId, setActiveGroupId] = useState<number|undefined>();



    // useEffect(() => {
    //     const fetchMyJarausData = async() => {
    //         try {
    //             const response = await axios.get(`/api/jaraus/my-groups?userId=${userId}`);

    //             if(response.status === 200) {
    //                 setMyJaraus(response.data);
    //                 setExtractedData(myJaraus.map(({jaraUsId, jaraUsName}) => ({jaraUsId, jaraUsName})));
    //                 setActiveGroupId(extractedData[0].jaraUsId);
    //             } 
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
        
    //     fetchMyJarausData();
    // },[]);

    useEffect(() => {
        const fetchMyJarausData = async () => {
            try {
                const response = await axios.get(`/api/jaraus/my-groups?userId=${userId}`);
                if (response.status === 200) {
                    console.log(response);
                    setMyJaraus(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchMyJarausData();
    }, []);
    
    // useEffect(() => {
    //     if (myJaraus.length > 0) {
    //         setExtractedData(myJaraus.map(({ jaraUsId, jaraUsName }) => ({ jaraUsId, jaraUsName })));
    //         setActiveGroupId(myJaraus[0].jaraUsId);
    //     }
    // }, [myJaraus]);

    //const items = [ puppyProfile, catProfile, defaultImage, puppyProfile, catProfile, defaultImage, puppyProfile, catProfile, defaultImage, puppyProfile, catProfile, defaultImage];

    const [myMissionPosts, setMyMissionPosts] = useState<MissionPost[]>(
            [{
            "missionPostId": 1,
            "jaraUsId": 4,
            "postDateTime": "2024-02-05T15:30:00",
            "display": true,
            "anonymous": false,
            "textTitle": "제목3",
            "textContent": "본문3",
            "imageContent": puppyProfile,
            "userProfileImage": puppyProfile
            },
            {
            "missionPostId": 2,
            "jaraUsId": 4,
            "postDateTime": "2024-02-05T15:30:00",
            "display": true,
            "anonymous": false,
            "textTitle": "제목3",
            "textContent": "본문3",
            "imageContent": catProfile,
            "userProfileImage": catProfile
            }]
    );
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const fetchItems = async() => {
            try {
                const response = await axios.get(`/api/missionPost/my-post?jaraUsId=${activeGroupId}`);

                if(response.status === 200) {
                    setMyMissionPosts(response.data);
                    setItems(myMissionPosts.map(({missionPostId, imageContent}) => ({missionPostId, imageContent})));
                    setExtractedData(myJaraus.map(({jaraUsId, jaraUsName}) => ({jaraUsId, jaraUsName})));

                } else if(response.status === 404) {
                    console.error("404 not found");
                }
            } catch (error) {
                console.error("Error get mission posts", error);
            }
        };

        fetchItems();

    }, [activeGroupId]);

    


    
    return (
        <>
        {/* {isOpenViewPostModal && (
        <ViewPostModal onClickToggleModal = {onClickToggleViewPostModal}>
        </ViewPostModal>
    )} */}

        <Wrapper>
            <Title>참여 히스토리</Title>
            <Container className="history">
            {/* <Dropdown ></Dropdown> */}

            <UL>
            <ULTitle onClick={() => setView(!view)}>그룹 선택{" "}{view ? '▲' : '▼'}</ULTitle>
        {view && extractedData && (
            extractedData.map((item) => (
                <LI
                    key={item.jaraUsId}
                    $isActive = {activeGroupId === item.jaraUsId}
                    onClick = { () => setActiveGroupId(item.jaraUsId)}
                >{item.jaraUsName}</LI>
            ))
        )}
        </UL>
            
            <ItemContainer>
            {items.map((item) => (
              <ItemImg key={item.missionPostId} src={item.imageContent} onClick={onClickToggleViewPostModal}></ItemImg>
            ))}
            </ItemContainer>
            </Container>
        </Wrapper>
        </>
    );
};