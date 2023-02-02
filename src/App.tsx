import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/login/login.component";
import { SignUp } from "./components/sign-up/sign-up.component";
import { useEffect } from "react";
import { onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./store/user/user";

function App() {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                dispatch(setCurrentUser(user));
            } else {
                console.log("user is logged out");
            }
        });
    }, []);

    return (
        <BrowserRouter>
            <section>
                <Routes>
                    <Route path='/' element={<div>Home</div>} />
                    <Route path='login' element={<Login />} />
                    <Route path='sign-up' element={<SignUp />} />
                </Routes>
            </section>
        </BrowserRouter>
    );
}

export default App;
