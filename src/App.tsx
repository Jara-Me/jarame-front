import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import CreateAccount from "./routes/create-account";
import Login from "./routes/login";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useState } from "react";
import { useEffect } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import Group from "./routes/group";
import MyPage from "./routes/my-page";
import MyActivites from "./routes/my-activites";
import MyAccount from "./routes/my-account";
import MyPageLayout from "./components/mypage-layout";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
  // router 설정 부분
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path: "/group",
        element: <Group />
      },
      {
        path: "/mypage",
        element: <MyPageLayout />,
        children: [
          {
            path: "",
            element: <MyPage/>,
          },
          {
            path: "my-activites",
            element: <MyActivites/>
          },
          {
            path: "my-account",
            element: <MyAccount/>,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element:<Login/>
  },
  {
    path: "/create-account",
    element:<CreateAccount/>
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div `
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  // 파이어베이스가 유저 체크하는 동안 사용자에게 로딩 화면 보여 줌
  const [isLoading, setIsLoading] = useState(true);
  const init = async() => {
    // wait for firebase
    await auth.authStateReady();
    setIsLoading(false);
  };
  useEffect( () => {
    init();
  }, []);

  return (
    <Wrapper>
    <GlobalStyles/>
    {isLoading ? <LoadingScreen/> : <RouterProvider router={router}/>}
    </Wrapper>
  );
}

export default App;
