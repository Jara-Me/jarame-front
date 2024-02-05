
import { Challenge, ChallengeRuleLI, ChallengeRuleUL, GroupInfoWrapper, GroupInfoBox, GroupName, Hashtag, ProveSelectBtn, ProveWrapper, Wrapper, ProveBox, ProvePage, GroupBackgroundImg, GroupImgContainer} from "../components/group-components"
import { Link, useNavigate } from "react-router-dom";
import PostBtn from "../components/post-btn";
import { useCallback, useEffect, useState } from "react";
import PostModal from "../components/post-modal";
import ViewPostModal from "../components/view-post-modal";
import puppyProfile from "../assets/images/puppyProfile.jpg";
import catProfile from "../assets/images/catProfile.jpg";
import defaultProfile from "../assets/images/defaultProfile.jpg";
import axios from "axios";
import Button from "../components/button";
import programmingImg from "../assets/images/programming.jpg";


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



export default function Group(jarausId:number) {

    const dummyDatas = [
        {
        "missionPostId": 1,
        "jaraUsId": 44,
        "postDateTime": "2024년 2월 5일",
        "display": true,
        "anonymous": false,
        "textTitle": "리액트 3주차",
        "textContent": "리액트를 공부하면서 상태 관리와 라우팅에 대한 내용을 집중적으로 학습 중입니다. useState와 useEffect의 활용법을 익히는 중이며, 컴포넌트 간의 데이터 전달도 실습 중입니다.",
        "imageContent": "이미지파일주소3",
        "userProfileImage": puppyProfile
        },
        {
        "missionPostId": 2,
        "jaraUsId": 44,
        "postDateTime": "2024년 2월 5일",
        "display": true,
        "anonymous": false,
        "textTitle": "스프링부트 개발 시작",
        "textContent": "스프링부트를 활용한 백엔드 개발을 시작했습니다. RESTful API 설계와 데이터베이스 연동에 대한 기초를 다지고 있습니다. Spring Security를 이용한 보안 처리도 학습 중입니다.",
        "imageContent": "",
        "userProfileImage": catProfile
        },
        {
        "missionPostId": 3,
        "jaraUsId": 44,
        "postDateTime": "2024년 2월 5일",
        "display": true,
        "anonymous": false,
        "textTitle": "선형대수학 챕터 3",
        "textContent": "대학에서 공부 중인 선형대수학의 세 번째 챕터를 공부했습니다. 행렬과 벡터 연산에 대한 이해를 높이고, 선형변환과 특이값 분해에 대한 이론을 숙지하고 있습니다.",
        "imageContent": "이미지파일주소4",
        "userProfileImage": defaultProfile
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
    }, [jarausId, filterType]);
    
    const [isOpenPostModal, setOpenPostModal] = useState<boolean>(false);
    const [isOpenViewPostModal, setOpenViewPostModal] = useState<boolean>(false);
    
    const onClickToggleModal = useCallback(() => {
        setOpenPostModal(true);
    }, [isOpenPostModal]);

    const onClosePostModal = () => {
        setOpenPostModal(false);
    };


    const [jarausInfo, setJarausInfo] = useState<JaraUs>();

    const getJarausInfo = async() => {

        try {
            
            const response = await axios.get(`/api/jaraus/information?jaraUsId=${jarausId}`);

            if(response.status === 200) {
                setJarausInfo(response.data);
            } else {
                console.log(response.statusText);
            }
            
        } catch (error) {
            console.error("Error get Jaraus Info", error);
        }
    };

    useEffect(()=> {
        if(jarausId !== null) {
            getJarausInfo();
        }
    },[jarausId]);

    const [userId, setUserId] = useState<number|undefined>();
    const [isAdminUser, setIsAdminUser] = useState<boolean>(true);

    const getUserInfo = async() => {
        try {
            const response = await axios.get("/api/profile");

            if(response.status === 200) {
                setUserId(response.data.userId);

                if(jarausInfo && jarausInfo.adminUserId === userId) {
                    setIsAdminUser(true);
                }
                
            } else {
                console.error("Error get User Info")
            }
        } catch (error) {
            console.error("Error get User Info", error);
        }
    }

    useEffect (() => {
        if(jarausId !== null) {
            getUserInfo();
        }
    }, [jarausId]);


    const [selectedMissionPostId, setSelectedMissionPostId] = useState<number>();

    // const onClickToggleViewPostModal = useCallback(() => {
    //     setOpenViewPostModal(!isOpenViewPostModal);
    // }, [isOpenViewPostModal]);



    const onClickToggleViewPostModal = (missionPostId:number) => {
        setSelectedMissionPostId(missionPostId);
        setOpenViewPostModal(true);
    };
    

    const onCloseViewPostModal = () => {
        setOpenViewPostModal(false);
        setSelectedMissionPostId(undefined);
    };

    const navigate = useNavigate();

    const handleWithdrawJaraus = async() => {

        const ok = confirm("정말 탈퇴하시겠습니까?");

        if(!ok) return;

        try {
            const request = {
                jaraUsId : jarausId
            };

            const response = await axios.post("/api/jaraus/withdraw", request);
            
            if(response.status === 200) {
                alert("탈퇴되었습니다");
                navigate("/main");
            } else {
                alert("탈퇴에 실패했습니다");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (<Wrapper>
        <PostBtn onClick={onClickToggleModal}></PostBtn>

        {isOpenPostModal && (
            <PostModal onClose = {onClosePostModal}></PostModal>
        )}

        {isOpenViewPostModal && selectedMissionPostId && (
            <ViewPostModal onClose = {onCloseViewPostModal} missionPostId={selectedMissionPostId}>
            </ViewPostModal>
        )}

        {jarausInfo && <GroupInfoWrapper>
        {/* <GroupBackgroundImg></GroupBackgroundImg> */}
        <GroupName style={{"position":"absolute", "top":"0","left":"0"}}>
        <Link to="/main"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
</svg></Link>
    {jarausInfo.jaraUsName} 
    </GroupName>

    {/* {isAdminUser && (
                 <div style={{"display":"flex","justifyContent":"flex-end","position":"absolute","top":0,"right":0,"marginTop":"20px"}}><Button type="button" className="editAdmin" $buttonColor="jarameBlue" $width="200px" style={{}}>관리자 위임</Button></div>

        )} */}

    <div style={{"display":"flex","justifyContent":"flex-end","position":"absolute","top":0,"right":0,"marginTop":"20px"}}><Button type="button" onClick={() => handleWithdrawJaraus()} className="editAdmin" $buttonColor="jarameBlue" $width="200px">자라어스 탈퇴</Button></div>

    <div style={{"display":"flex", "justifyContent":"center", "alignItems":"center", "gap":"40px"}}>
        <GroupImgContainer src={jarausInfo.jaraUsProfileImage}></GroupImgContainer>

        <GroupInfoBox>
            <Challenge className="title">{jarausInfo.missionName}</Challenge>
            <Challenge className="description">{jarausInfo.explanation && jarausInfo.explanation}</Challenge>
            <ChallengeRuleUL>
                <ChallengeRuleLI>{jarausInfo.rule && (
                    <div dangerouslySetInnerHTML={{__html:jarausInfo.rule}}/>
                )}</ChallengeRuleLI>
                

            </ChallengeRuleUL>
            
            {/* https://nohack.tistory.com/123 해시태그 스크롤 구현 */}
            <Hashtag>
                {jarausInfo.interest === "study" && "공부"}
                {jarausInfo.interest === "hobby" && "취미"}
                {jarausInfo.interest === "health" && "건강"}
            </Hashtag>

        </GroupInfoBox>

    </div>

    </GroupInfoWrapper>}
    
    
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