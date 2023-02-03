import React, { FC } from "react";
//components
import { Link, Outlet } from "react-router-dom";
//utils
import { signOutUser } from "../../utils/firebase/firebase.utils";
//hooks
import { useSelector } from "react-redux";

type Props = {};

export const Navigation: FC = (props: Props) => {
    const currentUser = useSelector((state: any) => state.user.currentUser);

    const logOutHandler = () => {
        signOutUser();
    };
    return (
        <>
            <header className='  text-gray-800'>
                <div className='container flex justify-end h-16 mx-auto'>
                    <div className='items-center flex-shrink-0 hidden lg:flex'>
                        {currentUser ? (
                            <button
                                onClick={logOutHandler}
                                className='self-center px-8 py-3 font-semibold rounded bg-violet-600 text-gray-50'>
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to='/sign-in'>
                                    <button className='self-center px-8 py-3 rounded'>Sign in</button>
                                </Link>
                                <Link to='/login'>
                                    <button className='self-center px-8 py-3 font-semibold rounded bg-violet-600 text-gray-50'>
                                        Login
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                    <button className='p-4 lg:hidden'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            className='w-6 h-6 text-gray-800'>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M4 6h16M4 12h16M4 18h16'></path>
                        </svg>
                    </button>
                </div>
            </header>
            <Outlet />
        </>
    );
};
