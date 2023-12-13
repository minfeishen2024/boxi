'use client';
import {IconType} from 'react-icons';



interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?:IconType;
    landing?:boolean;
    secondary?:boolean;
    green?: boolean


}

const Button : React.FC<ButtonProps> =({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon,
    landing,
    secondary,
    green
})  => {

    const IconComponent = icon;


    if (landing) {
        return(
            <button 
            onClick = {onClick}
            disabled = {disabled}  
            style={{ height: '100px', font:"20px"}}      
        className={`
        
        rounded-lg
        shadow hover:shadow-inner
        transition
        w-full
        h-128
        
        ${landing?'text-white':'text-black'}
        ${landing?'bg-foreground-2':'bg-accent-1'}
        ${outline?'border-black':'border-foreground-2'}
        ${small?'text-sm':'text-xl'}
        ${small?'font-light':'font-semibold'}
        ${small?'border-[1px]':'border-2'}`

        
    }>
        {IconComponent && (
            <IconComponent size={24} className="absolute left-4 top-3" />
        )}
        {label}
    </button>)}

    if (secondary) {
        return(

            <button 
            onClick = {onClick}
            disabled = {disabled}        
        className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        disabled:text-white
        rounded-lg
        shadow hover:shadow-inner
        transition
        w-full
        ${small?'py-1':'py-3'}
        ${small?'text-sm':'text-md'}
        ${small?'font-light':'font-semibold'}
        ${secondary?'border-[1px]':'border-2'}
        ${secondary?'py-1':'py-3'}
        ${secondary?'text-sm':'text-md'}
        ${secondary?'font-light':'font-semibold'}
        ${secondary?'border-[1px]':'border-2'}
        ${secondary?'text-white':'text-black'}
        ${secondary?'bg-foreground-1':'bg-accent-1'}
        
        `

        
    }>
        {IconComponent && (
            <IconComponent size={24} className="absolute left-4 top-3" />
        )}
        {label}
    </button>
    )       
    }


    return(

        

        <button 
            onClick = {onClick}
            disabled = {disabled}        
        className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        disabled:text-white
        rounded-lg
        shadow hover:shadow-inner
        transition
        w-full
        border-[1px]
        ${outline?'bg-white':'bg-accent-1'}
        ${outline?'border-black':'border-accent-1'}
        ${green? 'bg-foreground-2' : 'bg-accent-1'}
        ${green? 'border-background-1' : 'border-accent-1'}
        ${green? 'text-background-1' : 'text-black'}
        ${small?'py-1':'py-3'}
        ${small?'text-sm':'text-md'}
        ${small?'font-light':'font-semibold'}
        
        `

        
    }>
        {IconComponent && (
            <IconComponent size={24} className="absolute left-4 top-3" />
        )}
        {label}
    </button>
    )
}

export default Button;