import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Navigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { fetchAuth, selectProfileData } from '../../Store/Slices/profile';

const SignIn = () => {
    const profileData = useSelector(selectProfileData);
    const dispatch = useDispatch();
    const {
        register, 
        handleSubmit, 
        formState: { errors, isValid },
        reset
    } = useForm({ 
        defaultValues: {
            email: "",
            password: "",
        }, 
        mode: "onBlur",
    });

    const onSubmit = async (values) => {
        reset();
        const data = await dispatch(fetchAuth(values));
        if (!data.payload) {
            alert("Не вдалось авторизуватися, не правильний пароль або пошта!");
        }
    };
    if (profileData.IsAuth) {
        return <Navigate to='/'/>
    }
    
    return (
        <div className='mt-16'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col px-7 py-6 rounded-2xl max-w-sm mx-auto shadow-lg bg-gray-800'>
                <h1 className='mx-auto my-6 text-2xl font-semibold'>Авторизація</h1>
                <div className='mb-2'>
                    <div className='flex items-start justify-between'>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                            Email
                        </label>
                        <span name="error_email" className='block text-xs font-medium leading-6 text-rose-500'>{errors?.email && "Не правильний формат!"}</span>
                    </div>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder='Введіть email...'
                            {...register("email", { required: "Введіть email!" })}
                        />
                    </div>
                </div>
                <div className='mb-2'>
                    <div className='flex items-start justify-between'>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                            Пароль
                        </label>
                        <span name="error_pass" className='block text-xs font-medium leading-6 text-rose-500'>{errors?.password && "Пароль повинен мати не менше 8 символів"}</span>
                    </div>
                    
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder='Введіть пароль...'
                            {...register("password", { required: "Введіть пароль!", pattern: {value: /[A-Z a-z 0-9]{4}/, message:"Пароль повинен мати не менше 4 символів"}})}
                        />
                    </div>
                </div>
                <button type="submit" disabled={!isValid} className='mx-auto my-4 px-4 py-1 bg-sky-500 text-lg font-medium rounded-xl'>Увійти</button>
                <p className='text-sm font-normal mx-auto'>Немає аккаунту? <NavLink className="text-sm font-normal text-sky-400 transition-all ease-linear hover:text-sky-600" to='/signup'>Зареєструватися</NavLink></p>
            </form>
        </div>
    )
}

export default SignIn