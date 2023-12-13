'use client';

import { Bebas_Neue } from "next/font/google";
import { Montserrat } from "next/font/google";

const Bebas = Bebas_Neue({weight: "400",
     subsets: ['latin']})

const mont = Montserrat({
subsets:["latin"],
})

interface CustomHeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean;
}


const CustomHeading: React.FC<CustomHeadingProps> = ({
    title,
    subtitle,
    center
}) => {
    return(
        <div className={center? 'text-center': 'text-start'}>
            <div className="flex flex-col gap-7">
            <div className={Bebas.className}>
            <div style={{fontSize: '120px'}} className="text-4xl text-background-1 font-bold leading-none">
                {title}
            </div>
            </div>
            <div className={mont.className}>
            <div style={{fontSize: '28px'}} className="font-semi text-background-1 mt-2">
                {subtitle}
            </div>
            </div>
            </div>

        </div>
    )
}

export default CustomHeading;