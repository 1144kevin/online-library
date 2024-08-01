import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/detail";
import Favorite from "./pages/favorite";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<Home/>,
    },
    {
        path:"/detail",
        element:<Detail/>,
    },
    {
        path:"/Favorite",
        element:<Favorite/>,
    },
])
