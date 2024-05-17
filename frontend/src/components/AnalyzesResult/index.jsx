import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectProfileData } from '../../Store/Slices/profile';
import { Navigate } from 'react-router-dom';
import axios from '../../axios';
import CustomModal from '../CustomModal';

const AnalyzesResult = () => {
    const profileData = useSelector(selectProfileData);
    const [isPage, setIsPage] = useState(1);
    const [analyzesResults, setAnalyzesResults] = useState([]);
    const [predictionResults, setPredictionResults] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    React.useEffect(() => {
        if (profileData?.userMe?.id && isPage === 1) {
            axios.get(`analyzes-result/getusersall/${profileData?.userMe?.id}`)
            .then((res) => {
                console.log(res)
                setAnalyzesResults(res.data);
            })
            .catch((e) => {
                console.error(e);
            })
        }
        else if (profileData?.userMe?.id && isPage === 2) {
            axios.get(`prediction/getallbyid/${profileData?.userMe?.id}`)
            .then((res) => {
                console.log(res)
                setPredictionResults(res.data);
            })
            .catch((e) => {
                console.error(e);
            })
        }
    }, [isPage])
    
    const sendAnalyzesOnEmail = async () => {
        await axios.get(`analyzes-result/sendpdf/${profileData?.userMe?.id}`)
        .then((res) => {
            setIsOpen(true)
            // alert("Результати аналізів були успішно відправлені")
        })
        .catch((e) => {
            console.error(e);
        })
    }

    if (!profileData.IsAuth) {
        return <Navigate to='/'/>
    }
    return (
        <div className='py-10'>
            <div className='flex items-center mb-10'>
                <button onClick={() => setIsPage(1)} className={`text-base font-medium ${isPage===1 ? `bg-sky-600` : `bg-sky-500`} px-3 py-2 rounded-l-xl transition-all ease-linear hover:${isPage===1 ? `bg-sky-600` : `bg-sky-700`}`}>Результати аналізів</button>
                <button onClick={() => setIsPage(2)} className={`text-base font-medium ${isPage===2 ? `bg-sky-600` : `bg-sky-500`} px-3 py-2 rounded-r-xl transition-all ease-linear hover:${isPage===2 ? `bg-sky-600` : `bg-sky-700`}`}>Прогнозування діабету</button>
            </div>
            {isPage===1 ? (
                <>
                    <div className='flex justify-between items-center mb-10'>
                        <h1 className='text-3xl font-semibold'>Результати аналізів</h1>
                        <button onClick={() => {sendAnalyzesOnEmail()}} className='text-base font-medium bg-sky-500 px-3 py-2 rounded-xl transition-all ease-linear hover:bg-sky-700'>Відправити аналізи</button>
                        <CustomModal className="absolute z-50" isOpen={isOpen} onClose={() => setIsOpen(false)} title="Сповіщення" buttonName="Змінити">
                            <p className='text-xl font-normal my-5 max-w-96'>Результати аналізів були успішно відправлені!</p>
                            <div className='flex justify-center items-center my-2'>
                                <button onClick={() => setIsOpen(false)} className='text-base font-medium bg-sky-500 px-3 py-2 rounded-xl transition-all ease-linear hover:bg-sky-700'>Ок</button>
                            </div>
                            
                        </CustomModal>
                    </div>
                    <table className="w-full border-collapse border border-slate-500 bg-gray-800">
                        <thead>
                            <tr>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-24'>Дата та час</th>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-20'>Загальний білок</th>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-20'>Альбумін</th>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-20'>Глюкоза</th>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-20'>Сечовина</th>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-20'>Креатинін</th>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-20'>Холестерин загальний</th>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-20'>Білірубін прямий</th>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-20'>Білірубін загальний</th>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-20'>Грансаміназа АЛТ</th>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-20'>Грансаміназа АСТ</th>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-20'>Аміназа</th>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-20'>ЛДГ</th>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-20'>Креатинкі-<br/>наза, КФК</th>
                            </tr>
                        </thead>
                        <tbody>
                            {analyzesResults && analyzesResults?.map((item, index) => (
                                <tr key={index}>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.createdAt}</td>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.total_protein}</td>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.albumin}</td>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.glucose}</td>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.urea}</td>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.creatinine}</td>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.total_cholesterol}</td>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.direct_bilirubin}</td>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.total_bilirubin}</td>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.alt}</td>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.ast}</td>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.amylase}</td>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.ldh}</td>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.ck}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <>
                    <h1 className='text-3xl font-semibold mt-10 mb-6'>Прогнозування діабету за результатами аналізів</h1>
                    <table className="w-full border-collapse border border-slate-500 bg-gray-800">
                        <thead>
                            <tr>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-20'>Дата та час</th>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-24'>Стать</th>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-20'>Вік</th>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-20'>Гіпертонія</th>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-20'>Хвороба серця</th>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-20'>Історія куріння</th>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-20'>ІМТ</th>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-20'>Рівень HbA1c</th>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-20'>Рівень глюкози в крові</th>
                                <th className='border border-slate-600 text-xs font-medium mx-1 max-w-20'>Прогноз діабету</th>
                            </tr>
                        </thead>
                        <tbody>
                            {predictionResults && predictionResults?.map((item, index) => (
                                <tr key={index}>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.createdAt}</td>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.gender==="Male" ? ("Чоловік") : ("Жінка")}</td>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.age}</td>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.hypertension}</td>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.heart_disease}</td>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.smoking_history}</td>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.bmi}</td>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.HbA1c_level}</td>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.blood_glucose_level}</td>
                                    <td className='border border-slate-600 text-xs font-normal text-center'>{item.diabetes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    )
}

export default AnalyzesResult