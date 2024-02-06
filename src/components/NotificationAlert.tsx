import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { palette } from "../assets/styles/palette";

interface MNotification {
  earnPoint: number;
  missionName: string;
  jaraUsName: string;
  period: string;
}
interface RNotification {
  missionPostId: number;
  missionPostTextTitle: string;
  like: number;
  good: number;
  smile: number;
}

interface NotificationAlertProps {
  MissionNotifications: MNotification[];
  ReactionNotifications: RNotification[];
  onClick: () => void;
}

const NotificationAlert: React.FC<NotificationAlertProps> = ({
  MissionNotifications,
  ReactionNotifications,
  onClick,
}) => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleAlertClick = () => {
    setIsAlertVisible(!isAlertVisible);
    console.log(onClick);
  };

  return (
    <Container onClick={handleAlertClick}>
      <Icon>
          <svg viewBox="0 0 20 20">
							<path d="M14.38,3.467l0.232-0.633c0.086-0.226-0.031-0.477-0.264-0.559c-0.229-0.081-0.48,0.033-0.562,0.262l-0.234,0.631C10.695,2.38,7.648,3.89,6.616,6.689l-1.447,3.93l-2.664,1.227c-0.354,0.166-0.337,0.672,0.035,0.805l4.811,1.729c-0.19,1.119,0.445,2.25,1.561,2.65c1.119,0.402,2.341-0.059,2.923-1.039l4.811,1.73c0,0.002,0.002,0.002,0.002,0.002c0.23,0.082,0.484-0.033,0.568-0.262c0.049-0.129,0.029-0.266-0.041-0.377l-1.219-2.586l1.447-3.932C18.435,7.768,17.085,4.676,14.38,3.467 M9.215,16.211c-0.658-0.234-1.054-0.869-1.014-1.523l2.784,0.998C10.588,16.215,9.871,16.447,9.215,16.211 M16.573,10.27l-1.51,4.1c-0.041,0.107-0.037,0.227,0.012,0.33l0.871,1.844l-4.184-1.506l-3.734-1.342l-4.185-1.504l1.864-0.857c0.104-0.049,0.188-0.139,0.229-0.248l1.51-4.098c0.916-2.487,3.708-3.773,6.222-2.868C16.187,5.024,17.489,7.783,16.573,10.27"></path>
					</svg>
      </Icon>
      {isAlertVisible && (
        <AlertContainer>
          <AlertContent>
            {MissionNotifications.map((notification) => (
              <NotificationItem>
                {notification.missionName}-{notification.jaraUsName}-{notification.period}
              </NotificationItem>
            ))}
            {ReactionNotifications.map((notification) => (
              <NotificationItem key={notification.missionPostId}>
                {notification.missionPostTextTitle}
              </NotificationItem>
            ))}
          </AlertContent>
        </AlertContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${palette.jarameBlue};
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
`;

const Icon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 30px;
    fill: white;
  }
`;
const fadeInOut = keyframes`from{opacity:0;}to{opacity:1;}`;
  
const AlertContainer = styled.div`
  position: fixed;
  top: 60px;
  right: 100px;
  width: 400px;
  height: 250px;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 100;
  animation: ${fadeInOut} 0.1s ease-in-out;
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
`;

const AlertContent = styled.div`
  padding: 10px;
`;

const NotificationItem = styled.div`
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ccc;
  }
`;

export default NotificationAlert;