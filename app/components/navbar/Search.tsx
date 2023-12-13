'use client';
import {BiSearch} from 'react-icons/bi';
import {useState} from 'react';
import { start } from 'repl';
import { useRouter, useSearchParams } from 'next/navigation';
import {useCallback} from 'react';
import { Input} from "@material-tailwind/react";
import qs from 'query-string';
import { CiCircleQuestion } from 'react-icons/ci';
import { Tooltip } from '@material-tailwind/react'

const Search = () =>{

    const router = useRouter()
    const params = useSearchParams()

    
    

    const [isExpanded, setIsExpanded] = useState(false);
    const [zipcode, setZipcode] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [boxCount, setBoxCount] = useState('')
    
    const handleStartDateChange = (e: any) => {
        const date = new Date(e.target.value);
        return date.toISOString()
    };
    
    const handleEndDateChange = (e: any) => {
        const date = new Date(e.target.value);
        return date.toISOString
    };

    const onSubmit = useCallback(async () => {
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const startDateObj = new Date(startDate)
        const endDateObj = new Date(endDate)
        const startDateFormatted = startDateObj.toISOString()
        const endDateFormatted = endDateObj.toISOString()

        const updatedQuery: any = {
            ...currentQuery,
            boxCount,
            startDateFormatted,
            endDateFormatted,
            zipcode
        };

        

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, {skipNull: true});

        
        router.push(url);
    }, [
    router, boxCount, startDate, endDate, zipcode, params])

    const handleMouseEnter = () => {
        setIsExpanded(true);
    }

    const handleMouseLeave = () => {
        if (!zipcode && !startDate && !endDate && !boxCount) {
            setIsExpanded(false);
        }
        
    }

    const IconDiv = () => (
        <Tooltip content="Boxes are standard sized">
            <CiCircleQuestion />
        </Tooltip>
    );



    return(
        <div
            className={`transition ease-in-out duration-300 border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm
            hover:shadow-md transition curser-pointer bg-white
                `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {!isExpanded ?(
                //current view
                
                <div
              className="flex flex-row items-center justify-between
              ">
                <div
                className="text-sm font-semibold px-6">
                    
                    Anywhere
                </div>
                <div
                className="hidden sm:block text-sm font-semibold px-6
                border-x-[1px] flex-1 text-center">
                    Start Date
                </div>
                <div
                className="hidden sm:block text-sm font-semibold px-6
                border-x-[1px] flex-1 text-center">
                    End Date
                </div>
                
                <div
                className="
                text-sm
                pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    {/* <div className="hidden sm:block">Boxes</div> */}
                    <div className="p-2 bg-accent-1 rounded-full text-white"
                        onClick={onSubmit}>
                        <BiSearch size={18} />
                    </div>
                </div>

            </div>
                

        
            ): (
                // Expanded View
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 rounded-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <div className="">
                <Input label="Zip Code" 
                value = {zipcode} 
                onChange={(e) => setZipcode(e.target.value)} 
                />  
            </div>
            {/* <input className="p-2 m-2 border rounded" type="text"     placeholder="Zipcode"
                value={zipcode} onChange={(e) => setZipcode(e.target.value)} /> */}
            <div className="">
                <Input label="Start Date" 
                type="date"
                value = {startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                />  
            </div>
            {/* <input className="p-2 m-2 border rounded" type="date" placeholder="Start Date"
                value={startDate} onChange={(e) => setStartDate(e.target.value)} /> */}
            <div className="">
                <Input label="End Date" 
                type="date"
                value = {endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                />  
            </div>
            {/* <input className="p-2 m-2 border rounded" type="date" placeholder="End Date"
                value={endDate} onChange={(e) => setEndDate(e.target.value)} />  */}
            
           
            <div className="">

            
                <Input label="Number of Boxes" 
                type = "number"
                icon = {
                    <Tooltip content="Boxes are 4 cubic feet large boxes"
                    className="bg-foreground-2"
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                <div><CiCircleQuestion/></div>
                </Tooltip>}
                value = {boxCount} 
                onChange={(e) => setBoxCount(e.target.value)} 
                />  
            
            </div>

            {/* <input className="p-2 m-2 border rounded" type="number" placeholder="Number of Boxes"
                value={boxCount} onChange={(e) => setBoxCount(e.target.value)} /> */}
            <button className="p-2 m-2 bg-accent-1 text-white rounded-full">
                <BiSearch size={18} onClick={onSubmit} />
            </button>
        </div>
            )}
            </div>
            
    )
}

export default Search