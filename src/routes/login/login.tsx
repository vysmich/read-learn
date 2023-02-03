import React, { useEffect, useState, FC } from "react";
//components
import { InputField } from "../../components/input-field/input-field.component";
import { SocialSignUp } from "../../components/social-sign-up/social-sign-up";
//utils
import { signIn } from "../../utils/firebase/firebase.utils";
//hooks
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
//types
import { RootState } from "../../store/store";

const defaultFormData = { email: "", password: "", confirmPassword: "", username: "" };

export const Login: FC = () => {
    const [formData, setFormData] = useState(defaultFormData);
    const navigate = useNavigate();
    const currentUser = useSelector((state: RootState) => state.user.currentUser);
    useEffect(() => {
        if (currentUser) {
            navigate("/books");
        }
    }, [currentUser]);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.password || !formData.email) {
            alert("Enter your login information");
        }

        try {
            signIn(formData.email, formData.password);
            setFormData(defaultFormData);
            navigate("/");
        } catch (error) {
            console.log("Login error: ", error);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800'>
                <h1 className='text-2xl font-bold text-center'>Login</h1>
                <form onSubmit={submitHandler} className='space-y-6 ng-untouched ng-pristine ng-valid'>
                    <InputField
                        value={formData.email}
                        onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                        }}
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Email'
                    />
                    <InputField
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={(e) => {
                            setFormData({ ...formData, password: e.target.value });
                        }}
                    />
                    <div className='flex justify-end text-xs text-gray-600'>
                        <a rel='noopener noreferrer' href='#'>
                            Forgot Password?
                        </a>
                    </div>

                    <button className='block w-full p-3 text-center rounded-sm text-gray-50 bg-violet-600'>
                        Sign in
                    </button>
                </form>

                <SocialSignUp />

                <p className='text-xs text-center sm:px-6 text-gray-600'>
                    Don't have an account?
                    <a rel='noopener noreferrer' href='#' className='underline text-gray-800'>
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};
