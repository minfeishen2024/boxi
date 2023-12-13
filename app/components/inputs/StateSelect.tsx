'use client';
import useUSStates from '@/app/hooks/useStates';

import Select from 'react-select';


export type StateSelectValue = {
    name: string;
    value: string;
    latitude?: string;
    longitude?: string;
};


interface StateSelectProps {
    value?: string;
    onChange: (value: string) => void  
}



const StateSelect:React.FC<StateSelectProps> = ({
    value,
    onChange
}) => {
    const {getAll} = useUSStates();
    const options = getAll().map((state) => ({
        value:state.label
    }))

    return(
    <div>
        
    <Select
        placeholder="State"
        isClearable
        options={options}
        //value={options.find(option => option.value === value)} 
        onChange={(option) => onChange(option?.value || '')}
        classNames={{
            control:() => 'p-3 border-2 flex w-full',
            input: () => 'text-lg',
            option:() => 'text-lg'

        }}
    />
    </div>)
}


export default StateSelect