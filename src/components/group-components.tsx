import styled from "styled-components";
import { palette } from "../assets/styles/palette";

export const Wrapper = styled.div`
    width: 100%;
    height: 140%;
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
    height: 55%;
    border: 1px solid black;
    background-color: ${palette.jarameYellow};
`;

export const GroupBackgroundImg = styled.div`
    height: 20%;
    background-color: grey;
`;

export const GroupInfoBox = styled.div`
    width: 60%;
    padding: 20px;
    margin: 0 auto;
    position: relative;
    top: 50px;
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
    height: 100%;
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
`;

export const ProveBox = styled.div`
    height: 200px;
    background-color: ${palette.jarameYellow};
`;

export const ProveUserProfile = styled.span`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

export const ProvePostBox = styled.div`
    width: 80%;
    height: 150px;
    background-color: white;
    position: relative;
    top: 30px;
    float: right;
    margin-right: 30px;
    border-radius: 40px;

    svg {
        width: 30px;
        float: right;
        margin-right: 40px;
        margin-top: 20px;
        cursor: pointer;
    }
`;