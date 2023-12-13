'use client'

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CiCircleQuestion } from "react-icons/ci";
import { IoIosCheckmark, IoIosClose } from "react-icons/io";


interface TrueFalseSelectProps {
    title: string;
    subtitle?: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

const TrueFalseSelect: React.FC<TrueFalseSelectProps>= ({
    title,
    subtitle,
    value,
    onChange
}) => {

    const toggle = useCallback(() => {
        onChange(!value)
    }, [onChange, value])


    const onFalse = useCallback(() => {
        if(value === false) {
            return;
        }
        onChange(!value)
    }, [value, onChange])


    const onTrue = useCallback(() => {
        if(value === true) {
            return;
        }
        onChange(!value)
    }, [value, onChange])

 

    return (
        <div className="flex flex-row items-center justify-between px-3 py-3">
                <div className="flex flex-row">
                    <div className="font-medium">
                        {/* ADD HOVERING TO EXPAIN boxes */}
                        {title}
                    </div>
                    {/* <div className="w-5 h-5 rounded-full  flex items-center justify-center
                            text-neutral-600 cursor-pointer hover:opacity-80 transition" >
                        <CiCircleQuestion style={{ color: '#693B18' }}/>                        
                    </div> */}
                </div>
                <div className="flex flex-row items-center gap-4">
                    <div onClick={onTrue}
                        className={`w-10 h-10 rounded-full border-[1px]
                            border-neutral-400 flex items-center justify-center
                            text-neutral-600 cursor-pointer hover:opacity-80 transition
                            ${value ? 'bg-green-500' : 'bg-transparent'}`}>
                        <IoIosCheckmark style={{ color: value ? 'white' : 'inherit' }} />
                    </div>
                    <div className="font-light text-xl text-neutral-600">
                        {value? (
                            <div className="font-light text-xl text-neutral-600">Yes</div>
                        ): (
                            <div className="font-light text-xl text-neutral-600">No</div>
                        )}
                        {/* {value} */}
                    </div>
                    <div onClick={onFalse}
                        className={`w-10 h-10 rounded-full border-[1px]
                        border-neutral-400 flex items-center justify-center
                        text-neutral-600 cursor-pointer hover:opacity-80 transition
                        ${!value ? 'bg-red-500' : 'bg-transparent'}`}>
                            <IoIosClose style={{ color: !value ? 'white' : 'inherit' }}/>
                    </div>
                </div>
            </div>
    );
}

export default TrueFalseSelect;