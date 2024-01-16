import styled from "styled-components";

const StyledButton = styled.button`
    width: 30px;
    height: 10px;
    background-color: white;
    color: black;
    font-size: 10pt;
    bolid: 1px solid #F0F0F0;
    z-index: 1;
    position: absolute;

    &.delete {
        color: red;
    }
`;

const ButtonWrapper = styled.span`
    display: flex;
    flex-direction: column;
`;


function PostEditBtn() {

     return <ButtonWrapper>
     <StyledButton>게시글 보기</StyledButton>
     <StyledButton>게시글 수정</StyledButton>
     <StyledButton className="delete">게시글 삭제</StyledButton>
 </ButtonWrapper>;

}


export default PostEditBtn;
