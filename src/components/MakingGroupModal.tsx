import { useState } from "react";
import styled from "styled-components";
import Modal, { ModalTitle } from "./modal";
import { Input, InputWrapper, RadioContainer, Textarea } from "./auth-components";
import Button from "./button";
import GroupImgUploader from "./group-img-uploader";
import { palette } from "../assets/styles/palette";

interface GroupModalProps {
  onClickToggleGroupModal: () => void;
  onClose: () => void;
}

function GroupModal({ onClickToggleGroupModal, onClose }: GroupModalProps) {
  const [groupName, setGroupName] = useState("");
  const [firsttime, setFirsttime] = useState(true);
  const [groupAvailable, setGroupAvailable] = useState(false);

  const [activeDays, setActiveDays] = useState([false, false, false, false, false, false, false]);

  const [missionName, setMissionName] = useState("");
  const [description, setDescription] = useState("");
  const [rule, setRule] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(5);
  const [recurrence, setRecurrence] = useState<string[]>();
  const [hashtags, setHashtags] = useState<string[]>();
  const [display, setDisplay] = useState<boolean>(true);

  const onChangeValue = (e : React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const {target : {name, value}} = e;
    if (name === "missionName") {
      setMissionName(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "rule") {
      setRule(value);
    } else if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    } 
};

  const handleDayClick = (index: number) => {
    setActiveDays((prevActiveDays) => {
      const newActiveDays = [...prevActiveDays];
      newActiveDays[index] = !newActiveDays[index];
      return newActiveDays;
    });
  };

  const handleCheckAvailability = () => {
    // 여기에서 중복 확인 로직을 추가하고 결과에 따라 setGroupAvailable 함수 호출
    // 예를 들어, 서버에서 중복 확인 후 결과를 받아와서 setGroupAvailable을 호출
    // setGroupAvailable(true); // 중복이 아니라면 true, 중복이면 false
    const isAvailable = groupName !== '솔룩스';
    setGroupAvailable(isAvailable);
    if (firsttime) setFirsttime(false);

  };

  const handleCreateGroup = () => {
    // 여기에서 Jara-Us 생성 로직을 추가하고,
    // 생성이 성공했을 때 onClose 함수와 alert를 실행
    // 생성에 실패했을 경우에는 alert 등을 추가로 처리할 수 있음
    // 예시로 생성이 항상 성공했다고 가정하고 alert를 추가함
    alert("Jara-Us가 생성되었습니다!");
    onClose();
  };

  // const [searchQuery, setSearchQuery] = useState('');
  
    // const handleSearch = () => {
    //   // 여기에 실제 검색 로직을 구현하세요.
    //   console.log(`Searching for: ${searchQuery}`);
    // };

  return (

    // <ModalOverlay>
    //   <ModalContainer>

    <Modal onClickToggleModal={onClickToggleGroupModal} dialogClassName="group">
      <ModalTitle>Jara-Us 생성</ModalTitle>

      <div style={{"display":"flex", "justifyContent":"center", "alignItems":"center"}}>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>

        <Form>
        <Column>
          <GroupImgUploader groupImg=""></GroupImgUploader>
        </Column>
        <Column>
          <label style={{"marginRight":"20px"}}>그룹명</label>
          <InputWrapper>
            <Input type="text" value={groupName} placeholder="생성할 Jara-Us 이름을 입력해 주세요" onChange={onChangeValue}/>
            <Button type="button" className="check-button" onClick={handleCheckAvailability} 
                    $width="auto" $fontColor="jarameGrey" $fontSize="10" $height="auto">중복 확인</Button>
          </InputWrapper>
        </Column>
        <div style={{"textAlign":"end", "fontWeight":"bold"}}>
          {groupAvailable && (
              <small>사용 가능한 그룹명입니다</small>
            )}
            {!firsttime && !groupAvailable && (
              <small className="cannotuse">사용 불가능한 그룹명입니다</small>
            )}
        </div>

        <Column>
          <label style={{"marginRight":"20px"}}>미션</label>
          <InputWrapper>
            <Input type="text" value={missionName} onChange={onChangeValue} placeholder="미션 이름을 입력해 주세요"/>
          </InputWrapper>
        </Column>

        <Column>
          <label style={{"marginRight":"20px"}}>설명</label>
          <InputWrapper>
            <Input type="text" value={description} onChange={onChangeValue} placeholder="미션에 대한 설명을 입력해 주세요"/>
          </InputWrapper>
        </Column>

        <Column>
          <label style={{"marginRight":"20px"}}>규칙</label>
          <InputWrapper>
            <Textarea value={rule} onChange={onChangeValue} placeholder="미션 규칙을 입력해 주세요"/>
          </InputWrapper>
        </Column>

        <Column>
          <label style={{"marginRight":"10px"}}>시작일</label>
          
          <InputWrapper style={{"marginRight":"10px", "justifyContent":"flex-end"}}>
            <Input type="date" value={startDate} onChange={onChangeValue}></Input>
          </InputWrapper>
          
          <label style={{"marginRight":"10px"}}>종료일</label>
          <InputWrapper style={{ "justifyContent":"flex-end"}}>
            <Input type="date" value={endDate} onChange={onChangeValue}></Input>
          </InputWrapper>
        </Column>

        <Column>
          <label style={{"marginRight":"10px"}}>최대 인원</label>
          
          <InputWrapper style={{"marginRight":"10px", "justifyContent":"flex-end"}}>
            <Select
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(Number(e.target.value))}>
              <option value={5}>5명</option>
              <option value={10}>10명</option>
              <option value={15}>15명</option>
            </Select>
          </InputWrapper>

          <label style={{"marginRight":"10px"}}>인증 주기</label>
          <InputWrapper style={{"justifyContent":"space-even"}}>
            {["월", "화", "수", "목", "금", "토", "일"].map((day, index) => (
              <DayBtn
                type="button"
                key={day}
                onClick={() => handleDayClick(index)}
                $isActive={activeDays[index]}
                // recurrence 배열에 넣고 빼는 로직 필요
              >
                {day}
              </DayBtn>
            ))}
        </InputWrapper>
          
        </Column>

        <Column>
          <label style={{"marginRight":"20px"}}>분류</label>
          <InputWrapper>

          </InputWrapper>
        </Column>



        <Column>
        <label style={{"marginRight":"20px"}}>공개</label>
        <div style={{"width":"100%","display":"flex", "justifyContent":"space-evenly"}}>
        <RadioContainer style={{ flex: 1 }}><Input type="radio" name="display" value="public" checked={true} id="publicBtn"/><label htmlFor="publicBtn">전체 공개</label></RadioContainer>
        <RadioContainer style={{ flex: 1 }}><Input type="radio" name="display" value="limited" checked={false} id="limitedBtn" /><label htmlFor="limitedBtn">초대된 사용자에게 공개</label></RadioContainer>
        <RadioContainer style={{ flex: 1 }}><Input type="radio" name="display" value="private" checked={false} id="privateBtn"/><label htmlFor="privateBtn">비공개</label></RadioContainer>
        </div>
        </Column>


        {/* <div className="input">
          <label>분류</label>
          <input type="text" placeholder="분류를 입력하세요 ..." />
          <div className='search-button' onClick={handleSearch}>🔍︎</div>
        </div> */}
        </Form>

        <Column className="makeCancle">        
          <Button onClick={handleCreateGroup} $buttonColor="jarameBlue">생성</Button>
          <Button onClick={onClose} $buttonColor="jarameGrey">취소</Button>
        </Column>

        </ModalContainer>
        </div>
    </Modal>

    //    </ModalContainer>
    //  </ModalOverlay>
  );
}

// const ModalOverlay = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background-color: rgba(0, 0, 0, 0.3);
//   z-index: 999;
// `;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Column = styled.div`

  width: 100%;
  white-space: nowrap;
  font-weight: bold;

  display: flex;
  align-items: center;

  &.makeCancle {
    justify-content: center;
    gap: 10px;
    margin-top: 40px;
    
  }
`;

const Select = styled.select`
  font-size: 16px;
  width: 70%;
  border: none;
`;

const DayBtn = styled.button<{$isActive:boolean|undefined}>`
  border: none;
  font-size: 16px;
  background-color: transparent;
  color: ${palette.jarameGrey};
  cursor: pointer;
  font-weight: ${(props) => (props.$isActive ? "bold" : "normal")};   


`;

const ModalContainer = styled.div`

  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  margin-top: 30px;
  

/*
  overflow-y: auto;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
*/

  small{
    color: #4caf50;
  }

  .cannotuse{
    color: red;
  }

/*
  .title{
    font-size: 30px;
    margin-bottom: 32px;
  }

  .check-button {
    height: 30px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    margin-left: 30px;
    cursor: pointer;
  }

  .check-button:hover{
    background-color: green;
    color: lightgrey;
  }

  label{
    font-size: 28px;
    font-weight: bold;
    margin-right: 50px;
  }

  .input{
    text-align: left !important;
    margin-left: 55px;
    margin-bottom: 30px;
    
  }

  input{
    height: 30px;
    width: 350px;
    border-radius: 10px;
    border: 1px solid grey;
    padding-left: 10px;
  }

  #disclose button{
    font-size: 17px;
    font-weight: 600;
    margin-left: 25px;
    margin-right: 25px;
    width: 220px;
    height: 40px;
    background-color: white;
    border-radius: 9px;
    border: 1px solid lightgrey;
    cursor: pointer;

  }
  #disclose button:hover{
    background-color: grey;
    color: white;
  }

  #maximum{
    position: absolute;
    right: 120px;
  }

  #maximum label{
    width: 140px;
    position: absolute;
    top: 9px;
    right: 10px;
  }
  #maximum select{
    position: absolute;
    top: 14px;
    right: 10px;
  }

  select{
    height: 30px;
  }

  .makecancel button{
    width: 200px;
    height: 40px;
    border-radius: 15px;
    border-style: none;
    color: white;
    font-size: 20px;
    font-weight: bold;
    margin: 30px;
    cursor: pointer;
  }
  .makecancel #make{
    background-color: #669AFF;
  }
  .makecancel #make:hover{
    background-color: #557FD0;
  }
  .makecancel #cancel{
    background-color: #BDBDBD;
  }
  .makecancel #cancel:hover{
    background-color: #8E8E8E;
  }

  .mission{
    width: 760px;
  }
  .explain{
    width: 760px;
  }
  .rule{
    width: 760px;
    height: 90px;
  }

  .search-button{
    position: absolute;
    top: 449px;
    left: 515px;
  }
  */
`;

const CloseButton = styled.span`
  font-size: 27px;
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

export default GroupModal;