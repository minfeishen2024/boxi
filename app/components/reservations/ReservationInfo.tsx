'use client';

import { useMemo } from "react";

import { 
    SafeListing, 
    SafeReservation, 
  } from "@/app/types";
import { Chip } from "@material-tailwind/react";

interface ReservationInfoProps {
    data: SafeListing;
    reservation?: SafeReservation;
 };

const ReservationInfo: React.FC<ReservationInfoProps> = ({
    data,
    reservation,
}) => {
    const title = data.title;
    const city = data.city;
    const state = data.state;
    const hazard = reservation?.storeHazard
    const perishable = reservation?.storePerishable
    const flammable = reservation?.storeFlammable

    const status = useMemo(() => {
        if (reservation) {
          return reservation.status;
        }
        return 'null';
    }, [reservation]);

    const color = useMemo(() => {
        if (status == "Waiting To Be Approved") {
          return "gray";
        }
        return "green"
      }, [reservation]);
    
    const label = useMemo(() => {
        if (status == "Waiting To Be Approved") {
          return "Pending";
        }
        return "Approved"
    }, [reservation]);

    const price = useMemo(() => {
        if (reservation) {
          return reservation.totalPrice;
        }
    
        return data.price;
    }, [reservation, data.price]);
    

    return(
        <div className="p-10 mt-20">
            <div className="font-semibold text-2xl pb-5">
                {title}
            </div>
            <div className="font-semibold text-lg">
                {city}, {state}
            </div>
            <div className="font-semibold text-lg mb-5">
                Total: ${price}.00
            </div>
            {perishable && (
                <div className="font-semibold text-lg mb-5">
                Items perishable
            </div>
            )}
            {flammable && (
                <div className="font-semibold text-lg mb-5">
                Items flammable
            </div>
            )}
            {hazard && (
                <div className="font-semibold text-lg mb-5">
                Items hazardous
            </div>
            )}

            <div className="font-semibold text-foreground-1 w-fit">
                <Chip
                    variant="ghost"
                    size="sm"
                    value={label}
                    color={color}
                />
            </div>   
        </div>
    );
}

export default ReservationInfo;