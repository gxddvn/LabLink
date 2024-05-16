import React from 'react'
import { NavLink, useLocation } from "react-router-dom";

const Footer = () => {
    const location = useLocation();
    const isSignupOrSignin = location.pathname === '/signup' || location.pathname === '/signin' || location.pathname === '/profile' || location.pathname === '/analyzesresult';
    if (isSignupOrSignin) {
        return null;
    }
    return (
        <>
            <div className='shadow-[0_0px_0px_1px_rgba(0,0,0,0.1)] shadow-gray-500 px-8 py-7 flex items-center justify-around'>
                <div className='flex flex-col items-start'>
                    <h1 className='text-xl font-medium mb-2'>Пацієнту</h1>
                    <NavLink className="text-sm font-normal transition-all ease-linear hover:text-sky-300 my-1" to='/profile'>Особистий кабінет</NavLink>
                    <NavLink className="text-sm font-normal transition-all ease-linear hover:text-sky-300 my-1" to='/analyzesresult'>Результати аналізів</NavLink>
                    <NavLink className="text-sm font-normal transition-all ease-linear hover:text-sky-300 my-1" to='/'>Вийти з аккаунту</NavLink>
                </div>
                <a className='text-base font-normal transition-all ease-linear hover:text-sky-300' href="mailto:lablinkemail@gmail.com">lablinkemail@gmail.com</a>
                <div className='flex flex-col'>
                    <a className='text-base font-normal transition-all ease-linear hover:text-sky-300' href="tel:+380954563740">+380954563740</a>
                    <button className='bg-sky-500 text-base font-normal px-3 py-2 my-2 rounded-xl transition-all ease-linear hover:bg-sky-600'>Замовити дзвінок</button>
                </div>
            </div>
        </>
    )
}
export default Footer