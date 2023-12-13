'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';
import { MdDelete } from "react-icons/md";

import HeartButton from "../HeartButton";
import { useState } from "react";

import { 
  SafeListing, 
  SafeReservation, 
  SafeUser 
} from "@/app/types";

// import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";
import useReservationModal from "@/app/hooks/useReservationModal";
import getReservations from "@/app/actions/getReservation";

interface StorageCardProps {
  data: SafeListing;
  reservations?: SafeReservation[] | null;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
};

const StorageCard: React.FC<StorageCardProps> = ({
  data,
  reservations,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();
  const reservationModal = useReservationModal();
  const state = data.state;
  const zip = data.zipCode;


  const handleStorageClick = useCallback((async (listingId: string) => {
    try {
      console.log({listingId})
      //const reservations = await getReservations({listingId: data.id})
      // setStorageReservation(reservations);
      reservationModal.onOpen(data.id, reservations)
      console.log(reservationModal.isOpen)
    } catch (error) {
      return Error('error');
    }
  }), [data])

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);

  const price = useMemo(() => {

    return data.price;
  }, [data.price]);

  if (reservations) {
    console.log(reservations)
  }


  return (
    <div 
      onClick={() => handleStorageClick(data.id)} 
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div 
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imageSrc}
            alt="Listing"
          />
          <div className="
            absolute
            top-3
            right-3
          ">
            <HeartButton 
              listingId={data.id} 
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {state}, {zip}
        </div>
        {/* <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div> */}
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {price}
          </div>
            <div className="font-light">per box/week</div>
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            secondary
            label={actionLabel} 
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
   );
}
 
export default StorageCard;