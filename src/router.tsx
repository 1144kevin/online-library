import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/detail";
import Favorite from "./pages/favorite";
import Add from "./pages/add"
import Update from "./pages/update"

export default function Router() {
    return (
        <BrowserRouter >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorite" element={<Favorite />} />
                <Route path="/add" element={<Add />} />
                <Route path="detail">
                    <Route path="id/:dataId" element={<Detail />} />
                    <Route path="id/:dataId/update" element={<Update />} />
                    
                    {/* <Route path="id/:productId/music/id/:productId" element={<Detail />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}