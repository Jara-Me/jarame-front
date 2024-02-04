import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
    children}:{children:React.ReactNode;}) {

    // 유저가 로그인했는지 여부
    // 유저 정보 받아오기 
    //const user = auth.currentUser;

    // 로그인 안 했으면 로그인 페이지로 이동
    // if(user === null){
    //     return <Navigate to="/login"/>;
    // }

    return children 
} 