
import { FaTimes } from 'react-icons/fa'
const CustomModal = ({
    children,
    footerButton = <></>,
    title,
    description = "",
    isOpen,
    setIsOpen,
    onClose = () => { }
}) => {

    return (
        <div className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-40 flex justify-center items-center z-[10000] ${isOpen ? " visible opacity-100" : "invisible opacity-0"} duration-200`}>
            <div
                className={`px-3 py-4 pt-5 rounded-md max-w-lg ${isOpen ? "scale-100 visible opacity-100" : "scale-0 invisible opacity-0"} bg-front relative  duration-200`}>
                <span onClick={onClose}>
                    <FaTimes className='absolute top-1 right-1 text-2xl p-1 rounded-full hover:bg-back duration-200 cursor-pointer' />
                </span>
                <h1 className='text-2xl tracking-wide'>{title}</h1>
                <p className='font-light text-base '>{description}</p>
                {children}
                <div className='mt-3'>
                    {footerButton}
                </div>
            </div>
        </div>

    )
}


export default CustomModal