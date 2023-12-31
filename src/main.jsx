import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import AuthProvider from "./context/AuthProvider";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, GlobalStyles } from "@mui/material";
import Room from "./pages/Room";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },{
        path: "/chat/:id",
        element: <Room/>,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline/>
    <GlobalStyles styles={{
      a:{
        color:"inherit",
        textDecoration:"none"
      }
    }}/>
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
   
  </React.StrictMode>
);
