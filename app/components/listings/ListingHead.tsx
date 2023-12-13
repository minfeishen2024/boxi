'use client';

import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

import { Rating } from "@material-tailwind/react";


interface ListingHeadProps {
    title: string;
    imageSrc: string;
    zipCode: string;
    city: string;
    id: string;
    currentUser?: SafeUser | null;
    rating: number | null;
}




const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    zipCode,
    imageSrc,
    city,
    id,
    currentUser,
    rating
}) => {

    if (rating == null) {
        rating = 0;
    } else {
        rating = rating
    }


    return (
        <>
        {/* <Heading
            title={title}
            subtitle={`${city}, ${zipCode}`} /> */}
            <div className="text-start">
            <div className="text-2xl font-bold text-foreground-1">
                {title}
            </div>
            <div className="text-xl font-semibold
                    flex flex-row items-center gap-2">
            <div className="font-light text-neutral-500 mt-2">
                {city}, {zipCode}
                </div>
                <div style={{backgroundColor: "#693B18"}}className="h-6 w-px bg-gray-300 mx-4"></div>
                <div className="flex flex-col items-start">
                        <Rating value={rating}/>
                        
                    </div>
            </div>

        </div>
        
        <div className="w-full h-[60vh] overflow-hidden
            rounded-xl relative">
             <Image
                alt ="image"
                src={imageSrc}
                fill
                className="object-cover w-full"/>
            <div className="absolute top-5 right-5">
                <HeartButton 
                    listingId={id}
                    currentUser={currentUser}/>
            </div>
        </div>
        </>
    )
}

export default ListingHead