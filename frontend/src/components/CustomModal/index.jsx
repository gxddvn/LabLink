import Modal  from "react-modal";
import React from 'react'

const CustomModal = ({isOpen, onClose, title, buttonName, children}) => {
    return (
        <Modal isOpen={Boolean(isOpen)} onClose={() => onClose()} ariaHideApp={false} onRequestClose={() => onClose()} overlayClassName="fixed top-0 left-0 w-full h-full flex items-center justify-center px-10 bg-black bg-opacity-70 overflow-hidden overflow-y-auto z-50 transition-opacity opacity-100" className="relative flex flex-col items-center max-w-[40.625rem] p-10 bg-whitesmoke rounded-3xl" >
            <div className="relative p-5 rounded-2xl bg-gray-800">
                <div className="flex justify-between">
                    <h1 className="font-bold mr-10">{title}</h1>
                    <button className="" onClick={() => onClose()}>&#x2715;</button>
                </div>
                {children}
                {/* <div className="flex justify-center py-4">
                    <button className="text-base font-medium bg-sky-500 px-3 py-2 rounded-xl transition-all ease-linear hover:bg-sky-700" onClick={() => onClose()}>{buttonName}</button>
                </div> */}
            </div>
            
        </Modal>
    )
}

export default CustomModal