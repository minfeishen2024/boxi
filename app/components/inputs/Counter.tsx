'use client'

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CiCircleQuestion } from "react-icons/ci";
import { Tooltip } from "@material-tailwind/react";


interface CounterProps {
    title: string;
    subtitle?: string;
    value: number;
    onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps>= ({
    title,
    subtitle,
    value,
    onChange
}) => {

    const onAdd = useCallback(() => {
        onChange(value + 1)
    }, [onChange, value])

    const onReduce = useCallback(() => {
        if (value === 0) {
            return;
        }
        onChange(value - 1)
    }, [value, onChange])

    return (
        <div 
            className="flex flex-row items-center justify-between">
                <div className="flex flex-row">
                    <div className="font-medium">
                        {/* ADD HOVERING TO EXPAIN boxes */}
                        {title}
                    </div>
                    <div className="w-5 h-5 rounded-full  flex items-center justify-center
                            text-neutral-600 cursor-pointer hover:opacity-80 transition" >
                                <Tooltip content="Boxes are 4 cubic feet large boxes"
                    className="bg-foreground-2"
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                <div><CiCircleQuestion style={{ color: '#693B18' }}/></div>
                </Tooltip>
                                            
                    </div>
                </div>
                <div className="flex flex-row items-center gap-4">
                    <div onClick={onReduce}
                        className="w-10 h-10 rounded-full border-[1px]
                            border-neutral-400 flex items-center justify-center
                            text-neutral-600 cursor-pointer hover:opacity-80 transition">
                                <AiOutlineMinus />
                    </div>
                    <div className="font-light text-xl text-neutral-600">
                        {value}
                    </div>
                    <div onClick={onAdd}
                        className="w-10 h-10 rounded-full border-[1px]
                            border-neutral-400 flex items-center justify-center
                            text-neutral-600 cursor-pointer hover:opacity-80 transition">
                                <AiOutlinePlus />
                    </div>
                </div>
            </div>
    );
}

export default Counter;