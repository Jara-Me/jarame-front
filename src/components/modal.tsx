import { PropsWithChildren } from "react";
import styled from "styled-components";

// https://jeewonscript.tistory.com/25

interface ModalDefaultType {
    onClickToggleModal: () => void;
    dialogClassName: string;
}

function Modal( {
    onClickToggleModal,
    dialogClassName,
    children,
}: PropsWithChildren<ModalDefaultType>) {
    return (
        <ModalContainer>
            <DialogBox className={dialogClassName}>{children}</DialogBox>
            <Backdrop onClick={(e:React.MouseEvent) => {
                e.preventDefault();

                if(onClickToggleModal) {
                    onClickToggleModal();
                }
            }}/>
        </ModalContainer>
    );
}

export const ModalTitle = styled.h1`
    font-size: 20px;
    font-weight: 550;
    text-align: center;
    margin: 0 auto;
    margin-top: 10px;
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
`;

const DialogBox = styled.dialog`
  width: 90%;
  height: 90%;
  border: none;
  border-radius: 40px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
  overflow: hidden;

  &.post{
  display: block;
  }

  &.viewPost{
    display: flex;
  }
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default Modal;