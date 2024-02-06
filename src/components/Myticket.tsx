import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Ticket1 from '../assets/images/ticket1.png';
import Ticket2 from '../assets/images/ticket2.png';
import axios from 'axios';

const MyTicket: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const storeItems = [
    { id: 1, image: Ticket1, text: '패스권' },
    { id: 2, image: Ticket1, text: '패스권' },
    { id: 3, image: Ticket1, text: '패스권' },
    { id: 4, image: Ticket1, text: '패스권' },
    { id: 5, image: Ticket2, text: '패스권' },
    { id: 6, image: Ticket2, text: '패스권' },
    { id: 7, image: Ticket2, text: '패스권' }
    // Add more items as needed
  ];

  const [undoneDate, setUndoneDate] = useState<String[]>([]);
  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await axios.get('/api/passTicket/get');
        if (response.data.undoneDate !== undefined) {
          setUndoneDate(response.data.undoneDate);
        } else {
          setUndoneDate(['2024-01-14', '2024-01-29', '2024-02-01']);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTicketData();
  }, []);

  const [isSelectOpen, setSelectOpen] = useState(false);
  const toggleSelectDate = () => {
    setSelectOpen((prev) => !prev);
  }
  const handleMouseEnter = () => {
    setSelectOpen(true);
  };

  const handleMouseLeave = () => {
    setSelectOpen(false);
  };
  const selectingDate = () => {
    return(
        <div className={`date-container ${isSelectOpen ? 'visible' : ''}`} onMouseLeave={handleMouseLeave}>
        {undoneDate.map((date, index) => (
                <div key={index} className='data'>
                    {date}
                </div>
            ))}
        </div>
    );
  };

  return (
    <Wrapper>
      <div className='mong-store'>
        <div className='ticket-container'>
          {storeItems.map((item) => (
            <StoreItem
              key={item.id}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {hoveredItem === item.id && (
                <HoveredOverlay onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <button onClick={toggleSelectDate} onMouseOut={toggleSelectDate}>사용하기</button>
                        {/* {isSelectOpen && selectingDate()} */}
                </HoveredOverlay>
              )}
              <img src={item.image} alt={`Ticket ${item.id}`} />
              <p>{item.text}</p>
            </StoreItem>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 85px;
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
  .ticket-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1px;

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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  height: 200px;

  img {
    max-width: 100%;
    height: 70%;
    margin-bottom: 10px;
  }
  p{
    font-weight: bold;
  }
`;

const HoveredOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  button{
    width: 130px;
    height: 60px;
    border-radius: 15px;
    border-style: none;
    background-color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  button:hover{
    background-color: lightgrey;
    color: white;
  }
  // .date-container{
  //   position: fixed;
  //   top: 100px;
  //   right: 90px;
  //   width: 300px;
  //   height: 500px;
  //   background-color: yellow;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   overflow-y:auto;
  // }
`;

export default MyTicket;
