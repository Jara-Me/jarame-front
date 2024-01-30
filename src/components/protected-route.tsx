import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({
    children}:{children:React.ReactNode;}) {

        // 유저가 로그인했는지 여부
    const user = auth.currentUser;

    // 로그인 안 했으면 로그인 페이지로 이동
    if(user === null){
        return <Navigate to="/login"/>;
    }

    return children 
} 