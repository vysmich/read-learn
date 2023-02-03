import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./routes/login/login";
import { SignUp } from "./routes/sign-up/sign-up";
import { Books } from "./routes/Books/books";
import { useEffect } from "react";
import { isUserInDB, onAuthStateChangedListener, setUserToDB } from "./utils/firebase/firebase.utils";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./store/user/user";
import { Navigation } from "./routes/navigation/navigation";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                dispatch(setCurrentUser(user));
                setUserToDB(user);
            } else {
                dispatch(setCurrentUser(null));
                // console.log("user is logged out");
            }
        });
    }, []);

    return (
        <BrowserRouter>
            <section>
                <Routes>
                    <Route path='/' element={<Navigation />}>
                        <Route index element={<Login />} />
                        <Route path='books' element={<Books />} />
                        <Route path='sign-up' element={<SignUp />} />
                    </Route>
                </Routes>
            </section>
        </BrowserRouter>
    );
}

export default App;
