import styled from "styled-components";
import { Title, Wrapper } from "../components/mypage-components";
import puppyProfile from "../assets/images/puppyProfile.jpg";
import catProfile from "../assets/images/catProfile.jpg";
import defaultImage from "../assets/images/defaultImage.jpg";
import Dropdown from "../components/dropdown";
import ViewPostModal from "../components/view-post-modal";
import { useCallback, useState } from "react";

const Container = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

interface ItemProps {
    src: string;
    onClick: () => void;
}

const Item = styled.img`
    width: 100%;
    object-fit: cover;
    cursor: pointer;
`;

const ItemImg : React.FC<ItemProps> = ({src, onClick}) => (
    <Item src={src} onClick={onClick}></Item>
);

const ItemContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0px;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
`;


export default function MyActivites() {

    const items = [ puppyProfile, catProfile, defaultImage, puppyProfile, catProfile, defaultImage, puppyProfile, catProfile, defaultImage, puppyProfile, catProfile, defaultImage];
    const [isOpenViewPostModal, setOpenViewPostModal] = useState<boolean>(false);

    const onClickToggleViewPostModal  = useCallback(() => {
        setOpenViewPostModal(!isOpenViewPostModal);
    }, [isOpenViewPostModal]);


    
    return (
        <>
        {isOpenViewPostModal && (
        <ViewPostModal onClickToggleModal = {onClickToggleViewPostModal}>
        </ViewPostModal>
    )}

        <Wrapper>
            <Title>참여 히스토리</Title>
            <Container className="history">
            <Dropdown></Dropdown>
            <ItemContainer>
            {items.map((item, index) => (
              <ItemImg key={index} src={item} onClick={onClickToggleViewPostModal}></ItemImg>
            ))}
            </ItemContainer>
            </Container>
        </Wrapper>
        </>
    );
};