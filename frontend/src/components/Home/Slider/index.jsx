import React, { useState } from 'react'

const Slider = ({img_list = [], }) => {
    const [isSlide, setIsSlide] = useState(0)
    console.log(img_list);
    console.log(isSlide);
    return (
        <div className='flex relative'>
            <img className='max-w-2xl' src={`src/components/Home/${img_list[isSlide]}`} alt="" />
            <div className='absolute w-full h-full flex justify-between'>
                <button className='px-3 bg-[rgba(17,24,39,0.3)] transition-all ease-linear hover:bg-[rgba(17,24,39,0.5)]' onClick={() => isSlide>0 ? setIsSlide(isSlide-1) : setIsSlide(0)}>{`<`}</button>
                <div className='flex items-end'>
                    {img_list && img_list?.map((img,index) => (
                        <div className={isSlide===index ? `text-gray-900` : `text-white`} key={index}>-</div>
                    ))}
                </div>
                <button className='px-3 bg-[rgba(17,24,39,0.3)] transition-all ease-linear hover:bg-[rgba(17,24,39,0.5)]' onClick={() => isSlide===img_list.length-1 ? setIsSlide(0) : setIsSlide(isSlide+1)}>{`>`}</button>
            </div>
        </div>
    )
}

export default Slider