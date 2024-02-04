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
import Group from "./routes/group";
import MyPage from "./routes/my-page";
import MyActivites from "./routes/my-activites";
import MyAccount from "./routes/my-account";
import MyPageLayout from "./components/mypage-layout";
import ProtectedRoute from "./components/protected-route";
import Main from "./routes/main";
import MyJaraus from "./routes/MyJaraus";
import SearchDetail from "./routes/SearchDetail";
import { useCookies } from "react-cookie";

const router = createBrowserRouter([
  // router 설정 부분
  {
    path: "",
    element: (
      //<ProtectedRoute>
        <Layout />
      //</ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/group",
        element: <Group />
      },
      {
        path: "/main",
        element: <Main/>
      },
      {
        path: "/my",
        element: <MyJaraus/>
      },
      {
        path: "/sd",
        element: <SearchDetail/>
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
  const [isLoading, setIsLoading] = useState(true);

  const init = async() => {
    // 유저 로그인했는지 체크하는 로직
    setIsLoading(false);
  };

  useEffect( () => {
    init();
  }, []);

  return (
    <Wrapper>
      <GlobalStyles/>
      {isLoading ? <LoadingScreen/> : <RouterProvider router={router}/>}
      {/* <RouterProvider router={router}/> */}
    </Wrapper>
  );
}

export default App;
