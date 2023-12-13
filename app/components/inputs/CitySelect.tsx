'use client';
import useUSStates from '@/app/hooks/useStates';

import Select from 'react-select';


export type StateSelectValue = {
    label: string;
    lat: number[];
    long: number[];
    value: string;
}


interface StateSelectProps {
    value?: StateSelectValue;  
}



const StateSelect = () => {
    const {getAll} = useUSStates();
    

    return(

        
    
    <Select
        placeholder="State"
        isClearable
        options={getAll()}
        className="flex w-1/3"
        
    />)
}


export default StateSelect