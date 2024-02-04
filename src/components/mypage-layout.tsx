import styled from "styled-components";
import { Link, Outlet, useLocation} from "react-router-dom";
import { palette } from "../assets/styles/palette";

const Wrapper = styled.div`
    display: grid;
    gap: 20px;
    padding: 50px 0px;
    width: 100%;
    grid-template-columns: 1fr 4fr;
    height: 100%;
    position: fixed;
    left: 0px;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    background-color: white;
    border-right: 1px solid ${palette.jarameGrey};

    svg {
        width: 45px;
    }
`;

const MenuItem = styled.div<{$isActive: boolean | undefined}>`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-itmes: center;
    justify-content: center;
    color: ${(props) => (props.$isActive ? "black" : "gray")};
    font-weight: ${(props) => (props.$isActive ? "bold" : "normal")};
    white-wrap: nowrap;
`;

export default function MyPageLayout() {
    const location = useLocation();

    return (
    <Wrapper>
        <Menu>
            <Link to="/mypage" style={{textDecoration: "none", color:"black"}}>
                <MenuItem $isActive = {location.pathname === "/mypage"}>마이 페이지</MenuItem>
            </Link>

            <Link to="/mypage/my-activites" style={{textDecoration: "none", color:"black"}}>

            <MenuItem $isActive={location.pathname === "/mypage/my-activites"}>내 활동</MenuItem>
            </Link>

            <Link to="/mypage/my-account" style={{textDecoration: "none", color:"black"}}>
            <MenuItem $isActive={location.pathname === "/mypage/my-account"}>내 계정</MenuItem>
            </Link>

        </Menu>
        <Outlet/>
    </Wrapper>
    );
}