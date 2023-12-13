'use client';
import Counter from '../inputs/Counter';
import { useCallback, useState } from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';

import axios from "axios";

import Button from '../Button';
import {useRouter} from 'next/navigation';
import { useMemo } from 'react';




import {signIn} from 'next-auth/react';
import useRentModal from '@/app/hooks/useRentModal';

import CitySelect from '../inputs/StateSelect';
import StateSelect from '../inputs/StateSelect';
import TrueFalseSelect from '../inputs/TrueFalseSelect';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';



//STEPS to set up listing
enum STEPS {
    LOCATION = 0,
    INFO = 1,
    IMAGES = 2,
    DESCRIPTION=3,
    PRICE=4
}


const RentModal = () => {
    const rentModal = useRentModal()
    const router = useRouter()

    const [step, setStep] = useState(STEPS.LOCATION);
    const [isLoading, setIsLoading] = useState(false);


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
            address: '',
            state:'',
            city:'',
            zipCode:'',
            title: '',
            description: '',
            imgSrc: '',
            boxCount: 0,
            price: 0,
            petFree: false,
            tempControlled: false,
            secureEntrance: false,
            latitude: 39.956740,
            longitude: -75.195270
        }
    })

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldValidate: true,
            shouldTouch: true
        })
    }

    const address = watch('address');
    const state = watch('state');
    const zipCode = watch('zipCode');
    const city = watch('city');
    const boxCount = watch('boxCount');
    const petFree = watch('petFree');
    const tempControlled = watch('tempControlled');
    const secureEntrance = watch('secureEntrance');
    const imageSrc = watch('imgSrc');
    const latitude = watch('latitude');
    const longitude = watch('longitude');


    const onBack = () => {
        setStep((value) => value -1)
    };

    const onNext = () => {
        setStep((value) => value + 1)
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step != STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/listings', data)
        .then(() => {
            toast.success('Listing Created!');
            router.refresh();
            reset();
            setStep(STEPS.LOCATION);
            rentModal.onClose();
        })
        .catch(() => {
            toast.error('Something went wrong')

        }).finally(() => {
            setIsLoading(false);
        })
    }

    const actionLabel = useMemo(() =>  {
        if (step === STEPS.PRICE) {
            return 'Create'
        };
        return 'Next';
    },[step])

    const secondaryLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined;
        }
        return 'Back';
    },[step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Where is your storage located?" subtitle="Enter street address, city, zipcode. Don't worry, your exact address will only be shared with confirmed and paid customers." />
            <div className="flex flex-col gap-8">
                {/* <input
                    type="text"
                    className="w-full"
                    placeholder="Address"
                    {...register('address')} // Use register for the address input
                /> */}
                <Input
                    id="address"
                    label="Street Address"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    />
                <div className="flex flex-row gap-3">
                    {/* <input
                        type="text"
                        className="flex-grow w-1/4"
                        placeholder="City"
                        {...register('city')} // Use register for the city input
                    /> */}
                    <Input
                    id="city"
                    label="City"
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
                    id="state"
                    label="State"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    />
                    {/* <input
                        type="text"
                        className="flex-grow w-1/4"
                        placeholder="Zip Code"
                        {...register('zipCode')} // Use register for the zip code input
                    /> */}
                    <Input
                    id="zipCode"
                    label="Zip Code"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    />
                </div>
            </div>
            {/* Add Map component here if necessary */}
        </div>
    );

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Tell us about your place!"
                    subtitle="Fill out the form regarding what capacity and amenities you have" />
                    <Counter title="How many boxes do you have capacity for?"
                        value={boxCount}
                        onChange={(value)=> setCustomValue('boxCount', value)}/>
                    <hr />
                    <TrueFalseSelect title="Is your storage place pet free?"
                        value={petFree}
                        onChange={(value)=> setCustomValue('petFree', value)}/>
                    
                    <hr />
                    <TrueFalseSelect title="Does your storage place have a locked, secure entrance?"
                        value={secureEntrance}
                        onChange={(value)=> setCustomValue('secureEntrance', value)}/>
                    
                    <hr />
                    <TrueFalseSelect title="Is your storage place temperature controlled?"
                        value={tempControlled}
                        onChange={(value)=> setCustomValue('tempControlled', value)}/>
                    
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a photo of your storage place"
                    subtitle="Tell potential customers what your storage place look like!" />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imgSrc', value)}/>
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your storage place?"
                    subtitle="Convince potential customers to store with you!" />
                <Input
                    id="title"
                    label="Name your place"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    />
                <Input
                    id="description"
                    label="Describe your place"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    />
                
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Set your price!"
                    subtitle="How much would you charge per box, per week?" />
                <Input
                    id="price"
                    label="Price"
                    formatPrice
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    />
                
            </div>
        )
    }
    
    return(
        <Modal
            
            isOpen={rentModal.isOpen}
            title="Create Your Storage Listing"
            actionLabel={actionLabel}
            secondaryLabel={secondaryLabel}
            onClose={rentModal.onClose}
            secondaryAction={step === STEPS.LOCATION? undefined : onBack}
            onSubmit={handleSubmit(onSubmit)}
            body = {bodyContent}
            // footer = {footerContent} 
            />
    )
}

export default RentModal