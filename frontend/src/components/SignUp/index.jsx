import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Navigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { fetchRegister, selectProfileData } from '../../Store/Slices/profile';

const SignUp = () => {
    const profileData = useSelector(selectProfileData);
    const dispatch = useDispatch();
    const {
        register, 
        handleSubmit, 
        formState: { errors, isValid },
        reset
    } = useForm({ 
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            gender: "",
            passvalidate: ""
        }, 
        mode: "onBlur",
    });

    const onSubmit = async (values) => {
        console.log(values);
        if (values.password === values.passvalidate) {
            const {passvalidate, ...user} = values;
            reset();
            const data = await dispatch(fetchRegister(user));
            if (!data.payload) {
                alert("Не вдалось зареєструватись!");
            }
        } else {
            alert("Пароль та повтор паролю не сходятся!")
        }
    };
    if (profileData.IsAuth) {
        return <Navigate to='/'/>
    }
    return (
        <div className='mt-16'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col px-7 py-6 rounded-2xl max-w-xl mx-auto shadow-lg bg-gray-800'>
                <h1 className='mx-auto mb-6 text-2xl font-semibold'>Реєстрація</h1>
                <div className='flex items-center justify-between mb-2'>
                    <div>
                        <div className='flex items-start justify-between'>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 ">
                                ПІБ
                            </label>
                            <span name="error_name" className='block text-xs font-medium leading-6 text-rose-500'>{errors?.name && "Min 8 символів!"}</span>
                        </div>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="block w-60 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder='Введіть ПІБ...'
                                {...register("name", { required: "Введіть ПІБ!", pattern: {value: /[А-Я а-я A-Z a-z]{8}/, message:"Min 8 символів!"}})}
                            />
                        </div>
                    </div>
                    <div>
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
                                className="block w-60 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder='Введіть email...'
                                {...register("email", { required: "Введіть email!"})}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-between mb-2'>
                    <div>
                        <div className='flex items-start justify-between'>
                            <label htmlFor="phone" className="block text-sm font-medium leading-6 ">
                                Номер телефону
                            </label>
                            <span name="error_phone" className='block text-xs font-medium leading-6 text-rose-500'>{errors?.phone && "Min 10 символів!"}</span>
                        </div>
                        <div className="mt-2">
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                className="block w-60 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder='Введіть номер телефону...'
                                {...register("phone", { required: "Введіть номер телефону!", pattern: {value: /[0-9]{10}/, message:"Min 10 символів!"}})}
                            />
                        </div>
                    </div>
                    <div>
                        <div className='flex items-start justify-between'>
                            <label htmlFor="select" className="block text-sm font-medium leading-6 ">
                                Стать
                            </label>
                            <span name="error_gender" className='block text-xs font-medium leading-6 text-rose-500'></span>
                        </div>
                        
                        <div className="mt-2">
                            <select 
                                className='block w-60 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' 
                                name="select"
                                {...register("gender", { required: "Оберіть стать!" })}>
                                <option value="Чоловік" className='block w-60 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6'>Чоловік</option>
                                <option value="Жінка" className='block w-60 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6'>Жінка</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-between mb-2'>
                    <div>
                        <div className='flex items-start justify-between'>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                                Пароль
                            </label>
                            <span name="error_pass" className='block text-xs font-medium leading-6 text-rose-500'>{errors?.password && "Min 4 символів!"}</span>
                        </div>
                        
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-60 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder='Введіть пароль...'
                                {...register("password", { required: "Введіть пароль!", pattern: {value: /[A-Z a-z 0-9]{4}/, message:"Min 4 символів!"}})}
                            />
                        </div>
                    </div>
                    <div>
                        <div className='flex items-start justify-between'>
                            <label htmlFor="passvalidate" className="block text-sm font-medium leading-6 ">
                                Повторіть пароль
                            </label>
                            <span name="error_pass" className='block text-xs font-medium leading-6 text-rose-500'>{errors?.passvalidate && "Min 8 символів!"}</span>
                        </div>
                        
                        <div className="mt-2">
                            <input
                                id="passvalidate"
                                name="passvalidate"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-60 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder='Введіть пароль...'
                                {...register("passvalidate", { required: "Підтвердіть свій пароль!", pattern: {value: /[A-Z a-z 0-9]{4}/, message:"Min 4 символів!"} })}
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" disabled={!isValid} className='mx-auto my-4 px-4 py-1 bg-sky-500 text-lg font-medium rounded-xl'>Зареєструватися</button>
                <p className='text-sm font-normal mx-auto'>Увійти до аккаунту? <NavLink className="text-sm font-normal text-sky-400 transition-all ease-linear hover:text-sky-600" to='/signin'>Авторизація</NavLink></p>
            </form>
        </div>
    )
}

export default SignUp