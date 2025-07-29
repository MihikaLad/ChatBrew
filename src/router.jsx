import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const router = createBrowserRouter([
    {path:"/", element : <App/>},
    {path:"/Register", element : <Register/>},
    {path:"/Login", element : <Login/>},
    {path:"/Home", element : <Home/>},
])