import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Coding from '../assets/images/coding.jpg';
import Turtle from '../assets/images/turtle.png';
import Yoga from '../assets/images/yoga.jpg';
import Book from '../assets/images/book.jpeg';

interface JarausContentProps {
  className?: string;
}

interface Mission {
  dailyMissionResult: boolean;
  jaraUsName: string;
  missionName: string;
}

const JarausContent: React.FC<JarausContentProps> = ({ className }) => {
  const [missionData, setMissionData] = useState<Mission[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        const response = await axios.get('/api/dailyMission/get');
        if (response.data.calendarMissionHistoryDTOs !== undefined) {
          setMissionData(response.data.calendarMissionHistoryDTOs);
        } else {
          setMissionData([
            { dailyMissionResult: true, jaraUsName: 'C를 씹어먹자', missionName: '1일 1백준' },
            { dailyMissionResult: false, jaraUsName: '거북목 탈퇴 클럽', missionName: '10분 스트레칭' },
            { dailyMissionResult: true, jaraUsName: '하루 요가', missionName: '간단한 요가 챌린지' },
            { dailyMissionResult: true, jaraUsName: '마음의 양식', missionName: '현대인의 독서 습관 기르기' },
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMissionData();
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const scrollAmount = direction === 'left' ? -containerWidth : containerWidth;
      containerRef.current.scrollLeft += scrollAmount;
      if (containerRef.current?.scrollWidth !== undefined) {
        setScrollPosition(containerRef.current.scrollLeft);
      }
    }
  };

  const renderMissions = () => {
    return missionData.map((mission, index) => {
      let backgroundImage: string;
      
      // 각 mission에 따라 다른 이미지를 설정
      switch (mission.missionName) {
        case '1일 1백준':
          backgroundImage = Coding;
          break;
        case '10분 스트레칭':
          backgroundImage = Turtle;
          break;
        // 다른 mission에 대한 이미지도 추가할 수 있음
        case '간단한 요가 챌린지':
          backgroundImage = Yoga;
          break;
        case '현대인의 독서 습관 기르기':
          backgroundImage = Book;
          break;
      }

      return (
        <div key={index} className='recommend' style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover'}}>
          <div className='recommend-name'>{mission.jaraUsName}</div>
          <div className='recommend-explain'>{mission.missionName}</div>
        </div>
      );
    });
  };

  return (
    <Jaraus>
      <div className='recommend-container' ref={containerRef}>
        {renderMissions()}
      </div>
      <LeftButton
        onClick={() => handleScroll('left')}
        style={{ color: scrollPosition > 0 ? 'black' : 'grey' }}
      >
        &lt;
      </LeftButton>
      <RightButton
        onClick={() => handleScroll('right')}
        style={{ color: (containerRef.current?.scrollWidth || 0) > (containerRef.current?.clientWidth || 0) ? 'black' : 'grey' }}
      >
        &gt;
      </RightButton>
      
    </Jaraus>
  );
}

const Jaraus = styled.div`
  box-shadow: 5px 0 10px rgba(0, 0, 0, 0.1), -5px 0 10px rgba(0, 0, 0, 0.1);
  width: 1285px;
  height: 280px;
  position: absolute;
  top: 170px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  overflow: hidden; /* Hide the overflowing content */
  position: relative;

  .recommend-container {
    max-width: 1150px;
    height: 220px;
    margin-left: 60px;
    margin-top: 40px;
    display: flex; /* Flex container instead of grid */
    overflow: hidden; /* Hide overflowing content */
    scroll-behavior: smooth; /* Smooth scrolling animation */
  }

  .recommend {
    width: 300px;
    height: 200px;
    margin-left: 20px;
    margin-right: 20px;
    border-radius: 10px;
    background-color: lightgrey;
    flex-shrink: 0; /* Prevent shrinking of the .recommend elements */
  }

  .recommend-name,
  .recommend-explain {
    width: 200px;
    height: 40px;
    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: 10px;
    border-radius: 15px;
    background-color: rgb(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
  }
  
  .recommend-container::-webkit-scrollbar {
    height: 5px;
  }

  .recommend-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .recommend-container::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }
`;

const LeftButton = styled.div`
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 37px;
`;

const RightButton = styled.div`
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 37px;
`;

export default JarausContent;
