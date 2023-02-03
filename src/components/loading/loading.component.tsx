import React from "react";

type Props = {};

export const Loading = (props: Props) => {
    return (
        <div className='absolute flex justify-center top-0 left-0 w-screen h-screen bg-slate-200'>
            <div className='flex items-center justify-center space-x-2'>
                <div className='w-4 h-4 rounded-full animate-pulse bg-violet-600'></div>
                <div className='w-4 h-4 rounded-full animate-pulse bg-violet-600'></div>
                <div className='w-4 h-4 rounded-full animate-pulse bg-violet-600'></div>
            </div>
        </div>
    );
};
