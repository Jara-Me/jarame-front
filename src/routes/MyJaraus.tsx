import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Mission {
  dailyMissionResult: boolean;
  jaraUsName: string;
  missionName: string;
}
const MyJaraus: React.FC = () => {
  let navigate = useNavigate();
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
          { dailyMissionResult: true, jaraUsName: '자라어스3 이름', missionName: '자라어스3 미션이름' },
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
    return missionData.map((mission, index) => (
        <div key={index} className='recommend'>
          <div className='recommend-photo'></div>
          <div className='recommend-name'>{mission.jaraUsName}</div>
          <div className='recommend-explain'>{mission.missionName}</div>
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

    .recommend-explain {
        position: relative;
        display: flex;
        align-items: center;
        // justify-content: center;
        width: 600px;
        height: 90px;
        border-radius: 10px;
        margin-left: 50px;
        background-color: #FAFAFA;
    }
    
  
`;
export default MyJaraus;