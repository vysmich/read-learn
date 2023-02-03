import React, { useState, FC } from "react";
//components
import { InputField } from "../../components/input-field/input-field.component";
import { SocialSignUp } from "../../components/social-sign-up/social-sign-up";
//hooks
import { useNavigate } from "react-router-dom";
//utils
import { createUserWithEmail, setUserToDB } from "../../utils/firebase/firebase.utils";
//firebase
import { UserCredential } from "firebase/auth";

const defaultFormData = { email: "", password: "", confirmPassword: "", username: "" };

export const SignUp: FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(defaultFormData);

    const signUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { email, password, confirmPassword, username } = formData;

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        try {
            const UserData: UserCredential | undefined = await createUserWithEmail(email, password);

            if (UserData) {
                await setUserToDB({ ...UserData.user, displayName: username });
            }

            setFormData(defaultFormData);
            navigate("/");
        } catch (error: any) {
            if (error.code === "auth/email-already-in-use") {
                alert("Email already in use");
            } else {
                console.log("user creation error", error);
            }
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800'>
                <h1 className='text-2xl font-bold text-center'>Sign-up</h1>
                <form onSubmit={signUpHandler} className='space-y-6 ng-untouched ng-pristine ng-valid'>
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
                        value={formData.username}
                        onChange={(e) => {
                            setFormData({ ...formData, username: e.target.value });
                        }}
                        type='text'
                        name='username'
                        id='username'
                        placeholder='Username'
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
                    <InputField
                        type='password'
                        name='confirmPassword'
                        id='confirmPassword'
                        placeholder='Confirm password'
                        value={formData.confirmPassword}
                        onChange={(e) => {
                            setFormData({ ...formData, confirmPassword: e.target.value });
                        }}
                    />
                    <button className='block w-full p-3 text-center rounded-sm text-gray-50 bg-violet-600'>
                        Sign in
                    </button>
                </form>
                <SocialSignUp />
                <p className='text-xs text-center sm:px-6 text-gray-600'>
                    Already have an account??
                    <a rel='noopener noreferrer' href='#' className='underline text-gray-800'>
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};
