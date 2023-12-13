'use client';
import qs from 'query-string';
import dynamic from 'next/dynamic';
import {useRouter, useSearchParams} from 'next/navigation';
import {useState, useMemo, useCallback, useEffect} from 'react';


import Modal from "./Modal"
import Heading from '../Heading';
import TrueFalseSelect from '../inputs/TrueFalseSelect';
import Counter from '../inputs/Counter';

import useSearchModal from "@/app/hooks/useSearchModal"


enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,

}


const SearchModal = () => {
    const searchModal = useSearchModal()
    const router = useRouter();
    const params = useSearchParams();

    // const [boxCount, setBoxCount] = useState(1);
    const [petFreeRequired, setPetFreeRequired] = useState(false);
    const [tempControllRequired, setTempControllRequired] = useState(false);
    const [secureRequired, setSecureRequired] = useState(false);
    const [pickupRequired, setPickupRequired] = useState(false);
    const [dropoffRequired, setDropoffRequired] = useState(false);


    const onSubmit = useCallback(async () => {
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            
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

        searchModal.onClose();
        router.push(url);
    }, [searchModal,
    router, petFreeRequired, tempControllRequired, secureRequired, pickupRequired, dropoffRequired, params])

    useEffect(() => {
        if (searchModal.reset) {
            setPetFreeRequired(false);
            setTempControllRequired(false);
            setSecureRequired(false);
            setPickupRequired(false);
            setDropoffRequired(false);
        }
    }, [searchModal.reset, setPetFreeRequired, setTempControllRequired, setSecureRequired, setPickupRequired, setDropoffRequired]);


    const bodyContent = (
        
            <div className="flex flex-col gap-8">
                <Heading
                    title="Choose your filters"
                    subtitle="Fill in the form to tell us what criteria you are looking for in a storage" />
                    {/* <Counter title="How many boxes are you looking to store?"
                        value={boxCount}
                        onChange={(value)=> setBoxCount(value)}/>
                    <hr /> */}
                    <TrueFalseSelect title="Do you require the storage to be pet free?"
                        value={petFreeRequired}
                        onChange={(value)=> setPetFreeRequired(value)}/>
                    
                    <hr />
                    <TrueFalseSelect title="Do you require the storage to have secure, locked entrance?"
                        value={secureRequired}
                        onChange={(value)=> setSecureRequired(value)}/>
                    
                    <hr />
                    <TrueFalseSelect title="Do you require the storage to be temperature controlled?"
                        value={tempControllRequired}
                        onChange={(value)=> setTempControllRequired(value)}/>
                    
                    <hr />
                    <TrueFalseSelect title="Would you like a storage that offers pick service?"
                        value={pickupRequired}
                        onChange={(value)=> setPickupRequired(value)}/>
                    
                    <hr />
                    <TrueFalseSelect title="Would you like a storage that offers dropoff service?"
                        value={dropoffRequired}
                        onChange={(value)=> setDropoffRequired(value)}/>
                    
            </div>
    )


    
    return(
        <Modal 
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Choose your Filters"
            actionLabel="search"
            body = {bodyContent}/>
    )
}


export default SearchModal;