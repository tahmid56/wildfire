import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import wildfireLogo from '../assets/images/Logo_background.jpg';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth();
    const [pageState, setPageState] = useState('login');
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setPageState('Profile');
            } else {
                setPageState('login');
            }
        });
    }, [auth]);
    return (
        <div className=" top-0 z-40">
            <header className="h-[10vh] flex justify-between items-center max-w-6xl mx-auto pr-2">
                <div className="flex items-center">
                    <img
                        src={wildfireLogo}
                        alt="logo"
                        className="h-[10vh] cursor-pointer"
                        onClick={() => navigate('/')}
                    />
                    <h1 className="font-bold text-[#7A4249]">WILDFIRE</h1>
                </div>
                <div className="">
                    <ul className="flex space-x-6">
                        <Link to="/">
                            <li
                                className={
                                    location.pathname == '/'
                                        ? 'py-3 text-sm font-semibold border-b-[3px] text-black border-b-red-500'
                                        : 'py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent'
                                }
                            >
                                Home
                            </li>
                        </Link>
                        <Link to="/contact">
                            <li
                                className={
                                    location.pathname == '/contact'
                                        ? 'py-3 text-sm font-semibold border-b-[3px] text-black border-b-red-500'
                                        : 'py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent'
                                }
                            >
                                Contacts
                            </li>
                        </Link>
                        <Link to={pageState == 'login' ? '/login' : '/profile'}>
                            <li
                                className={
                                    location.pathname == '/login' || location.pathname == '/profile'
                                        ? 'py-3 text-sm font-semibold border-b-[3px] text-black border-b-red-500'
                                        : 'py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent'
                                }
                            >
                                {pageState}
                            </li>
                        </Link>
                    </ul>
                </div>
            </header>
        </div>
    );
};

export default Header;
