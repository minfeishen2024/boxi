'use client';

interface DropDownItemProps {
    onClick: () => void;
    label: string;
}

const DropdownItem: React.FC<DropDownItemProps> = ({
    onClick, label
}) => {
    return(
        <div 
            onClick={onClick}
            className="
            px-4 py-3
            hover:bg-foreground-1
            hover:text-white
            transition
            font-semibold">
                
                {label}
        </div>
    )
}

export default DropdownItem