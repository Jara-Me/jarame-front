import styled from "styled-components";
import { palette } from "../assets/styles/palette";
import React, { Dispatch, PropsWithChildren, useState } from "react";
import defaultGroupImg from "../assets/images/defaultGroupImg.jpg";

export const Wrapper = styled.div`
    width: 100%;
    min-height: 140%;
    height: auto;

`;

export const GroupName = styled.div`
    font-size: 20px;
    height: 70px;
    width: 100%;
    text-align: left;
    padding: 0 10px;
    line-height: 80px;

    svg {
        height: 30px;
        margin-right: 20px;
    }
`;

export const GroupInfoWrapper = styled.div`
    height: 50%;
    border: 1px solid black;
    background-color: ${palette.jarameYellow};
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

`;

export const GroupBackgroundImg = styled.div`
    height: 20%;
    background-color: grey;
`;


interface GroupImgProps {
    src: string;
}

const GroupImg = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;

`;

export function GroupImgContainer({src}:PropsWithChildren<GroupImgProps>) {
    return (
    <GroupImg src={src ? src : defaultGroupImg}></GroupImg>
    );
};

export const GroupInfoBox = styled.div`
    width: 60%;
    padding: 20px;
    position: relative;
    border-radius: 30px;
    background-color: white;
`;

export const Challenge = styled.div`
    &.title {
        font-size: 25px;
    }

    &.description {
        font-size: 17px;
    }
`;

export const Hashtag = styled.span`
    background-color: ${palette.jarameLGreen};
    color: black;
    padding: 8px;
    display: inline;
    margin-right: 10px;
    border-radius: 30px;
    white-space: nowrap;
`;

export const ChallengeRuleUL = styled.ul`
    margin-top: 20px;
    margin-bottom: 30px;
`;

export const ChallengeRuleLI = styled.li`
    margin: 4px 0;
`;

export const ProveWrapper = styled.div`
    width: 100%;
    min-height: 140%;
    height: auto;
    background-color: ${palette.jarameYellow};
`;

export const ProveSelectBtn = styled.button`
    width: 50%;
    height: 50px;
    cursor: pointer;
    color: white;
    font-size: 17px;
    font-weight: 550;
    border: none;
    
    &.all {
        background: ${palette.jarameBlue};
    }

    &.my {
        background: ${palette.jarameGrey};
    }

    &:active {
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
      }
`;

export const ProvePage = styled.div`
    width: 100%;
    height: auto;
`;

interface ProveProfileProps {
    src: string;
}

const ProveProfile = styled.img`
    width: 60px;
    border-radius: 50px;
    object-fit: cover;

`;

export function ProveProfileImg({src}:PropsWithChildren<ProveProfileProps>) {
    return (
    <ProveProfile src={src}></ProveProfile>
    );
};


const StlyedProvePostBox = styled.div`
    width: 80%;
    height: 150px;
    background-color: white;
    position: relative;
    top: 30px;
    float: right;
    margin-right: 30px;
    border-radius: 40px;
    cursor: pointer;
    overflow: hidden;
    
    .elipsis {
        width: 30px;
        float: right;
        margin-right: 40px;
        margin-top: 20px;
        cursor: pointer;
    }

    .title {
        font-size: 14px;
        font-weight: bold;
        margin-top: 20px;
    }

    .content {
        overflow: hidden;
        position: relative;
        line-height: 150%;

        &:before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 50%;
            background: linear-gradient(to top, rgba(255, 255, 255, 0.8), transparent);
        }   
    }

    .image {
        width: 30px;
        display: flex;
    }

    .contentBox {
        display: flex;
        flex-direction: column;
        margin-left: 30px;
        gap: 8px;
    }

`;

export const EditButton = styled.button`
    width: 100px;
    background-color: white;
    cursor: pointer;
    border: 1px solid #F0F0F0;
    font-size: 15px;
    white-space: nowrap;
    position: absolute;
    z-index: 1;
    right: 0;
    margin-top: 20px;

    
    &:active {
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
    }
`;

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

interface ProvePostBoxProps {
    onClickToggleViewPostModal: () => void;
    missionPost: MissionPost;
}

export function ProvePostBox({onClickToggleViewPostModal, missionPost}: PropsWithChildren<ProvePostBoxProps>) {

    const {missionPostId, postDateTime, display, anonymous, textTitle, textContent, imageContent, userProfileImage} = missionPost;

    return (
        <StlyedProvePostBox onClick={() => onClickToggleViewPostModal()}>

            {/* <span className="elipsis" onClick={onClickElipsis}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg></span> */}

            <div className="contentBox">
                <div className="title">{textTitle}</div>

            { imageContent !== "" ? (
            <div className="image">
                <svg viewBox="0 0 20 20">
                                <path fill="grey" d="M6.523,7.683c0.96,0,1.738-0.778,1.738-1.738c0-0.96-0.778-1.738-1.738-1.738c-0.96,0-1.738,0.778-1.738,1.738
                                    C4.785,6.904,5.563,7.683,6.523,7.683z M5.944,5.365h1.159v1.159H5.944V5.365z M18.113,0.729H1.888
                                    c-0.64,0-1.159,0.519-1.159,1.159v16.224c0,0.64,0.519,1.159,1.159,1.159h16.225c0.639,0,1.158-0.52,1.158-1.159V1.889
                                    C19.271,1.249,18.752,0.729,18.113,0.729z M18.113,17.532c0,0.321-0.262,0.58-0.58,0.58H2.467c-0.32,0-0.579-0.259-0.579-0.58
                                    V2.468c0-0.32,0.259-0.579,0.579-0.579h15.066c0.318,0,0.58,0.259,0.58,0.579V17.532z M15.91,7.85l-4.842,5.385l-3.502-2.488
                                    c-0.127-0.127-0.296-0.18-0.463-0.17c-0.167-0.009-0.336,0.043-0.463,0.17l-3.425,4.584c-0.237,0.236-0.237,0.619,0,0.856
                                    c0.236,0.236,0.62,0.236,0.856,0l3.152-4.22l3.491,2.481c0.123,0.123,0.284,0.179,0.446,0.174c0.16,0.005,0.32-0.051,0.443-0.174
                                    l5.162-5.743c0.238-0.236,0.238-0.619,0-0.856C16.529,7.614,16.146,7.614,15.91,7.85z"></path>
                </svg> &nbsp;{1}
            </div> ) : null }

                <div className="content" dangerouslySetInnerHTML={{__html:textContent}}/>
            </div>


        </StlyedProvePostBox>
    );

}

const ProvePostDate = styled.span`
    font-size: 14px;
    float: bottom;
    margin-left: 20px;
    margin-top: 10px;
`;

const StyledProveBox = styled.div`
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;


interface ProveBoxProps {
    onClickToggleViewPostModal: () => void;
    missionPost: MissionPost;
}

export function ProveBox({missionPost, onClickToggleViewPostModal}: PropsWithChildren<ProveBoxProps>) {

    const {missionPostId, postDateTime, userProfileImage} = missionPost;

    console.log(nickname);

    return (
        <StyledProveBox>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ProveProfileImg src={userProfileImage}></ProveProfileImg>
            <ProvePostDate>{postDateTime}</ProvePostDate>
            </div>
            <ProvePostBox missionPost={missionPost} onClickToggleViewPostModal={onClickToggleViewPostModal}></ProvePostBox>
            
        </StyledProveBox>
    );
}

