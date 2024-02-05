import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

interface PointMission {
  changeAmount: number;
  plusOrMinus: boolean;
  task: string;
}

interface MissionHistory {
  missionDate: string;
  jaraUsId: number;
  jaraUsName: string;
  missionName: string;
  missionPostId: number | null;
  missionResult: boolean;
}

interface CalendarProps {
  className?: string;
}

const Calendar: React.FC<CalendarProps> = ({ className }) => {
  const daysInMonth = 31;
  const startDay = 3;

  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [pointMissionData, setPointMissionData] = useState<PointMission[]>([
    {
      "changeAmount": 2,
      "plusOrMinus": true,
      "task": "출석체크"
    },
    {
      "changeAmount": 8,
      "plusOrMinus": true,
      "task": "오늘의 미션 완료"
    },
    {
      "changeAmount": 50,
      "plusOrMinus": true,
      "task": "미션 완주"
    },
    {
      "changeAmount": 60,
      "plusOrMinus": false,
      "task": "패스권 구매"
    },
  ]);
  const [missionHistoryData, setMissionHistoryData] = useState<MissionHistory[]>([
    {
      "missionDate": "2024-01-29",
      "jaraUsId": 1,
      "jaraUsName": "C를 씹어먹자",
      "missionName": "1일 1백준",
      "missionPostId": 1,
      "missionResult": true
    },
    {
      "missionDate": "2024-01-29",
      "jaraUsId": 2,
      "jaraUsName": "거북목 탈퇴 클럽",
      "missionName": "10분 스트레칭",
      "missionPostId": null,
      "missionResult": false
    },
    {
      "missionDate": "2024-01-29",
      "jaraUsId": 3,
      "jaraUsName": "자라어스3 이름",
      "missionName": "자라어스3 미션이름",
      "missionPostId": 3,
      "missionResult": true
    },
    {
      "missionDate": "2024-01-29",
      "jaraUsId": 4,
      "jaraUsName": "자라어스4 이름",
      "missionName": "자라어스4 미션이름",
      "missionPostId": null,
      "missionResult": false
    }
  ]);

  const handleDateClick = async (day: number) => {
    setSelectedDate(day);
    try {
      const formattedDate = `2024-01-${String(day).padStart(2, '0')}`;
      const response = await axios.get('/api/notice/calendar', {
        params: {
          selectedDate: formattedDate,
        },
      });
      console.log(response.data.calendarPointDTOs);
      if(response.data.calendarPointDTOs!==undefined){
        setPointMissionData(response.data.calendarPointDTOs);
        setMissionHistoryData(response.data.calendarMissionHistoryDTOs);
        
      }
      else{
        setPointMissionData([
          {
            "changeAmount": 2,
            "plusOrMinus": true,
            "task": "출석체크"
          },
          {
            "changeAmount": 8,
            "plusOrMinus": true,
            "task": "오늘의 미션 완료"
          },
          {
            "changeAmount": 50,
            "plusOrMinus": true,
            "task": "미션 완주"
          },
          {
            "changeAmount": 60,
            "plusOrMinus": false,
            "task": "패스권 구매"
          },
        ]);
        setMissionHistoryData([
          {
            "missionDate": "2024-01-29",
            "jaraUsId": 1,
            "jaraUsName": "C를 씹어먹자",
            "missionName": "1일 1백준",
            "missionPostId": 1,
            "missionResult": true
          },
          {
            "missionDate": "2024-01-29",
            "jaraUsId": 2,
            "jaraUsName": "거북목 탈퇴 클럽",
            "missionName": "10분 스트레칭",
            "missionPostId": null,
            "missionResult": false
          },
          {
            "missionDate": "2024-01-29",
            "jaraUsId": 3,
            "jaraUsName": "자라어스3 이름",
            "missionName": "자라어스3 미션이름",
            "missionPostId": 3,
            "missionResult": true
          },
          {
            "missionDate": "2024-01-29",
            "jaraUsId": 4,
            "jaraUsName": "자라어스4 이름",
            "missionName": "자라어스4 미션이름",
            "missionPostId": null,
            "missionResult": false
          }
        ]);
      }
      
    } catch (error) {
      console.error('Error fetching mission data:', error);
    }
  };

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(<EmptyDay key={`empty-${i}`} />);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(
      <Day
        key={i}
        isSelected={selectedDate === i}
        onClick={() => handleDateClick(i)}
      >
        {i}
      </Day>
    );
  }

  // const selectedMissionData = selectedDate !== null ? missionData : [];
  // const missionList = selectedMissionData.map((mission, index) => (
  //   <MissionItem
  //     key={index}
  //     completed={mission.dailyMissionResult}
  //     onClick={() => toggleMissionStatus(index)}
  //   >
  //     <input type="checkbox" checked={mission.dailyMissionResult} readOnly />
  //     {mission.jaraUsName} - {mission.missionName}
  //   </MissionItem>
  // ));

  const selectedPmData = selectedDate !== null ? pointMissionData : [];
  const pmList = selectedPmData?.map((mission, index) => (
    <MissionItem
      key={index}
    >
      <div style={{ textDecoration: mission.plusOrMinus ? 'line-through' : 'none' , 
      width:'130px', marginLeft: '100px'}}>{mission.task}</div>
      <input type="checkbox" checked={mission.plusOrMinus} readOnly />
    </MissionItem>
  ));

  const selectedMhData = selectedDate !== null ? missionHistoryData : [];
  const mhList = selectedMhData?.map((mission, index) => (
    <MissionItem
      key={index}
    >
      <div style={{width:'200px'}}>
      <div style={{color: 'grey', marginTop: '10px',marginBottom: '5px'}}>{mission.jaraUsName} </div>
      <div style={{ textDecoration: mission.missionResult ? 'line-through' : 'none'}}>{mission.missionName}</div>
      </div>
      <input style={{marginLeft:'10px'}} type="checkbox" checked={mission.missionResult} readOnly />
    </MissionItem>
  ));
  ///////////////////////////////////////////////////
  
  ///////////////////////////////////////////////////

  return (
    <CalendarWrapper>
      <DayNames>
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </DayNames>
      <Days>{days}</Days>
      {selectedDate !== null && (
        <MissionListWrapper>
          <div className='selected-date'>2024-01-{String(selectedDate).padStart(2, '0')}</div>
          {/* {missionList} */}
          <div className='mission-container'>
            <div className='missions'>
              <div className='pmlist'> {pmList} </div>
              <div className='mhlist'> {mhList} </div>
            </div>
          </div>
          
        </MissionListWrapper>
      )}
    </CalendarWrapper>
  );
};
const CalendarWrapper = styled.div`
  box-shadow: 5px 0 10px rgba(0, 0, 0, 0.1), -5px 0 10px rgba(0, 0, 0, 0.1);
  width: 580px;
  height: 510px;
  position: absolute;
  top: 60px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  font-family: 'Arial', sans-serif;
`;

const DayNames = styled.div`
  width: 350px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-weight: bold;
  text-align: center;
  margin: 0 auto;
  margin-top: 15px;
`;

const Days = styled.div`
  width: 350px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin: 0 auto;
  margin-top: 15px;
  padding-bottom: 30px;
  border-bottom: 1px solid grey;
`;

const Day = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? '#4caf50' : 'white')};
  color: ${({ isSelected }) => (isSelected ? 'white' : 'black')};

  &:hover {
    background-color: #f0f0f0;
  }
`;

const MissionListWrapper = styled.div`
  display: flex;
  font-size: 14px;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  .selected-date{
    font-size: 20px;
  }
  .mission-container{
    border: 1px solid rgb(0,0,0,0.1);
    border-radius: 10px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    width: 500px;
    height: 150px;
    overflow: auto;
    overflow-x: hidden;
    margin-top: 25px;
    margin-left:40px;
    margin-right: 40px;
  }

  .missions{
    width: 100%;
    height: 100%;
    max-height: 150px;
    overflow: auto;
    overflow-x: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;
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
  
  .pmlist{
    text-align: center;
  }
  .mhlist{
    text-align: center;
  }
`;

const MissionItem = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
  cursor: pointer;

  input[type='checkbox'] {
    margin-right: 8px;
  }

`;
const EmptyDay = styled.div`
  height: 40px;
  border: 1px solid #ccc;
`;

export default Calendar;