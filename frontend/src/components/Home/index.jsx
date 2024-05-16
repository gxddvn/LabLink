import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from '../../axios';
import { useSelector } from 'react-redux';
import { selectProfileData } from '../../Store/Slices/profile';
import CustomModal from '../CustomModal';


const Home = () => {
    const profileData = useSelector(selectProfileData);
    const [isOpen, setIsOpen] = useState(false)

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
        const data = await axios.post("/records/", values)
        !data.data?.id ? alert("Не вдалося записатись на консультацію!") : reset()
    };

    return (
        <div className="flex flex-col items-center py-12">
            <form onSubmit={handleSubmit(onSubmit)} className='shadow-lg px-6 py-5 rounded-2xl bg-gray-800'>
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
            <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Успішно записан" buttonName="Ок"></CustomModal>
            <div className='my-24'>
                <h1 className='text-3xl font-semibold mb-6'>Lorem ipsum...</h1>
                <p className='text-base font-normal my-2 indent-8'> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vestibulum vel orci eget vehicula. Nullam fringilla erat 
                    a nisi convallis, in molestie dolor imperdiet. Quisque ut ipsum auctor, consequat magna in, euismod orci. Morbi quis dolor 
                    malesuada, convallis arcu non, varius diam. Integer libero felis, ultrices aliquam libero eget, porta rutrum ex. 
                    Aliquam erat volutpat. Nam blandit euismod aliquam. Phasellus facilisis tempor condimentum. Quisque imperdiet maximus metus id efficitur. 
                    Sed consectetur ex neque, vel dignissim sapien cursus nec. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
                    Sed pretium dolor ante, fringilla consectetur metus dictum ac. Sed massa elit, dignissim lacinia semper sed, porta id arcu.
                </p>
                <p className='text-base font-normal my-2 indent-8'>
                    Suspendisse vel mattis augue, eu venenatis libero. Cras laoreet nunc neque, vel semper elit mollis in. Praesent vulputate tortor 
                    quis lectus blandit, non mattis ex sodales. In eu congue massa. Ut placerat arcu a vehicula auctor. Phasellus dignissim, odio a rutrum porta, 
                    libero ligula viverra mi, a viverra velit mauris non nisi. Aenean euismod facilisis dolor non mattis. Mauris aliquam, 
                    ligula ut lacinia malesuada, leo neque elementum urna, ac lobortis est libero et sem. Morbi nisl purus, accumsan sed est scelerisque, 
                    laoreet mollis arcu. Morbi eget volutpat augue, non blandit neque.
                </p>
                <p className='text-base font-normal my-2 indent-8'>
                    Sed a maximus nibh. Sed eu risus ac velit rhoncus iaculis in ac ante. Pellentesque lacinia urna non leo posuere sollicitudin. 
                    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed nisi diam, sodales ut placerat sit amet, 
                    faucibus eget odio. Phasellus non bibendum sem, id faucibus est. Ut nec tellus dui. Praesent semper tellus sed lorem hendrerit imperdiet. 
                    In hac habitasse platea dictumst. Nulla laoreet cursus nunc, id dapibus dui interdum in. Nulla facilisi. Donec lectus magna, tincidunt quis est et, 
                    sagittis facilisis dolor. Vivamus purus diam, ullamcorper a cursus a, blandit id sem.
                </p>
                <p className='text-base font-normal my-2 indent-8'>
                    Praesent sit amet nisi condimentum, semper tellus in, pellentesque lorem. Praesent massa enim, blandit eget euismod sit amet, feugiat eget massa. 
                    Proin consequat, est et aliquet tristique, felis risus egestas elit, accumsan viverra magna eros euismod eros. In tempor, purus et lobortis cursus, 
                    metus augue ullamcorper tortor, ut faucibus neque nunc et nunc. Morbi eget ullamcorper ante, et consequat ipsum. Class aptent taciti sociosqu 
                    ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum auctor purus quam, vitae posuere urna pretium ultrices. 
                    Phasellus eget purus nibh. Proin tincidunt a nibh ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
                    Etiam tellus est, aliquet id hendrerit ut, ultricies ut diam. Vestibulum vel purus justo. Nullam hendrerit semper arcu. 
                    Duis porttitor lacus nec purus finibus vestibulum. Maecenas laoreet dolor eu ipsum tincidunt, vitae placerat ex mollis. 
                    Phasellus accumsan turpis in dolor efficitur porta.
                </p>
                <p className='text-base font-normal my-2 indent-8'>
                    Nunc sollicitudin bibendum posuere. Nunc molestie viverra pulvinar. Proin sit amet velit non erat tincidunt accumsan nec sed quam. 
                    Morbi non pulvinar risus, ultricies sodales nibh. Vestibulum pretium cursus neque, a lacinia urna aliquet id. 
                    Morbi fermentum justo diam, ac imperdiet ante condimentum vitae. Donec eros quam, placerat sed metus ut, convallis sodales nibh. 
                    Morbi a nulla ex. Mauris vestibulum, dui mollis malesuada porta, orci nibh elementum quam, vel tempus sapien massa in augue. 
                    Morbi sit amet gravida felis, vel cursus lacus. Nullam cursus eu orci ac consectetur. Quisque ligula massa, vulputate a faucibus ut, 
                    consequat non mi. Nam egestas nec dui ut dignissim. Vivamus eleifend ante justo, a porttitor ligula feugiat eu. Vivamus nec dictum neque.
                </p>
            </div>
        </div>
    )
}

export default Home