
import { Challenge, ChallengeRuleLI, ChallengeRuleUL, GroupInfoWrapper, GroupInfoBox, GroupName, Hashtag, ProveSelectBtn, ProveWrapper, Wrapper, ProveBox, ProvePage, GroupBackgroundImg, GroupImgContainer} from "../components/group-components"
import { Link } from "react-router-dom";
import PostBtn from "../components/post-btn";
import { useCallback, useEffect, useState } from "react";
import PostModal from "../components/post-modal";
import ViewPostModal from "../components/view-post-modal";
import puppyProfile from "../assets/images/puppyProfile.jpg";
import catProfile from "../assets/images/catProfile.jpg";
import axios from "axios";


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

export default function Group(jarausId:number) {

    const dummyDatas = [
        {
        "missionPostId": 1,
        "jaraUsId": 44,
        "postDateTime": "2024-02-05T15:30:00",
        "display": true,
        "anonymous": false,
        "textTitle": "제목3",
        "textContent": "본문3",
        "imageContent": "이미지파일주소3",
        "userProfileImage": "사용자프로필이미지주소1"
        },
        {
        "missionPostId": 2,
        "jaraUsId": 44,
        "postDateTime": "2024-02-05T15:30:00",
        "display": true,
        "anonymous": false,
        "textTitle": "제목3",
        "textContent": "본문3",
        "imageContent": "이미지파일주소3",
        "userProfileImage": "사용자프로필이미지주소2"
        },
        {
        "missionPostId": 3,
        "jaraUsId": 44,
        "postDateTime": "2024-02-05T15:30:00",
        "display": true,
        "anonymous": false,
        "textTitle": "제목4",
        "textContent": "본문4",
        "imageContent": "이미지파일주소4",
        "userProfileImage": "사용자프로필이미지주소3"
        }
        ]

    const [missionPosts, setMissionPosts] = useState<MissionPost[]|null>(null);
    const [filterType, setFilterType] = useState<string>("all");

    const getMissionPosts = async(filterType:string) => {
        try {
            if(filterType==="all") {
                const response = await axios.get(`/api/missionPost/All-post?jaraUsId=${jarausId}`);

                if(response.status === 200) {
                    setMissionPosts(response.data);
                } else if (response.status === 404) {
                    console.error("404 not found");
                }
            } else if (filterType==="my") {
                const response = await axios.get(`/api/missionPost/my-post?jaraUsId=${jarausId}`);

                if(response.status === 200) {
                    setMissionPosts(response.data);
                } else if(response.status === 404) {
                    console.error("404 not found");
                }
            }

        } catch (error) {
            console.error("Error get mission posts", error);
        }
    }
    
    useEffect(()=> {
        if(jarausId !== null) {
            getMissionPosts(filterType);
        }
    }, [filterType]);
    
    const [isOpenPostModal, setOpenPostModal] = useState<boolean>(false);
    const [isOpenViewPostModal, setOpenViewPostModal] = useState<boolean>(false);
    
    const onClickToggleModal = useCallback(() => {
        setOpenPostModal(true);
    }, [isOpenPostModal]);

    const onClosePostModal = () => {
        setOpenPostModal(false);
    };


    const [selectedMissionPostId, setSelectedMissionPostId] = useState<number>();

    // const onClickToggleViewPostModal = useCallback(() => {
    //     setOpenViewPostModal(!isOpenViewPostModal);
    // }, [isOpenViewPostModal]);

    const onClickToggleViewPostModal = useCallback((missionPostId:number) => {
        setSelectedMissionPostId(missionPostId);
        setOpenViewPostModal(true);
        console.log(selectedMissionPostId);
    }, [isOpenViewPostModal]);
    

    const onCloseViewPostModal = () => {
        setOpenViewPostModal(false);
        setSelectedMissionPostId(undefined);
    };

    return (<Wrapper>
        <PostBtn onClick={onClickToggleModal}></PostBtn>

        {isOpenPostModal && (
            <PostModal onClose = {onClosePostModal}></PostModal>
        )}

        {isOpenViewPostModal && selectedMissionPostId && (
            <ViewPostModal onClose = {onCloseViewPostModal} missionPostId={selectedMissionPostId}>
            </ViewPostModal>
        )}

        <GroupInfoWrapper>
        {/* <GroupBackgroundImg></GroupBackgroundImg> */}
        <GroupName style={{"position":"absolute", "top":"0","left":"0"}}>
        <Link to="/main"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
</svg></Link>
    그룹 이름
    </GroupName>
    <div style={{"display":"flex", "justifyContent":"center", "alignItems":"center", "gap":"40px"}}>
        <GroupImgContainer src=""></GroupImgContainer>

        <GroupInfoBox>
            <Challenge className="title">챌린지 이름</Challenge>
            <Challenge className="description">챌린지 설명</Challenge>
            <ChallengeRuleUL>
                <ChallengeRuleLI>규칙1</ChallengeRuleLI>
                <ChallengeRuleLI>규칙2</ChallengeRuleLI>
                
            </ChallengeRuleUL>
            {/* https://nohack.tistory.com/123 해시태그 스크롤 구현 */}
            <Hashtag>해시태그1</Hashtag>
        </GroupInfoBox>
    </div>
    </GroupInfoWrapper>
    
    
    <ProveWrapper>
        <ProveSelectBtn type="button" className="all" onClick={()=>{setFilterType("all")}}>전체 인증</ProveSelectBtn>
        <ProveSelectBtn type="button" className="my" onClick={()=>{setFilterType("my")}}>내 인증</ProveSelectBtn>
            <ProvePage>
                {/* {missionPosts && missionPosts.map((item:any) => (
                    <ProveBox key={item.missionPostId} missionPost={item} onClickToggleViewPostModal={()=>onClickToggleViewPostModal(item.missionPostId)}></ProveBox>
                ))} */}

              {dummyDatas.map((item) => (
                    <ProveBox key={item.missionPostId} missionPost={item} onClickToggleViewPostModal={()=>onClickToggleViewPostModal(item.missionPostId)}></ProveBox>
                ))}


            </ProvePage>
    </ProveWrapper>

    </Wrapper>
    );
}