import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/login/login.component";
import { SignUp } from "./components/sign-up/sign-up.component";

function App() {
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
