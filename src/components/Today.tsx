import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Coding from '../assets/images/coding.jpg';
import Turtle from '../assets/images/turtle.png';
import Yoga from '../assets/images/yoga.jpg';

interface TodayContentProps {
  className?: string;
}
interface Mission {
  dailyMissionResult: boolean;
  jaraUsName: string;
  missionName: string;
}
const TodayContent: React.FC<TodayContentProps> = ({ className }) => {
  const [missionData, setMissionData] = useState<Mission[]>([]);
  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        const response = await axios.get('/api/dailyMission/get');
        if (response.data.calendarMissionHistoryDTOs!==undefined){
          setMissionData(response.data.calendarMissionHistoryDTOs);
        }else{
          setMissionData([
          { dailyMissionResult: true, jaraUsName: 'C를 씹어먹자', missionName: '1일 1백준' },
          { dailyMissionResult: false, jaraUsName: '거북목 탈퇴 클럽', missionName: '10분 스트레칭' },
          { dailyMissionResult: true, jaraUsName: '하루 요가', missionName: '간단한 요가 챌린지' },
          { dailyMissionResult: true, jaraUsName: '자라어스4 이름', missionName: '자라어스4 미션이름' },
        ]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchMissionData();
  }, []);

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
      }
      return(<div key={index} className={`today-mission`}>
        <div className='today-mission-photo' style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover'}}></div>
        <div className='today-mission-explain'>{mission.jaraUsName}</div>
        <div className='today-mission-submit'>인증 바로가기</div>
        <div className='today-mission-name'>{mission.missionName}</div>
      </div>);
      
  });
  };
  return (
    <>
      {/* {isOpenPostModal && (
          <PostModal onClickToggleModal={onClickToggleModal} onSubmitPost={onSubmitPost}></PostModal>
      )} */}

      <Todays>
        <div className='today-missions'>{renderMissions()}</div>
        <div className='todo-list'>
          <div className='todo-list-1'>⦁ 자료조사 보내기 
          <input className='todo-list-1-submit' type='checkbox' /></div>
          <input className='todo-list-add' type='text' placeholder='⦁ 추가하려면 클릭하세요' />
        </div>
      </Todays>
    </>
  );
}

const Todays = styled.div`
box-shadow: 5px 0 10px rgba(0, 0, 0, 0.1), -5px 0 10px rgba(0, 0, 0, 0.1) ;
width: 580px;
height: 330px;
position: absolute;
top:60px;
border-bottom-left-radius: 15px;
border-bottom-right-radius: 15px;

.today-missions{
    width: 500px;
    max-height: 200px;
    overflow: auto; 
    overflow-x: hidden;
    margin: 0 auto;
    margin-top: 30px;
    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 4px;
    }
}  
.today-mission {
    display:grid;
    grid-template-columns: 0.5fr 1fr 1fr;
    grid-column-gap: 91px;
    top: 100px;
    left: 420px;
    padding-bottom: 15px;
    margin-bottom: 30px;
    box-shadow: 0px 5px 3px -5px rgba(0, 0, 0, 0.5);
}
.today-mission-photo{
  grid-row: span 2;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: lightgrey;
}
  .today-mission-explain {
    width : 120px;
    color: grey;
    font-size: 15px;
  }
  .today-mission-name {
    width : 120px;
    font-size: 20px;
    white-space: nowrap;
  }
  .today-mission-submit {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    grid-row: span 2;
    width: 100px;
    height: 23px;
    border-radius: 30px;
    background-color: lightgrey;
  }

  .todo-list{
    width: 400px;
    margin-top: 30px;
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    list-style: disc;
  }
  .todo-list-1 {
    margin-bottom: 7px;
    display: flex;
    justify-content: space-between;
  }
  
  .todo-list-1-submit{

  }

  .todo-list-add {
    width: 100%;
    border-style: none;
    // position: absolute;
    // left: 52px;
  }
`;

export default TodayContent;