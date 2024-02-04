import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Switcher } from './auth-components';
import { palette } from '../assets/styles/palette';
import axios from 'axios';

const MenuButton: React.FC = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleButtonClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = async() => {
    try {
        const response = await axios.post("/api/user/logout");

        if(response.data.success) {
            console.log(response.data.message);
            alert("로그아웃되었습니다");
            navigate("/");
        } else {
            console.log(response.data.message);
        }

    } catch(error) {
        console.error("Error post logout: ", error);
    }

}

const onClickLogout = async() => {
    const ok = confirm("로그아웃하시겠습니까?");

    if(ok) {
        await handleLogout();
    }
}

  return (
    <Wrapper>
      <Button onClick={handleButtonClick} isOpen={isMenuOpen}>
        <svg viewBox="0 0 20 20">
							<path fill="white" d="M3.314,4.8h13.372c0.41,0,0.743-0.333,0.743-0.743c0-0.41-0.333-0.743-0.743-0.743H3.314
								c-0.41,0-0.743,0.333-0.743,0.743C2.571,4.467,2.904,4.8,3.314,4.8z M16.686,15.2H3.314c-0.41,0-0.743,0.333-0.743,0.743
								s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,15.2,16.686,15.2z M16.686,9.257H3.314
								c-0.41,0-0.743,0.333-0.743,0.743s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,9.257,16.686,9.257z"></path>
						</svg>
      </Button>
      <Menu isOpen={isMenuOpen}>
        <Switcher>
          <Link to="/main"><MenuItem>자라미</MenuItem></Link>
          <Link to="/my"><MenuItem>자라어스</MenuItem></Link>
          <MenuItem className="logout" onClick={onClickLogout}>로그아웃</MenuItem>
        </Switcher>
      </Menu>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

interface ButtonProps {
  isOpen: boolean;
}
const Button = styled.button<ButtonProps>`
  width: 40px;
  height: 100px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.05), -5px 5px 10px rgba(0, 0, 0, 0.2);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: ${palette.jarameBlue};
  position: fixed;
  top: 30px;
  left: ${({ isOpen }) => (isOpen ? '250px' : '0px')};
  color: #fff;
  border: none;
  cursor: pointer;
  transition: left 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  svg{
    width: 20px;
  }
`;

interface MenuProps {
  isOpen: boolean;
}

const Menu = styled.div<MenuProps>`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
  width: 250px;
  height: 100vh;
  background-color: #2c3e50;
  transition: left 0.3s ease-in-out;
  overflow: hidden;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const MenuItem = styled.div`
  padding: 15px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #34495e;
  }
`;

export default MenuButton;