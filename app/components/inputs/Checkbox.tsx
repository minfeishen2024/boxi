'use client'

import { useCallback } from "react";

import { FaCheckSquare } from "react-icons/fa";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md"

interface CheckboxProps {
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps>= ({
    label,
    value,
    onChange
}) => {

    const toggle = useCallback(() => {
        onChange(!value)
    }, [onChange, value])

    return (
        <div 
            onClick={toggle}
            className="
                flex
                flex-row
                gap-3
                items-center
                text-foreground-1 
                bg-background-2 
                hover:bg-accent-1
                font-semibold
                transition
                text-sm
                px-4
                py-2"
        >
            <div className="outline:bg-foreground-1 outline-10">
                {value? (
                    <FaCheckSquare color='#693B18'/>
                ): (
                    <MdOutlineCheckBoxOutlineBlank color='#693B18'/>
                )}
            </div>
            {label}
        </div>
    );
}

export default Checkbox;