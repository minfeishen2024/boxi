'use client';
import axios from 'axios';
import {AiFillGithub} from "react-icons/ai";
import {FcGoogle} from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import {toast} from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import {useRouter} from 'next/navigation';


import {signIn} from 'next-auth/react';


const LoginModal = () => {

    const router = useRouter();
    
    const registerModal = useRegisterModal();
    const LoginModal = useLoginModal();
    const[isLoading, setIsLoading] = useState(false);

    const{
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
            defaultValues:{
                email: '',
                password: ''
            }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        
        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false);
            if (callback?.ok) {
                toast.success('Logged in');
                router.refresh();
                LoginModal.onClose();
            }

            if(callback?.error) {
                toast.error(callback.error);
            }
        })

        
    }

    const bodyContent=(
        <div className = "flex flex-col gap-4">
            <Heading title="Welcome back!" subtitle="Login through your account"/>
            <Input id="email" label="email" disabled={isLoading}
                register={register} errors={errors} required/>
            {/* <Input id="name" label="name" disabled={isLoading}
                register={register} errors={errors} required/> */}
            <Input id="password" label="password" type="password" disabled={isLoading}
                register={register} errors={errors} required/>
        </div>
           
    )

    const toggle = useCallback(() => {
        LoginModal.onClose();
        registerModal.onOpen();
    }, [LoginModal, registerModal])

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button 
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => {}}
                />
            <div className="
                text-neutral-500
                text-center
                mt-4
                font-light">
                    <div onClick = {toggle} 
                        className="
                       flex justify-center flex-row items-center gap-2">
                        <div>First time using Boxi?</div>
                        <div onClick = {toggle}
                            className="text-neutral-800
                            cursor-pointer
                            hover:underline">Create an account
                            </div>
                    </div>

            </div>
        </div>
        
    )
    
    return(
        <Modal
            disabled={isLoading}
            isOpen={LoginModal.isOpen}
            title="Login"
            actionLabel="Login"
            onClose={LoginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body = {bodyContent}
            footer = {footerContent} />
    )
}

export default LoginModal