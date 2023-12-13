'use client';

import { IoFilter } from "react-icons/io5";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import qs from "query-string";
// import Slider from "./inputs/Slider";
import Checkbox from "./inputs/Checkbox";

const FilterIris = () => {

    const router = useRouter();
    const params = useSearchParams();

    const [boxCount, setBoxCount] = useState(1);
    const [petFreeRequired, setPetFreeRequired] = useState(false);
    const [tempControllRequired, setTempControllRequired] = useState(false);
    const [secureRequired, setSecureRequired] = useState(false);
    const [pickupRequired, setPickupRequired] = useState(false);
    const [dropoffRequired, setDropoffRequired] = useState(false);

    const [dropdown1IsOpen, setDropDown1IsOpen] = useState(false);
    const [dropdown2IsOpen, setDropDown2IsOpen] = useState(false);

    const toggleOpen1 = useCallback(() => {
        setDropDown1IsOpen((value) => !value);
    }, []);

    const toggleOpen2 = useCallback(() => {
        setDropDown2IsOpen((value) => !value);
    }, []);

    const handleSubmit = useCallback(async () => {
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            boxCount,
            //price,
            petFreeRequired,
            tempControllRequired,
            secureRequired,
            pickupRequired,
            dropoffRequired
        };

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, {skipNull: true});

        router.push(url);
    }, [
        router, boxCount, petFreeRequired, tempControllRequired, secureRequired, pickupRequired, dropoffRequired, params
    ])

    return(
        <div className="fixed w-full bg-white shadow-sm z-10">
            <div className="py-2 border-b-[1px]">
                    <div
                        className="
                            flex 
                            flex-row 
                            items-center 
                            gap-3 
                            md:gap-0 
                            overflow-x-auto 
                            space-x-3 
                            px-4
                        "
                    >
                        <div 
                            className="flex-shrink-0 p-2 bg-white text-bg-foreground-1 
                        ">
                            <IoFilter size={25} color="inherit"/>
                        </div>

                        {/* <Slider 
                            title="# of Boxes"
                            min="0"
                            max="100"
                            value={boxCount}
                            onChange={(value) => setBoxCount(value)}
                        />  */}

                        {/* FIRST DROPDOWN */}
                        <div>
                            <div onClick={toggleOpen1}
                                className="
                                    text-foreground-1 
                                    bg-background-2 
                                    hover:bg-accent-1
                                    font-bold
                                    rounded-lg
                                    text-sm
                                    px-4
                                    py-2
                                    text-center 
                                    inline-flex 
                                    items-center 
                                    relative
                                "
                            >
                                FEATURES
                                <svg 
                                    className="w-2.5 h-2.5 ms-3" 
                                    aria-hidden="true" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 10 6">
                                    <path 
                                        stroke="currentColor" 
                                        stroke-linecap="round" 
                                        stroke-linejoin="round" 
                                        stroke-width="2" 
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </div>
                            {dropdown1IsOpen && (
                                <div className="absolute rounded-xl shadow-md w-[12 vw]
                                bg-white overflow-hidden top-12 text-sm">
                                <div className="flex flex-col cursor-pointer">
                                    <Checkbox 
                                        label="Pet Free"
                                        value={petFreeRequired}
                                        onChange={(value)=> setPetFreeRequired(value)}
                                    />
                                </div>
                                <div className="flex flex-col cursor-pointer">
                                    <Checkbox 
                                        label="Secure Location"
                                        value={secureRequired}
                                        onChange={(value)=> setSecureRequired(value)}
                                    />
                                </div>
                                <div className="flex flex-col cursor-pointer">
                                    <Checkbox 
                                        label="Temperature Controlled"
                                        value={tempControllRequired}
                                        onChange={(value)=> setTempControllRequired(value)}
                                    />
                                </div>
                            </div>
                            )} 
                        </div>

                        {/* SECOND DROPDOWN */}
                        <div>
                            <div onClick={toggleOpen2}
                                className="
                                    text-foreground-1 
                                    bg-background-2 
                                    hover:bg-accent-1
                                    font-bold
                                    rounded-lg
                                    text-sm
                                    px-4
                                    py-2
                                    text-center 
                                    inline-flex 
                                    items-center 
                                    relative
                                "
                            >
                                SERVICES
                                <svg 
                                    className="w-2.5 h-2.5 ms-3" 
                                    aria-hidden="true" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 10 6">
                                    <path 
                                        stroke="currentColor" 
                                        stroke-linecap="round" 
                                        stroke-linejoin="round" 
                                        stroke-width="2" 
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </div>
                            {dropdown2IsOpen && (
                                <div className="absolute rounded-xl shadow-md w-[12 vw]
                                bg-white overflow-hidden top-12 text-sm">
                                <div className="flex flex-col cursor-pointer">
                                    <Checkbox 
                                        label="Offers Pickup"
                                        value={pickupRequired}
                                        onChange={(value)=> setPickupRequired(value)}
                                    />
                                </div>
                                <div className="flex flex-col cursor-pointer">
                                    <Checkbox 
                                        label="Offers Dropoff"
                                        value={dropoffRequired}
                                        onChange={(value)=> setDropoffRequired(value)}
                                    />
                                </div>
                            </div>
                            )} 
                        </div>



                        <button 
                            onClick={handleSubmit} 
                            className="
                                text-white
                                bg-foreground-2
                                shadow hover:shadow-inner
                                font-bold
                                rounded-lg
                                text-sm
                                px-4
                                py-2
                                text-center 
                                inline-flex 
                                items-center 
                            "
                        > 
                            APPLY
                        </button>
                    </div>
                {/* </div> */}
            </div>
        </div>
    )
}

export default FilterIris;