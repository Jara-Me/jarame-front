import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MyTicket from './Myticket';
import Ticket1 from '../assets/images/ticket1.png';
import Ticket2 from '../assets/images/ticket2.png';

interface MongStoreProps {
    isOpen?: boolean;
    onStoreClick: () => void; // 이 부분을 명시적으로 추가
    characterRef: React.RefObject<HTMLElement>; // characterRef 타입을 명시적으로 추가
}
const MongStore: React.FC<MongStoreProps> = ({ isOpen, onStoreClick, characterRef }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleButtonClick = () => {
    onStoreClick();
    setIsMenuOpen((prev) => !prev);
  };

  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const handleTicketClick = () => {
    setIsTicketOpen((prev) => !prev);
  };

  const storeItems = [
    { id: 1, image: Ticket1, text: '100 POINT', ticket: '하나 패스권' },
    { id: 2, image: Ticket2, text: '300 POINT', ticket: '종일 패스권'},
    // Add more items as needed
  ];

  let point = 0;
  const [mytickets, setmytickets] = useState('0');
  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await axios.get('/api/passTicket/get');
        if (response.data.passTicket !== undefined) {
          setmytickets(response.data.passTicket);
        } else {
          setmytickets('7');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTicketData();
  }, []);

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
      <div className='my-ticket' onClick={handleTicketClick}>내 패스권 {mytickets}개</div>
      </div> 
      
      <div className='mong-store'> 
      {isTicketOpen? <MyTicket />: <div className='item-container'>
          {storeItems.map((item) => (
            <StoreItem key={item.id}>
              <div className='all-container'>
              <img src={item.image} alt={`Item ${item.id}`} />
              <div className='container'>
                <div className='ticket-name'>{item.ticket}</div>
                <div className='ticket-price'>{item.text}</div>
                <button>구매하기</button>
              </div>
              </div>
            </StoreItem>
          ))}
      </div>   }  
       
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
    cursor: pointer;
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
  border-bottom: 1px solid grey;
  width: 100%;
  height: 200px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;

  img {
    max-width: 40%;
    height: auto;
    margin-left: -250px;
    margin-bottom: 10px;
  }
  .container{
    margin-top: 50px;
  }
  .ticket-name{
    width: 100px;
    margin-top: -200px;
    margin-left: 260px;
  }
  .ticket-price{
    width: 100px;

    margin-left: 260px;
  }
  button{
    width: 100px;
    margin-top: 50px;
    margin-left: 170px;
    background-color: black;
    color: white;
    border-radius: 10px;
    cursor: pointer;
  }
`;

export default MongStore;