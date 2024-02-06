import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Coding from '../assets/images/coding.jpg';
import Turtle from '../assets/images/turtle.png';

interface Mission {
  adminUserId: number;
  jaraUsId: number;
  jaraUsName: string;
  missionName: string;
  explanation: string | null;
  rule: string | null;
  jaraUsProfileImage: string;
  interest: string | null;
  maxMember: number;
  display: string;
  startDate: string;
  endDate: string;
  recurrence: string[];
}
const MyJaraus: React.FC = () => {
  let navigate = useNavigate();
  const [missionData, setMissionData] = useState<Mission[]>([]);
  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        const response = await axios.get('/api/jaraus/my-groups');
        if (response.data.calendarMissionHistoryDTOs!==undefined){
          setMissionData(response.data);
        }else{
          setMissionData([
            {
              adminUserId: 5,
              jaraUsId: 29,
              jaraUsName: "C를 씹어먹자",
              missionName: "1일 1백준",
              explanation: "백준 문제 하루 하나를 풀며 함께 성장하는 C 언어 챌린지! 즐겁게 코딩하고 동료들과 소통하며 알고리즘 강화하세요. 함께 달성하는 작은 목표, 큰 성취를 만들어봐요! 🚀",
              rule: null,
              jaraUsProfileImage: Coding,
              interest: null,
              maxMember: 10,
              display: "1",
              startDate: "2024-02-05",
              endDate: "2024-02-29",
              recurrence: ["MONDAY"],
            },
            {
              adminUserId: 4,
              jaraUsId: 42,
              jaraUsName: "거북목 탈퇴 클럽",
              missionName: "10분 스트레칭",
              explanation: "거북목 탈출을 위한 미션! 매일 10분의 스트레칭으로 편안한 자세를 찾아가는 챌린지에 참여하세요. 함께하는 모임에서 동기부여와 조언을 나누며 건강한 라이프스타일을 즐겨보세요. 함께 더 나은 자세로 행복한 하루를 만들어봐요! 🧘‍♂️💪",
              rule: null,
              jaraUsProfileImage: Turtle,
              interest: null,
              maxMember: 10,
              display: "public",
              startDate: "2024-02-05",
              endDate: "2024-02-29",
              recurrence: ["MONDAY", "TUESDAY"],
            },
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchMissionData();
  }, []);

  const renderMissions = () => {
    return missionData.map((mission, index) => (
        <div key={index} className='recommend'>
          <div className='recommend-photo' style={{backgroundImage:`url(${mission.jaraUsProfileImage})`}}>
          </div>
          <div className='container'>
            <div className='recommend-name'>{mission.jaraUsName}</div>
            <div className='recommend-mission'>{mission.missionName}</div>
            <div className='recommend-explain'>{mission.explanation}</div>
            <div className='recommend-period'>{mission.startDate} - {mission.endDate}</div>
            <div className='recommend-date'>{mission.recurrence.join(' ')}</div>
          </div>
        </div>
    ));
  };
  return (
    <MyJarausWrapper>
      <div className='my-Jaraus'>
        <div className='container'>
          <div className='backbutton' onClick={()=>navigate('/main')}>{'<'}</div>
          <div className='title-container'>
            <div className='title' onClick={()=>navigate('.')}>내가 가입한 Jara-Us</div>
          </div>

          <div className='my-container'>
            {renderMissions()}
          </div>
          
        </div>

      </div>
    </MyJarausWrapper>
  );
};
const MyJarausWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .backbutton{
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 30px;
    left: 40px;
    font-size: 30px;
    font-weight: 600;
    cursor: pointer;
  }
  .backbutton:hover{
    color: grey;
  }
  .container {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }

  .title-container {
    overflow: hidden;
    height: 100vh;
    font-size: 25px;
    border-right: 1.5px solid lightgrey;
    padding-right: 10px;
    text-align: center;
    flex: 0; /* flex-grow: 0; */
  }

  .title {
    margin-top: 380px;
    font-weight: 570;
    cursor: pointer;
  }

  .my-container {
    &::-webkit-scrollbar {
      width: 10px;
    }
  
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  
    &::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 4px;
    }
    height:100vh;
    overflow-y: auto; /* 세로 스크롤을 추가하여 my-container에서만 스크롤이 가능하도록 설정 */
    overflow-x: hidden;
  }

  .recommend:hover {
      background-color: lightgrey;
      transition: background-color 0.3s ease;
  }
    .recommend {
      border-bottom: 1px solid lightgrey;
      cursor: pointer;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 3fr;
      width: 1049px;
      height: 280px;
      background-color: white;
    }
    .recommend-photo{
        grid-row: span 2;
        margin-left: 50px;
        margin-top: 50px;
        width: 170px;
        height: 170px;
        border-radius: 100%;
        background-color: grey;
        background-size: cover;
    }
    .recommend-name {
        position: relative;
        font-size: 20px;
        width: 400px;
        height: 30px;
        border-radius: 10px;
        margin-left: 50px;
        margin-top: 60px;
    }
    .recommend-mission{
      margin-top: 62px;
      margin-left: -400px;
    }
    .recommend-explain {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 600px;
        height: 120px;
        border-radius: 10px;
        margin-left: 50px;
        padding: 20px;
        background-color: #FAFAFA;
        line-height: 1.5;
    }
    .recommend-period{
      margin-top: -80px;
      margin-left: -70px;
    }
    .recommend-date{
      margin-top: 20px;
      margin-left: 50px;
    }
    
  
`;
export default MyJaraus;