'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import ContentContainer from "../components/ContentContainer";
import Button from "../components/Button";
import CustomHeading from "../components/CustomHeading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import { Bebas_Neue } from "next/font/google";
import useContactModal from "../hooks/useContactModal";


const Bebas = Bebas_Neue({weight: "400",
     subsets: ['latin']})


interface ConfrimProps {
    reservations: SafeReservation[]
    currentUser?: SafeUser | null
}

const ConfirmClient:React.FC<ConfrimProps> = ({
    reservations,
    currentUser
}) => {

    const router = useRouter()
    const contactModal = useContactModal();

    const reservation = reservations[0];
    // console.log(reservation)
    const createDate = new Date(reservation.createdAt)
    const createString = createDate.toLocaleDateString()
    const startDate = new Date(reservation.startDate)
    const startString = startDate.toLocaleDateString()
    const endDate = new Date(reservation.endDate)
    const endString = endDate.toLocaleDateString()
    return(
<ContentContainer>
<div className="flex flex-row">
    
    <div className="flex flex-col justify-center items-center p-4 w-3/5">
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
            {/* <div className = {Bebas.className}> */}
            <CustomHeading 
                center
                title="Reservation Confirmed!"
                subtitle="We will contact you once the host approves your reservation.
                    Thanks for choosing us!"
            />
            {/* </div> */}
            <div className="w-48 mt-4 flex flex-col gap-6">
                <Button
                    green
                    label="View My Reservations"
                    onClick={() => router.push("/reservations")}
                />
                <Button
                    green
                    label="Back to Search"
                    onClick={() => router.push("/")}
                />
            </div>
        </div>
    </div>
    
    <div className="flex flex-col justify-center items-center pr-20 px-15 w-2/5">
    <div className="bg-background-1
            rounded-xl
            border-[1px]
            border-neutral-200
            overflow-hidden">
    <div className="flex items-center bg-foreground-1 p-6 rounded-t justify-center relative border-b-[1px]">
                                <div className="text-2xl text-white font-semibold">
                                    Reservation Summary
                                </div>
                            </div>
        <div className="
                    flex flex-row items-center gap-1 p-4">
                        <div className="text-xl text-foreground-1 font-semibold">Start Date:</div>
                        <div className="font-light text-xl text-neutral-300">{startString}</div>
         </div>
         <hr/>
         <div className="
                    flex flex-row items-center gap-1 p-4">
                        <div className="text-xl text-foreground-1 font-semibold">End Date:</div>
                        
                        <div className="font-light text-xl text-neutral-300">{endString}</div>
         </div>
         <hr/>
         <div className="
                    flex flex-row items-center gap-1 p-4">
                        <div className="text-xl text-foreground-1 font-semibold">Submitted At:</div>
                        <div className="font-light text-xl text-neutral-300">{createString}</div>
         </div>
         <hr/>
         <div className="
                    flex flex-row items-center gap-1 p-4">
                        <div className="text-xl text-foreground-1 font-semibold">Status:</div>
                        <div className="font-light text-xl text-stone-400">{reservation.status}</div>
         </div>
         <hr/>
            {/* Content of the container goes here */}
            <div className="
                    flex flex-col items-center gap-1 p-4">
                        <div className="text-lg text-foreground-1 font-semibold">Want the host to review your request sooner?</div>
                        <Button label="Remind the Host" onClick={contactModal.onOpen}/>
         </div>
        </div>
    </div>
    
</div>
</ContentContainer>


        
           
    )
}

export default ConfirmClient