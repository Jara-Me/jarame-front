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

export const InputWrapper = styled.div`
    margin: 5px 0;
    padding: 10px 20px;
    border-radius : 50px;
    border: 1px solid #F0F0F0;
    display: flex;
    justify-content: space-between;
    width: 100%;

`;

export const Input = styled.input`
    font-size: 16px;
    width: 70%;
    border: none;

    &[type="submit"] {
        margin: 5px 0;
        padding: 10px 20px;
        border-radius : 50px;
        width: 100%;
        margin-top: 30px;
        background-color: #3081D0;
        color: white;
        cursor : pointer;
        &:hover {
            opacity: 0.8;
        }
    }
`;

export const Textarea = styled.textarea`
    font-size: 16px;
    width: 100%;
    border: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;`;

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
        color: #757575;
        font-size: 16px;
        width: 100%;
    }

    input[type=radio]: checked + label {
        background: #757575;
        color: white;
    }
`;

export const OkMsg = styled.div`
    font-weight: 600;
    color: green;

    &.bottom{
        margin-bottom: 30px;
    }

    &.middle {
        margin: 10px 0;
        text-align: right;
    }
`;

export const Error = styled.div`
    font-weight: 600;
    color: red;
    
    &.bottom{
        margin-bottom: 30px;
    }

    &.middle {
        margin: 10px 0;
        text-align: right;
    }
`;

export const Switcher = styled.span`

    .to-create-account{
        margin-top: 20px;
    }
    
    a {
        color: #3081D0;
        font-weight: 600;
        text-decoration: none;
    }
`;

