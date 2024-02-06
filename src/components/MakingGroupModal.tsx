import { useEffect, useState } from "react";
import styled from "styled-components";
import Modal, { ModalTitle } from "./modal";
import { Error, Input, InputWrapper, OkMsg, RadioContainer, Textarea } from "./auth-components";
import Button from "./button";
import GroupImgUploader from "./group-img-uploader";
import { palette } from "../assets/styles/palette";
import defaultGroupImg from "../assets/images/defaultGroupImg.jpg";
import axios from "axios";


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
  const [explanation, setExplanation] = useState<string|null>(null);
  const [rule, setRule] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(5);
  const [recurrence, setRecurrence] = useState<string[]>();
  const [interest, setInterest] = useState<string>("");
  const [display, setDisplay] = useState<string>("public");

  const [groupImg, setGroupImg] = useState<string>(defaultGroupImg);

  interface Error {
    available: boolean|undefined;
    msg: string;
  }
  
  const [groupNameErr, setGroupNameErr] = useState<Error>({ available: undefined, msg: "" });

  const onChangeValue = (e : React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    const {target : {name, value}} = e;
    if (name === "groupName") {
      setGroupName(value);
    } else if (name === "missionName") {
      setMissionName(value);
    } else if (name === "explanation") {
      setExplanation(value);
    } else if (name === "rule") {
      setRule(value);
    } else if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    } else if (name === "display") {
      setDisplay(value);
    } else if (name === "interest") {
      setInterest(value);
    }
};

  const handleDayClick = (index: number) => {

    const updatedActiveDays = [...activeDays];
    updatedActiveDays[index] = !updatedActiveDays[index];
    setActiveDays(updatedActiveDays);

    const updatedRecurrence = updatedActiveDays.reduce((acc, isActive, i) => {
      if (isActive) {
        acc.push(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"][i]);
      }
      return acc;
    }, [] as string[]);

    setRecurrence(updatedRecurrence);
  };

  const handleCheckAvailability = async() => {
    // 여기에서 중복 확인 로직을 추가하고 결과에 따라 setGroupAvailable 함수 호출
    // 예를 들어, 서버에서 중복 확인 후 결과를 받아와서 setGroupAvailable을 호출
    // setGroupAvailable(true); // 중복이 아니라면 true, 중복이면 false
    // const isAvailable = groupName !== '솔룩스';
    // setGroupAvailable(isAvailable);
    // if (firsttime) setFirsttime(false);

    if(groupName==="") {
      alert("그룹명을 입력해 주세요");
      return;
    }

    try {
      // const response = await axios.post(`/api/jaraus/checkJaraUsNameDuplicate?jaraUsName=${groupName}`);
      
      // if (response.status === 200) {
      //   setGroupNameErr({ available: true, msg: "사용 가능한 그룹명입니다" });
      // } else {
      //   setGroupNameErr({ available: false, msg: "이미 존재하는 그룹명입니다" });
      // }

      setGroupNameErr({ available: true, msg: "사용 가능한 그룹명입니다" });

      
    } catch (error) {
      console.error("Error check group name available", error);
    }

  };

  useEffect(()=> {
  }, [groupNameErr]);

  const handleCreateGroup = async() => {
    // 여기에서 Jara-Us 생성 로직을 추가하고,
    // 생성이 성공했을 때 onClose 함수와 alert를 실행
    // 생성에 실패했을 경우에는 alert 등을 추가로 처리할 수 있음
    // 예시로 생성이 항상 성공했다고 가정하고 alert를 추가함

    try {
      
      const jarausData = {
        jarausName : groupName,
        missonName: missionName,
        jarausProfileImage: groupImg,
        maxMember: maxParticipants,
        display: display,
        interest: interest,
        startDate: startDate,
        endDate: endDate,
        recurrence: recurrence,
        explanation: explanation,
        rule: rule
      }

      const response = await axios.post('api/jaraus/create', jarausData);

      if(response.status === 201) {
        alert("Jara-Us가 생성되었습니다!");
        onClose();
      } else {
        alert("Jara-us 생성에 실패했습니다.");
      }

    } catch (error) {
      console.error("Error post jaraus", error);
    }

  };

  const onSubmitJaraUs = (e: React.FormEvent) => {
      e.preventDefault();
      
      if(!recurrence || recurrence.length === 0) {
        alert("인증 주기를 선택해 주세요");
        return;
      }

      if(!groupNameErr.available) {
        alert("그룹명 중복 확인을 해 주세요");
        return;
      }
      
      handleCreateGroup();
  }

  // const [searchQuery, setSearchQuery] = useState('');
  
    // const handleSearch = () => {
    //   // 여기에 실제 검색 로직을 구현하세요.
    //   console.log(`Searching for: ${searchQuery}`);
    // };

  return (

    // <ModalOverlay>
    //   <ModalContainer>

    <Modal onClose={onClose} dialogClassName="group">
      <ModalTitle>Jara-Us 생성</ModalTitle>

      <div style={{"display":"flex", "justifyContent":"center", "alignItems":"center"}}>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>

        <Form onSubmit={onClose} >
        <Column>
          <GroupImgUploader groupImg={groupImg} setGroupImg={setGroupImg}></GroupImgUploader>
        </Column>
        <Column>
          <label style={{"marginRight":"20px"}}>그룹명</label>
          <InputWrapper>
            <Input type="text" name="groupName" value={groupName} placeholder="생성할 Jara-Us 이름을 입력해 주세요" onChange={onChangeValue} required/>
            <Button type="button" className="check-button" onClick={handleCheckAvailability} 
                    $width="auto" $fontColor="jarameGrey" $fontSize="10" $height="auto">중복 확인</Button>
          </InputWrapper>
        </Column>
  
        {groupNameErr.available ? (
                <OkMsg className="middle">{groupNameErr.msg}</OkMsg>
            ) : (
                <Error className="middle">{groupNameErr.msg}</Error>
            )}

        <Column>
          <label style={{"marginRight":"20px"}}>미션</label>
          <InputWrapper>
            <Input type="text" name="missionName" value={missionName} onChange={onChangeValue} placeholder="미션 이름을 입력해 주세요" required/>
          </InputWrapper>
        </Column>

        <Column>
          <label style={{"marginRight":"20px"}}>설명</label>
          <InputWrapper>
            <Input type="text" name="explanation" value={explanation || ''} onChange={onChangeValue} placeholder="미션에 대한 설명을 입력해 주세요"/>
          </InputWrapper>
        </Column>

        <Column>
          <label style={{"marginRight":"20px"}}>규칙</label>
          <InputWrapper>
            <Textarea value={rule} name="rule" onChange={onChangeValue} placeholder="미션 규칙을 입력해 주세요" required/>
          </InputWrapper>
        </Column>

        <Column style={{"whiteSpace":"pre-wrap", "justifyContent":"space-between"}}>
          
          <label style={{"marginRight":"10px"}}>시작일</label>
          <InputWrapper style={{flex: 1, "marginRight":"10px", "justifyContent":"flex-end"}}>
            <Input type="date" name="startDate" value={startDate} onChange={onChangeValue} required></Input>
          </InputWrapper>
          
          <label style={{"marginRight":"10px"}}>종료일</label>
          <InputWrapper style={{ flex: 1, "marginRight":"10px","justifyContent":"flex-end"}}>
            <Input type="date" name="endDate" value={endDate} onChange={onChangeValue} required></Input>
          </InputWrapper>

          <label style={{"marginRight":"10px"}}>인증 주기</label>
          <InputWrapper style={{flex: 1, "justifyContent":"space-even"}}>
            {["월", "화", "수", "목", "금", "토", "일"].map((day, index) => (
              <DayBtn
                type="button"
                key={day}
                onClick={() => handleDayClick(index)}
                $isActive={activeDays[index]}
              >
                {day}
              </DayBtn>
            ))}
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

          <label style={{"marginRight":"20px"}}>분류</label>
          <InputWrapper style={{"justifyContent":"flex-end"}}>
            <Select
                  name="interest"
                  value={interest}
                  onChange={onChangeValue}
                  required>
                <option value={""} hidden>필수 선택</option>
                <option value={"study"}>공부</option>
                <option value={"health"}>건강</option>
                <option value={"hobby"}>취미</option>
              </Select>
          </InputWrapper>


        </Column>


        <Column>
        <label style={{"marginRight":"20px"}}>공개</label>
        <div style={{"width":"100%","display":"flex", "justifyContent":"space-evenly"}}>
        <RadioContainer style={{ flex: 1 }}><Input type="radio" name="display" value="public" checked={display==="public"} onChange={onChangeValue}id="publicBtn"/><label htmlFor="publicBtn">전체 공개</label></RadioContainer>
        <RadioContainer style={{ flex: 1 }}><Input type="radio" name="display" value="limited" checked={display==="limited"} onChange={onChangeValue}id="limitedBtn" /><label htmlFor="limitedBtn">초대된 사용자에게 공개</label></RadioContainer>
        <RadioContainer style={{ flex: 1 }}><Input type="radio" name="display" value="private" checked={display==="private"} onChange={onChangeValue}id="privateBtn"/><label htmlFor="privateBtn">비공개</label></RadioContainer>
        </div>
        </Column>


        {/* <div className="input">
          <label>분류</label>
          <input type="text" placeholder="분류를 입력하세요 ..." />
          <div className='search-button' onClick={handleSearch}>🔍︎</div>
        </div> */}

        <Column className="makeCancle">        
          <Button type="submit" $buttonColor="jarameBlue" onClick={()=>(alert("생성되었습니다"))}>생성</Button>
          <Button onClick={onClose} $buttonColor="jarameGrey">취소</Button>
        </Column>

        </Form>



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