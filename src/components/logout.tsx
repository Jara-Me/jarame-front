import axios from "axios";
import { useNavigate } from "react-router-dom";

const handleLogout = async() => {
    const navigate = useNavigate();
    // 로그아웃 호출하는 함수 내부 최상단에 선언하고 위 코드 지울 것

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

export default onClickLogout;