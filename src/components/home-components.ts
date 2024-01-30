import styled from "styled-components";

export const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction : column;
    align-items : center;
    justify-content: center;
    width : 420px;
    padding: 50px 0px;
`;

export const Title = styled.h1`
    font-size : 60px;
    margin-bottom: 30px;
    color: #3081D0;
    font-weight: 700;
`;

export const Subtitle = styled.h3`
    font-size: 20px;
    color: #a6a6a6;
    margin-bottom: 50%;
`;

export const Btn = styled.button`
    border-radius : 50px;
    width: 60%;
    height: 8%;
    font-size: 25px;
    border: 1px solid #F0F0F0;
    background-color: #3081D0;
    color: white;
    cursor: pointer;
`;