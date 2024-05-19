import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from '../../axios';
import { useSelector } from 'react-redux';
import { selectProfileData } from '../../Store/Slices/profile';
import CustomModal from '../CustomModal';
import Slider from './Slider';


const Home = () => {
    const profileData = useSelector(selectProfileData);
    const [isOpen, setIsOpen] = useState(false)
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const {
        register, 
        handleSubmit, 
        formState: { errors, isValid },
        reset
    } = useForm({ 
        defaultValues: {
            name: profileData.userMe?.name || "",
            phone: profileData.userMe?.phone || "",
            question: ""
        }, 
        mode: "onBlur",
    });

    const onSubmit = async (values) => {
        if (profileData.IsAuth) {
            const data = await axios.post("/records/", values)
            !data.data?.id ? alert("Не вдалося записатись на консультацію!") : reset()
        }
    };

    return (

        
        <div className="flex flex-col items-center py-12">
            <div className='flex relative'>
                <Slider img_list={['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg']}/>
                <span className='absolute max-w-96 text-2xl font-semibold bg-[rgba(17,24,39,0.7)] rounded-md top-52 left-16 px-2 py-1'>Lab<span className='text-2xl font-semibold text-sky-500'>Link</span> – це ваш надійний союзник у підтримці здоров’я!</span>
            </div>
            <div className='my-12'>
                <h1 className='text-3xl font-semibold mb-6'>Про нас</h1>
                <p className='text-base font-normal my-2 indent-8'> Ласкаво просимо до LabLink! Ваш надійний партнер у світі медичної діагностики. 
                    LabLink – це сучасна медична лабораторія, яка пропонує широкий спектр високоякісних діагностичних послуг для вашого здоров’я та благополуччя. 
                    Ми прагнемо забезпечити точні, швидкі та зручні лабораторні дослідження для наших клієнтів.
                </p>
                <p className='text-base font-normal my-2 indent-8'>
                    Наші переваги: сучасне обладнання – ми використовуємо новітні технології та обладнання для гарантії точності результатів; 
                    професійний персонал – наші фахівці це досвідчені медики з багаторічним стажем роботи; широкий спектр послуг – від базових аналізів 
                    крові до складних генетичних досліджень; швидкість та зручність – результати досліджень доступні в найкоротші терміни, 
                    а запис на аналізи онлайн; індивідуальний підхід – ми дбаємо про кожного клієнта, пропонуючи індивідуальні консультації та рекомендації.
                </p>
                <p className='text-base font-normal my-2 indent-8'>
                    Наші послуги: аналізи крові та сечі, гормональні дослідження, біохімічні дослідження, імунологічні тести, 
                    генетичні тести, аналізи на інфекційні захворювання.
                </p>
                <p className='text-base font-normal my-2 indent-8'>
                Як це працює: запис онлайн – обирайте зручний час для візиту через наш веб-сайт; відвідування лабораторії – професійне обслуговування в комфортних умовах; 
                отримання результатів – результати доступні онлайн або за бажанням на паперовому носії; консультації та підтримка – 
                наші фахівці готові надати рекомендації та відповісти на ваші запитання.
                </p>
                <p className='text-base font-normal my-2 indent-8'>
                    Не відкладайте турботу про своє здоров'я! Зв'яжіться з нами сьогодні для отримання детальної інформації про наші послуги та запису на дослідження.
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='shadow-lg px-6 py-5 mb-5 rounded-2xl bg-gray-800'>
                <h1 className='text-3xl font-semibold mb-6'>Звернутися за консультацією</h1>
                <div className="relative my-5 rounded-md shadow-sm">
                    <input
                        type="text"
                        name="pib"
                        id="pib"
                        defaultValue={profileData.userMe?.name || ""}
                        className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Введіть ПІБ..."
                        {...register("name", { required: "Введіть ПІБ!"})}
                    />
                </div>
                <div className="relative mt-2 my-5 rounded-md shadow-sm">
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        defaultValue={profileData.userMe?.phone || ""}
                        className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Введіть номер телефону.."
                        {...register("phone", { required: "Введіть номер телефону!", pattern: {value: /[0-9]{10}/, message:"Min 10 символів!"}})}
                    />
                </div>
                <div className="relative mt-2 my-5 rounded-md shadow-sm">
                    <input
                        type="text"
                        name="message"
                        id="message"
                        className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Введіть ваше запитання..."
                        {...register("question", { required: "Введіть ваше запитання!"})}
                    />
                </div>
                <div className='flex justify-center items-center'>
                    <button type="submit" disabled={!isValid} onClick={() => setIsOpen(true)} className='bg-sky-500 transition-all ease-linear hover:bg-sky-600 text-base px-2 py-1 rounded-md font-medium'>Відправити</button>
                </div>
            </form>
            {profileData.IsAuth && (<CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Успішно записан" buttonName="Ок"></CustomModal>)}
        </div>
    )
}

export default Home