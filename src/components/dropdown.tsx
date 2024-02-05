import { useState } from "react";
import styled from "styled-components";
import { palette } from "../assets/styles/palette";

export const UL = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 180%;
    margin-bottom: 50px;
`;

export const LI = styled.li<{$isActive:boolean|undefined}>`
    cursor: pointer;
    color: ${(props) => (props.$isActive ? "black" : "gray")};
    font-weight: ${(props) => (props.$isActive ? "bold" : "normal")};   

`;

export const ULTitle = styled.div`
    border: 1px solid ${palette.jarameGrey};
    border-radius: 40px;
    padding: 13px;
    font-weight: bold;
    white-space: nowrap;
    cursor: pointer;
`;


const DropdownMenu = () => {
    const groups = [
        "C를 씹어먹자", "거북목탈퇴클럽", "실리콘드림"
    ];
    const [activeGroup, setActiveGroup] = useState("");

    return (
    <>
        {groups.map((item, index) => (
            <LI
                key={index}
                $isActive = {activeGroup === item}
                onClick = { () => setActiveGroup(item)}
            >{item}</LI>
        ))}
    </>
    );
};

function Dropdown() {
    const [view, setView] = useState(false);

    return (
        <UL>
            <ULTitle onClick={() => setView(!view)}>그룹 선택{" "}{view ? '▲' : '▼'}</ULTitle>
        {view && <DropdownMenu/>}
        </UL>
    );
};

export default Dropdown;