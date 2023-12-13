'use client';
import {AiOutlineMenu} from 'react-icons/ai';
import Avatar from "../Avatar"
import MenuItem from './MenuItem';
import {useCallback, useState} from 'react';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import {User} from "@prisma/client";
import {signOut} from "next-auth/react";
import { SafeUser } from '@/app/types';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> =  ({
    currentUser
}) =>{
    const router = useRouter();
    const[isOpen, setIsOpen] = useState(false);

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        rentModal.onOpen();

    }, [currentUser, loginModal])


    const onClickNav = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

    }, [currentUser, loginModal])

    const onSignOut = useCallback(() => {
        signOut();
        router.push("/")
    }, [router])

    return(
        <div className="relative z-20">
            <div className="flex flex-row items-center gap-3">
                <div onClick={onClickNav}
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full
                    hover:bg-neutral-100 transition cursor-pointer">
                        {currentUser == null ? (
        "Login to get started."
    ) : (
        `Welcome ${currentUser.name}!`
    )}
                        
                </div>
                <div onClick={toggleOpen}
                    className="p=4
                    bg-white
                    md:py-1
                    md:px-2
                    border-[1px]
                    border-neutral-300
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition">
                        <AiOutlineMenu />
                        <div className="hidden md:block">
                            <Avatar/>
                        </div>
                </div>
            </div>
            {isOpen && (
                <div className="
                absolute rounded-xl shadow-md w-[40vw]
                md:w-3/4 bg-white overflow-hidden right-0 top-12
                text-sm z-100">
                    
                    <div className="flex flex-col cursor-pointer z-100">
                        {currentUser? (
                            <>
                            <MenuItem onClick={() => router.push("/storages")}
                            label = "My Storage Properties" />
                            <MenuItem onClick={onRent}
                            label ="Add New Storage Listing" />
                            <MenuItem onClick={() => router.push("/reservations")}
                            label ="My Reservations" />
                            <MenuItem onClick={() => router.push("/favorites")}
                            label ="Favorites" />
                            <MenuItem onClick={onSignOut}
                            label ="Sign Out" />
                        </>) : (
                            <>
                            <MenuItem onClick={loginModal.onOpen}
                        label ="Login" />
                        <MenuItem onClick={registerModal.onOpen}
                        label ="Sign Up" />
                            </>)}
                        
                
                    </div>
                </div>
            )}
        </div>
        
    )
}

export default UserMenu