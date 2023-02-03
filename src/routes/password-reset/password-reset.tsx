import React, { useState, FC } from "react";
//components
import { InputField } from "../../components/input-field/input-field.component";
//utils
import { resetPassword } from "../../utils/firebase/firebase.utils";
//hooks
import { useNavigate } from "react-router-dom";

const defaultFormData = { email: "" };

export const PasswordReset: FC = () => {
    const [formData, setFormData] = useState(defaultFormData);
    const navigate = useNavigate();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email } = formData;
        resetPassword(email);
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800'>
                <h1 className='text-2xl font-bold text-center'>Password reset</h1>
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

                    <button className='block w-full p-3 text-center rounded-sm text-gray-50 bg-violet-600'>Send</button>
                </form>
            </div>
        </div>
    );
};
