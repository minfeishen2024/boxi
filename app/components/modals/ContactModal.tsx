'use client';
import qs from 'query-string';
import dynamic from 'next/dynamic';
import {useRouter, useSearchParams} from 'next/navigation';
import {useState, useMemo, useCallback, useEffect, } from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';


import Modal from "./Modal"
import Heading from '../Heading';
import TrueFalseSelect from '../inputs/TrueFalseSelect';
import Counter from '../inputs/Counter';
import Input from '../inputs/Input';

import useSearchModal from "@/app/hooks/useSearchModal"
import useContactModal from '@/app/hooks/useContactModal';

import toast from 'react-hot-toast';


enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,

}


const ContactModal = () => {
    const contactModal = useContactModal()
    const router = useRouter();
    const params = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    // const [boxCount, setBoxCount] = useState(1);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset 
    } = useForm<FieldValues>({
        defaultValues: {
            email:'',
            subject:'',
            content:''
        }
    })


    const onSubmit = useCallback(async () => {
        contactModal.onClose();
        toast.success('Message Sent!')
        reset()

    }, [contactModal])

    const bodyContent = (
        
        <div className="flex flex-col gap-8">
        <Heading title="Have Questions?" subtitle="Send an email to the host!" />
        <div className="flex flex-row gap-3">
                {/* <input
                    type="text"
                    className="flex-grow w-1/4"
                    placeholder="City"
                    {...register('city')} // Use register for the city input
                /> */}
                <Input
                id="subject"
                label="Subject of Enquiry"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
                {/* <input
                    type="text"
                    className="flex-grow w-1/4"
                    placeholder="State"
                    {...register('state')} // Use register for the city input
                /> */}
                <Input
                id="email"
                label="Your Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
                
            </div>
        <div className="flex flex-col gap-8">
            {/* <input
                type="text"
                className="w-full"
                placeholder="Address"
                {...register('address')} // Use register for the address input
            /> */}
            <Input
                id="content"
                multiline
                label="Your Message"
                // disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
            
        </div>
        {/* Add Map component here if necessary */}
    </div>
    )


    
    return(
        <Modal 
            isOpen={contactModal.isOpen}
            onClose={contactModal.onClose}
            onSubmit={onSubmit}
            title="Contact Host"
            actionLabel="send"
            body = {bodyContent}/>
    )
}


export default ContactModal;