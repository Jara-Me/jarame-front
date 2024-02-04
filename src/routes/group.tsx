
import { Challenge, ChallengeRuleLI, ChallengeRuleUL, GroupInfoWrapper, GroupInfoBox, GroupName, Hashtag, ProveSelectBtn, ProveWrapper, Wrapper, ProveBox, ProvePage, GroupBackgroundImg, GroupImgContainer} from "../components/group-components"
import { Link } from "react-router-dom";
import PostBtn from "../components/post-btn";
import { useCallback, useEffect, useState } from "react";
import PostModal from "../components/post-modal";
import ViewPostModal from "../components/view-post-modal";
import puppyProfile from "../assets/images/puppyProfile.jpg";
import catProfile from "../assets/images/catProfile.jpg";


export default function Group() {

    const dummyDatas = Array.from({ length: 5 }, (_, index) => ({
        nickname: `User${index + 1}`,
        date: new Date().toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }),
        title: `Sample Title ${index + 1}`,
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        profile: puppyProfile,
        images: [catProfile]
      }));
    
    const [isOpenPostModal, setOpenPostModal] = useState<boolean>(false);
    const [isOpenViewPostModal, setOpenViewPostModal] = useState<boolean>(false);
    
    const onClickToggleModal = useCallback(() => {
        setOpenPostModal(!isOpenPostModal);
    }, [isOpenPostModal]);

    const onClickToggleViewPostModal = useCallback(() => {
        setOpenViewPostModal(!isOpenViewPostModal);
    }, [isOpenViewPostModal]);

    return (<Wrapper>
        <PostBtn onClick={onClickToggleModal}></PostBtn>

        {isOpenPostModal && (
            <PostModal onClickToggleModal={onClickToggleModal}></PostModal>
        )}

        {isOpenViewPostModal && (
            <ViewPostModal onClickToggleModal = {onClickToggleViewPostModal}>
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
            <Hashtag>해시태그2</Hashtag>
            <Hashtag>해시태그3</Hashtag>
        </GroupInfoBox>
    </div>
    </GroupInfoWrapper>
    
    
    <ProveWrapper>
        <ProveSelectBtn type="button" className="all">전체 인증</ProveSelectBtn>
        <ProveSelectBtn type="button" className="my">내 인증</ProveSelectBtn>
            <ProvePage>
                {dummyDatas.map((item, index) => (
                    <ProveBox key={index} user={item} onClickToggleViewPostModal={onClickToggleViewPostModal}></ProveBox>
                ))}
            </ProvePage>
    </ProveWrapper>

    </Wrapper>
    );
}