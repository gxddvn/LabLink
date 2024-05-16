import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchUpdateProfile, selectProfileData } from '../../Store/Slices/profile'
import CustomModal from '../CustomModal';


const Profile = () => {
    const dispatch = useDispatch();
    const profileData = useSelector(selectProfileData);
    const [isOpen, setIsOpen] = useState(false)
    
    const {
        register, 
        handleSubmit, 
        formState: { errors, isValid },
        reset
    } = useForm({ 
        defaultValues: {
            name: profileData.userMe?.name ,
            gender: profileData.userMe?.gender,
            phone: profileData.userMe?.phone,
            email: profileData.userMe?.email,
        }, 
        mode: "onBlur",
    });

    const onSubmit = async (values) => {
        const user = {id: profileData.userMe.id, ...values}
        const data = await dispatch(fetchUpdateProfile(user));
        if (data.payload) {
            setIsOpen(false);
        }
    }

    if (!profileData.IsAuth) {
        return <Navigate to='/'/>
    }

    return (
        <div className='py-6'>
            <CustomModal className="absolute z-50" isOpen={isOpen} onClose={() => setIsOpen(false)} title="Редагування даних" buttonName="Змінити">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-2'>
                        <div className='flex items-start justify-between'>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 ">
                                ПІБ
                            </label>
                            <span name="error_name" className='block text-xs font-medium leading-6 text-rose-500'>{errors?.name && "Min 8 символів"}</span>
                        </div>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                defaultValue={profileData.userMe?.name}
                                required
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder='Введіть ПІБ...'
                                {...register("name", { required: "Введіть ПІБ!", pattern: {value: /[А-Я а-я A-Z a-z]{8}/, message:"Min 8 символів!"}})}
                            />
                        </div>
                    </div>
                    <div className='mb-2'>
                        <div className='flex items-start justify-between'>
                            <label htmlFor="gender" className="block text-sm font-medium leading-6 ">
                                Стать
                            </label>
                            <span name="error_gender" className='block text-xs font-medium leading-6 text-rose-500'></span>
                        </div>
                        <select 
                            defaultValue={profileData.userMe?.gender}
                            className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' 
                            name="gender"
                            {...register("gender", { required: "Оберіть стать!" })}>
                            <option value="Чоловік" className='block w-60 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6'>Чоловік</option>
                            <option value="Жінка" className='block w-60 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6'>Жінка</option>
                        </select>
                    </div>
                    <div className='mb-2'>
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
                                autoComplete="phone"
                                defaultValue={profileData.userMe?.phone}
                                required
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder='Введіть номер телефону...'
                                {...register("phone", { required: "Введіть номер телефону!", pattern: {value: /[0-9]{10}/, message:"Min 10 символів!"}})}
                            />
                        </div>
                    </div>
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
                                defaultValue={profileData.userMe?.email}
                                required
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder='Введіть email...'
                                {...register("email", { required: "Введіть email!"})}
                            />
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button type="submit" disabled={!isValid} className='mx-auto my-4 px-4 py-1 bg-sky-500 text-lg font-medium rounded-xl'>Змінити</button>
                    </div>
                </form>
            </CustomModal>
            <div className='shadow-lg px-9 py-8 rounded-2xl bg-gray-800'>
                <h1 className='mb-6 text-center text-3xl font-semibold'>Особистий кабінет</h1>
                <div className='flex justify-between'>
                    <div>
                        <p className='text-base font-medium'>ПІБ: <span className='text-base font-normal'>{profileData.userMe?.name}</span></p>
                        <p className='text-base font-medium'>Стать: <span className='text-base font-normal'>{profileData.userMe?.gender}</span></p>
                        <p className='text-base font-medium'>Номер телефону: <span className='text-base font-normal'>{profileData.userMe?.phone}</span></p>
                        <p className='text-base font-medium'>Email: <span className='text-base font-normal'>{profileData.userMe?.email}</span></p>
                    </div>
                    <div>
                        <button onClick={() => setIsOpen(true)} className='text-base font-medium bg-sky-500 px-4 py-3 rounded-xl transition-all ease-linear hover:bg-sky-700'>
                            Редагувати дані
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile