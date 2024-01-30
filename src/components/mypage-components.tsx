import styled from "styled-components";
import { palette } from "../assets/styles/palette";

export const Wrapper = styled.div`
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const Container = styled.div`
    width: 100%;
    min-height: 40%;
    display: flex;
    flex-direction: column;

    &.editInfo {
        display: flex;
        flex-direction: row;
    }
`;

export const Title = styled.h1`
    font-weight: bold;
    font-size: 18pt;
    color: ${palette.jarameGrey};
    margin-bottom: 20px;
`;