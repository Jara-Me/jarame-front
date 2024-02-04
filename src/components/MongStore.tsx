import React, { useState } from 'react';
import styled from 'styled-components';

interface MongStoreProps {
    isOpen?: boolean;
    onStoreClick: () => void; // 이 부분을 명시적으로 추가
    characterRef: React.RefObject<HTMLElement>; // characterRef 타입을 명시적으로 추가
}
const MongStore: React.FC<MongStoreProps> = ({ isOpen, onStoreClick, characterRef }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(isOpen);
  console.log(characterRef);
  const handleButtonClick = () => {
    onStoreClick();
    setIsMenuOpen((prev) => !prev);
  };

  const storeItems = [
    { id: 1, image: 'image1.jpg', text: 'price 1' },
    { id: 2, image: 'image2.jpg', text: 'price 2' },
    { id: 3, image: 'image2.jpg', text: 'price 2' },
    { id: 4, image: 'image2.jpg', text: 'price 2' },
    { id: 5, image: 'image2.jpg', text: 'price 2' },
    { id: 6, image: 'image2.jpg', text: 'price 2' },
    { id: 7, image: 'image2.jpg', text: 'price 2' },
    { id: 8, image: 'image2.jpg', text: 'price 2' },
    { id: 9, image: 'image2.jpg', text: 'price 2' },
    { id: 1, image: 'image1.jpg', text: 'price 1' },
    { id: 2, image: 'image2.jpg', text: 'price 2' },
    { id: 3, image: 'image2.jpg', text: 'price 2' },
    { id: 4, image: 'image2.jpg', text: 'price 2' },
    { id: 5, image: 'image2.jpg', text: 'price 2' },
    { id: 6, image: 'image2.jpg', text: 'price 2' },
    { id: 7, image: 'image2.jpg', text: 'price 2' },
    { id: 8, image: 'image2.jpg', text: 'price 2' },
    { id: 9, image: 'image2.jpg', text: 'price 2' },
    // Add more items as needed
  ];

  let point = 0;

  return (
    <Wrapper isOpen={isMenuOpen}>
      <Button onClick={handleButtonClick} isOpen={isMenuOpen}>
      {isMenuOpen? '>':'<'}
      </Button>
      <div className='store-button' onClick={handleButtonClick}>
        스토어
      </div>

      <div className='point-button'>{point} POINT</div>
      <Mongs isOpen={isMenuOpen}>
      <div className='ticket-info'>
      <div className='my-ticket'>내 패스권</div>
      </div> 
      <div className='mong-store'>   
      <div className='item-container'>
          {storeItems.map((item) => (
            <StoreItem key={item.id}>
              <img src={item.image} alt={`Item ${item.id}`} />
              <p>{item.text}</p>
            </StoreItem>
          ))}
      </div>    
      </div>
      </Mongs>
    </Wrapper>
    
  );
}
interface WrapperProps {
  isOpen?: boolean;
}
const Wrapper = styled.div<WrapperProps>`
  position: relative;

  .store-button {
    position: absolute;
    top: 30px;
    left: 50px;
    width: 150px;
    height: 50px;
    border-radius: 30px;
    background-color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 23px;
  }
  .store-button:hover{
    background-color: lightgrey;
  }
  .point-button {
    position: absolute;
    top: 30px;
    left: ${({ isOpen }) => (isOpen ? '900px' : '1400px')};
    transition: left 0.3s ease-in-out;
    width: 150px;
    height: 50px;
    border-radius: 30px;
    background-color: #f9e100;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 23px;
  }
`;
interface ButtonProps {
  isOpen: boolean;
}
const Button = styled.button<ButtonProps>`
  background-color: grey;
  width: 40px;
  height: 175px;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  position: fixed;
  margin-top: 300px;
  right: ${({ isOpen }) => (isOpen ? '500px' : '0px')};
  color: #fff;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  transition: right 0.3s ease-in-out;
  }
`;
interface MongProps {
  isOpen: boolean;
}
const Mongs = styled.div<MongProps>`
    position: fixed;
    right: ${({ isOpen }) => (isOpen ? '0' : '-550px')};
    transition: right 0.3s ease-in-out;
    width: 500px;
    height: 800px;
    background-color: rgb(0, 0, 0, 0.3);
  
  .ticket-info{
    width: 600px;
    height: 70px;
  }
  .my-ticket{
    width: 180px;
    height: 50px;
    background-color: white;
    border-radius: 80px;
    margin-left: 15px;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
  }
  .mong-store {
    width: 470px;
    height: 700px;
    text-align: center;
    background-color: white;
    cursor: pointer;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    border-radius: 15px;
  }
  .item-container{
    width: 470px;
    max-height: 700px;
    overflow: auto;
    border-radius: 15px;
    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: black;
      border-radius: 4px;
    }
  }
  
  
`;

const StoreItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  padding: 10px;

  img {
    max-width: 100%;
    height: auto;
    margin-bottom: 10px;
  }
`;

export default MongStore;