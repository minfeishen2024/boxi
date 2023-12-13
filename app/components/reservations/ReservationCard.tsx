'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';

import ReservationInfo from "../reservations/ReservationInfo";

import { 
  SafeListing, 
  SafeReservation, 
  SafeUser 
} from "@/app/types";

import Button from "../Button";
import useContactModal from "@/app/hooks/useContactModal";

interface ReservationCardProps {
  data: SafeListing & {
    user: SafeUser
  };
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionId?: string;
};

const ReservationCard: React.FC<ReservationCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionId = '',
}) => {
  const router = useRouter();
  const contactModal = useContactModal();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
  
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `from ${format(start, 'PP')} to ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div className="rounded-xl shadow-md grid grid-cols-3 group w-5/6 flex justify-center  border-black">
        {/* Image */}
        <div className="gap-10 w-full p-10 rounded_xl">
            <div className="font-semibold text-xl underline mb-2 ml-1">
                Reserved {reservationDate}
            </div>
            
            <div className="aspect-square w-full relative overflow-hidden rounded-xl">
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
            </div>
        </div>

        {/* Reservation Info */}
        <ReservationInfo
              data={data}
              reservation={reservation}
        /> 

        {/* Action Buttons */}
        <div className="p-10 mt-20 gap-10">
            <div className="mb-5">
                {/* <Button
                    disabled={disabled}
                    label="Manage Reservation"
                    // TODO: create modal that allows user to modify information regarding reservation (change number of boxes, features, or dates)
                    onClick={() => {}}
                /> */}
            </div>
            <div className="mb-5">
                <Button
                    disabled={disabled}
                    label="View Listing"
                    onClick={() => router.push(`/listings/${data.id}`)} 
                />
            </div>
            <div className="mb-5">
                <Button
                    disabled={disabled}
                    label="Contact Host"
                    onClick={contactModal.onOpen} 
                />
            </div>
            <div>
                <Button
                    outline
                    label="Cancel Reservation"
                    onClick={handleCancel}
                />
            </div>
        </div>
    </div>
   );
}
 
export default ReservationCard;