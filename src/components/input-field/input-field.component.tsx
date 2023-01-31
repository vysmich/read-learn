import React, { FC } from "react";

type inputFieldProps = {
    type: string;
    name: string;
    id: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputField: FC<inputFieldProps> = ({ type, name, id, placeholder, value, onChange }) => {
    return (
        <div className='space-y-1 text-sm'>
            <input
                value={value}
                onChange={onChange}
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                className='w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600'
            />
        </div>
    );
};
