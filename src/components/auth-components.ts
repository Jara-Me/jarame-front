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
    font-size : 42px;
`;

export const Form = styled.form`
    margin-top : 50px;
    margin-bottom : 10px;
    gap: 10px;
    width: 100%;
`;

export const Input = styled.input`
    margin: 5px 0;
    padding: 10px 20px;
    border-radius : 50px;
    width: 100%;
    font-size: 16px;
    border: 1px solid #F0F0F0;

    &[type="submit"] {
        margin-top: 30px;
        background-color: #3081D0;
        color: white;
        cursor : pointer;
        &:hover {
            opacity: 0.8;
        }
    }
`;

export const RadioContainer = styled.span`
    
    input[type=radio] {
        display:none;
    }

    input[type=radio] + label {
        display: inline-block;
        line-height: 45px;
        margin: 4px;
        text-align: center;
        border: 1px solid #F0F0F0;
        cursor: pointer;
        border-radius : 50px;
        height: 50px;
        width: 31%;
        color: #757575;
        font-size: 16px;
    }

    input[type=radio]: checked + label {
        background: #757575;
        color: white;
    }
`;

export const Error = styled.span`
    font-weight: 600;
    color: tomato;
`;

export const Switcher = styled.span`
    margin-top: 20px;
    a {
        color: #3081D0;
        font-weight: 600;
        text-decoration: none;
    }
`;

