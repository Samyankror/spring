import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Quiz from "../pages/Quiz";
import Admin from "../pages/Admin";
import AdminQuiz from "../pages/AdminQuiz";
import SignUp from "../pages/SignUp";
import { Provider } from "react-redux";
import { store } from "../redux/store.js";

function AppRoutes(){
    return(
        <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin-quiz" element={<AdminQuiz />} />
            </Routes>
        </BrowserRouter>
        </Provider>
    )
}

export default AppRoutes;