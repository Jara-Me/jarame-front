import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import PostModal from './post-modal';

interface TodayContentProps {
  className?: string;
}

const TodayContent: React.FC<TodayContentProps> = ({ className }) => {

  const [isOpenPostModal, setOpenPostModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenPostModal(!isOpenPostModal);
  }, [isOpenPostModal]);

  const onSubmitPost = () => {
    setOpenPostModal(false);
  };


  return (
    <>
      {/* {isOpenPostModal && (
          <PostModal onClickToggleModal={onClickToggleModal} onSubmitPost={onSubmitPost}></PostModal>
      )} */}

      <Todays>
        <div className='today-mission'>
          <div className='today-mission-1'>
            <div className='today-mission-photo'></div>
            <div className='today-mission-explain'>C를 씹어먹자</div>
            <div className='today-mission-submit' onClick={onClickToggleModal}>인증 바로가기</div>
            <div className='today-mission-name'>1일 1백준</div>
          </div>
          <div className='today-mission-2'>
            <div className='today-mission-photo'></div>
            <div className='today-mission-explain'>거북목 탈퇴 클럽</div>
            <div className='today-mission-submit' onClick={onClickToggleModal}>인증 바로가기</div>
            <div className='today-mission-name'>10분 스트레칭</div>
          </div>
        </div>

        <ul className='todo-list'>
        <li>
          <div className='todo-list-1'>
            <label htmlFor="todo">자료조사 보내기</label>
            <input className='todo-list-1-submit' type='checkbox' id="todo"></input>
          </div>
        </li>
        <li>
          <input className='todo-list-add' type='text' placeholder='추가하려면 클릭하세요' />
        </li>
        </ul>

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

.today-mission{
    width: 500px;
    margin: 0 auto;
    margin-top: 30px;
}  
.today-mission-1 {
    display:grid;
    grid-template-columns: 0.5fr 1fr 1fr;
    grid-column-gap: 91px;
    top: 100px;
    left: 420px;
    padding-bottom: 15px;
    margin-bottom: 30px;
    box-shadow: 0px 5px 3px -5px rgba(0, 0, 0, 0.5);
}
.today-mission-2 {
    display:grid;
    grid-template-columns: 0.5fr 1fr 1fr;
    grid-column-gap: 91px;
    top: 150px;
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
    color: grey;
    font-size: 15px;
  }
  .today-mission-name {
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