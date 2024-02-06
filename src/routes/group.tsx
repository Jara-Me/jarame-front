
import { Challenge, ChallengeRuleLI, ChallengeRuleUL, GroupInfoWrapper, GroupInfoBox, GroupName, Hashtag, ProveSelectBtn, ProveWrapper, Wrapper, ProveBox, ProvePage, GroupImgContainer} from "../components/group-components"
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
        "textTitle": "백준 1966 프린터 큐",
        "textContent": `
            #define _CRT_SECURE_NO_WARNINGS<br>
            #include <iostream><br>
            #include <queue><br>
            
            using namespace std;<br>
            
            int main()
            {
                int testn;
                int n, m;
                int importance;
                int count;
            
                scanf("%d", &testn);
        `,
        "imageContent": "이미지파일주소3",
        "userProfileImage": puppyProfile
        },
        {
        "missionPostId": 2,
        "jaraUsId": 44,
        "postDateTime": "2024년 2월 5일",
        "display": true,
        "anonymous": false,
        "textTitle": "백준 2164 카드 2 인증!",
        "textContent": `
        ... 선언부 생략 ...<br>
        int main()<br>
        {<br>
            int n;<br>
            long long value = 1; <br>
        `,
        "imageContent": "",
        "userProfileImage": catProfile
        },
        {
        "missionPostId": 3,
        "jaraUsId": 44,
        "postDateTime": "2024년 2월 5일",
        "display": true,
        "anonymous": false,
        "textTitle": "1158 요세푸스 문제 ㅜㅜ",
        "textContent": `
        int main()<br>
        {<br>
            int n, k;<br>
            int count = 0;<br>
            queue<int> q;
            vector<int> vec;
            scanf("%d %d", &n, &k);

            for (int i = 1; i < n + 1; i++) {
                q.push(i);
            }
    `,
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
                    //console.log("mission posts", missionPosts);
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

    useEffect(()=> {
        const fetchJarausInfo = async() => {
            try {

                const response = await axios.get(`/api/jaraus/information?jaraUsId=${jarausId}`);

                if(response.status === 200) {
                    setJarausInfo(response.data);
                }                     
                    setJarausInfo({
                        adminUserId: 1,
                        jaraUsId: 101,
                        jaraUsName: "C를 씹어먹자",
                        missionName: "1일 1백준",
                        explanation: "코딩 챌린지에 참여하여 프로그래밍 스킬을 향상시키는 챌린지",
                        rule: "코딩 윤리 준수, 다른 사람과 솔루션 공유, 인터넷 서치 금지",
                        jaraUsProfileImage: programmingImg,
                        maxMember: 15,
                        display: "public",
                        startDate: "2024-02-10",
                        endDate: "2024-03-10",
                        interest: "study",
                        recurrence: ["MONDAY", "WEDNESDAY"]
                    });

                    console.log(jarausInfo)
                
                
            } catch (error) {
                console.error("Error get Jaraus Info", error);
            }
        };

        fetchJarausInfo();
    },[]);

    // const [userId, setUserId] = useState<number|undefined>();
    const [userId, setUserId] = useState<number>(1);
    const [isAdminUser, setIsAdminUser] = useState<boolean>(true);

    /*
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
    */


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
                "jaraUsId" : jarausId
            };

            const response = await axios.post(`/api/jaraus/withdraw?userId=${userId}`, request);
            
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
            <PostModal onClose = {onClosePostModal} jaraUsId={jarausId}></PostModal>
        )}

        {isOpenViewPostModal && selectedMissionPostId && (
            <ViewPostModal onClose = {onCloseViewPostModal} missionPostId={selectedMissionPostId} jaraUsId={jarausId}>
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