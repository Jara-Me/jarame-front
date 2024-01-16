
import { Challenge, ChallengeRuleLI, ChallengeRuleUL, GroupInfoWrapper, GroupInfoBox, GroupName, Hashtag, ProveSelectBtn, ProveWrapper, Wrapper, ProveBox, ProvePostBox, ProvePage, ProveUserProfile, GroupBackgroundImg } from "../components/group-components"
import { Link } from "react-router-dom";
import PostBtn from "../components/post-btn";
import { useCallback, useState } from "react";
import PostModal from "../components/post-modal";
import ViewPostModal from "../components/view-post-modal";


export default function Group() {

        
    const [isOpenPostModal, setOpenPostModal] = useState<boolean>(false);
    const [isOpenViewPostModal, setOpenViewPostModal] = useState<boolean>(false);
    
    const onClickToggleModal = useCallback(() => {
        setOpenPostModal(!isOpenPostModal);
    }, [isOpenPostModal]);

    const onClickToggleViewPostModal = useCallback(() => {
        setOpenViewPostModal(!isOpenViewPostModal);
    }, [isOpenViewPostModal]);


    const onSubmitPost = () => {
        setOpenPostModal(false);
    };


    const ShowProvePage = (e : React.MouseEvent<HTMLButtonElement>) => {

        if (e.currentTarget.className === "all") {

        }
    };

    return (<Wrapper>
        <PostBtn onClick={onClickToggleModal}></PostBtn>

        {isOpenPostModal && (
            <PostModal onClickToggleModal={onClickToggleModal} onSubmitPost={onSubmitPost}></PostModal>
        )}

        {isOpenViewPostModal && (
            <ViewPostModal onClickToggleModal = {onClickToggleViewPostModal}>
            </ViewPostModal>
        )}

        <GroupInfoWrapper>
        <GroupBackgroundImg></GroupBackgroundImg>
        <GroupName>
        {/* 대시보드 페이지 이동으로 수정 */}
        <Link to="/"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
</svg></Link>
    그룹 이름
    </GroupName>
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
    </GroupInfoWrapper>
    
    <ProveWrapper>
        <ProveSelectBtn type="button" onClick={ShowProvePage} className="all">전체 인증</ProveSelectBtn>
        <ProveSelectBtn type="button" className="my">내 인증</ProveSelectBtn>
            <ProvePage>
                <ProveBox>
                    <ProvePostBox onClick={onClickToggleViewPostModal}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg></span>
                    </ProvePostBox>
                </ProveBox>      
            </ProvePage>
    </ProveWrapper>

    </Wrapper>
    );
}