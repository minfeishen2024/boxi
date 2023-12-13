'use client';

import Container from "./Container"
import { Chip, Button } from "@material-tailwind/react";
import { BiSearch } from "react-icons/bi";
import { MdFilterAlt } from "react-icons/md";
import { MdFilterAltOff } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import {useCallback, useState} from 'react';
import useSearchModal from "../hooks/useSearchModal";

import DropdownItem from "./DropdownItem";



import qs from 'query-string';
import { usePathname } from "next/navigation";
import { FaSort } from "react-icons/fa";


const Filter = () => {

const searchModal = useSearchModal();
const router = useRouter();
const params = useSearchParams();
const [dropdownIsOpen, setDropDownIsOpen] = useState(false);
const [sortBy, setSortBy] = useState('');
const [sortOrder, setSortOrder] = useState('')

const toggleOpen = useCallback(() => {
    setDropDownIsOpen((value) => !value);
}, []);

const upDateQuery = useCallback(async () => {
    let currentQuery = {};
    if (params) {
        currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
        ...currentQuery,
        sortOrder,
        sortBy
    };

    const url = qs.stringifyUrl({
        url: '/',
        query: updatedQuery,
    }, {skipNull: true});

    router.push(url);

},[router, params, sortOrder, sortBy])



const sortPrizeLoHi = useCallback(() => {

    setSortBy("price")
    setSortOrder("asc")
    upDateQuery();
    setDropDownIsOpen((value) => !value);
    
}, [setSortBy, setSortOrder, upDateQuery]);

const sortPrizeHiLo = useCallback(() => {

    setSortBy("price")
    setSortOrder("desc")
    upDateQuery();
    setDropDownIsOpen((value) => !value);
    
}, [setSortBy, setSortOrder, upDateQuery]);

const sortRatingLoHi = useCallback(() => {

    setSortBy("rating")
    setSortOrder("asc")
    upDateQuery();
    setDropDownIsOpen((value) => !value);
    
}, [setSortBy, setSortOrder, upDateQuery]);

const sortRatingHiLo = useCallback(() => {

    setSortBy("rating")
    setSortOrder("desc")
    upDateQuery();
    setDropDownIsOpen((value) => !value);
    
}, [setSortBy, setSortOrder, upDateQuery]);




const clearFilter = useCallback(async () => {
    searchModal.onReset();
    router.push("/");
}, [
router])

const pathname = usePathname();
    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

const chips = []

// if (params?.has("boxCount")) {
//     chips.push({key:'boxCount', label:'boxes:', value:params.get("boxCount")})

// }

if (params?.has("petFreeRequired")) {
    if(params.get("petFreeRequired")=="true")
    chips.push({key:'petFreeRequired', label:"Pet Free"})
    
}

if (params?.has("tempControllRequired")) {
    if(params.get("tempControllRequired")=="true")
    chips.push({key:'tempControllRequired', label:"Temperature Controlled"})
    
}

if (params?.has("secureRequired")) {
    if(params.get("secureRequired")=="true")
    chips.push({key:'secureRequired', label:"Secure Entrance"})
    
}

if (params?.has("pickupRequired")) {
    if(params.get("pickupRequired")=="true")
    chips.push({key:'pickupRequired', label:"Has Pick Up"})
    
}

if (params?.has("dropoffRequired")) {
    if(params.get("dropoffRequired")=="true")
    chips.push({key:'dropoffRequired', label:"Has Drop Off"})
    
}


const filterIcon =() => {
    return(
        <>
        <MdFilterAlt size={25} />
        </>
    )
}




    return(

<div className="fixed w-full bg-white shadow-sm z-10">
<Container>
    <div className="py-4 border-b-[1px]">
        
            <div className="flex flex-row items-center gap-4 overflow-x-auto">
                
                {/* Icon Container */}

    <Button ripple={true} variant="outlined" className="flex items-center gap-3" onClick={toggleOpen}>
    <FaSort style={{ color: '#693B18'}}  size={25} />
    <div className="text-foreground-1">
        Sort Result
    </div>  
      </Button>
      {dropdownIsOpen && (
                            <div className="absolute rounded-xl shadow-md w-[12 vw]
                            bg-white overflow-hidden top-12 text-sm">
                                
                                <div className="flex flex-col cursor-pointer z-100">
                                    
                                        <>
                                        <DropdownItem onClick={sortPrizeLoHi}
                                    label ="Prize: Low to High" />
                                    <DropdownItem onClick={sortPrizeHiLo}
                                    label ="Prize: High to Low" />
                                    <DropdownItem onClick={sortRatingLoHi}
                                    label ="Rating: Low to High" />
                                    <DropdownItem onClick={sortRatingHiLo}
                                    label ="Rating: High to Low" />
                                        </>
                                    
                            
                                </div>
                            </div>
                            )} 

    <Button ripple={true} variant="outlined" className="flex items-center gap-3" onClick={searchModal.onOpen}>
    <MdFilterAlt style={{ color: '#693B18' }} size={25} />
    <div className="text-foreground-1">
        Apply Filter
    </div>
        
        
      </Button>
      <Button ripple={true} variant="outlined" className="flex items-center gap-3" onClick={clearFilter}>
    <MdFilterAltOff style={{ color: '#693B18' }} size={25} />
        
      </Button>
                {/* <div 
                    onClick={clearFilter}
                    className="flex-shrink-0 p-2 bg-foreground-1 rounded-full text-white cursor-pointer hover:opacity-70">
                    <MdFilterAltOff size={25} />
                </div> */}

                {/* Chips Container */}
                <div className="flex items-center gap-2 min-w-max">
                    {chips.map(chip => (
        <Chip value={chip.label} variant="gradient" color="brown"
         className="rounded-full" />
    ))}
                    
                </div>

            </div>
        
    </div>
    </Container>
</div>


        
            
    )
}

export default Filter