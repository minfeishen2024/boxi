'use client';


import {Reservation} from "@prisma/client";
import { Range } from "react-date-range";
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";
import { SafeListing, SafeUser } from "@/app/types";
import { useState } from "react";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useEffect } from "react";

import { SafeReservation } from "@/app/types";

import toast from "react-hot-toast";
import axios from "axios";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "./ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import ListingReservation from "../../components/listings/ListingReservation";

interface ListingClientProps {
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
}

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key:'selection'

};

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservations = [],
    currentUser
}) => {

    const loginModal = useLoginModal();
    const router = useRouter();
    const disabledDates = useMemo(() => {
        let dates: Date[] = [];
        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })
            dates = [...dates, ...range];
        });

        return dates;
        

    },[reservations])

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [numOfbox, setNumOfBox] = useState(1);
    const [storeHazard, setStoreHazard] = useState(false);
    const [storePerishable, setStorePerishable] = useState(false);
    const [storeFlammable, setStoreFlammable] = useState(false);
    const [pickup, setPickUp] = useState(false);
    const [dropOff, setDropOff] = useState(false);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        setIsLoading(true);
        //Creating a reservation
        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id,
            numOfbox,
            storeHazard,
            storePerishable,
            storeFlammable
        })
        .then(() => {
            toast.success('Listing Reserved!')
            setDateRange(initialDateRange);
            setNumOfBox(1);
            //redirect to confirmation page
            router.push("/confirmation")
            //router.refresh();
        })
        .catch(() => {
            toast.error('Something went wrong')
        })
        .finally(() => {
            setIsLoading(false)
        })

    },[totalPrice, dateRange, numOfbox, listing?.id, router, currentUser, loginModal, storeHazard, storeFlammable, storePerishable])

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )

            if (dayCount && listing.price) {
                setTotalPrice(Math.floor(dayCount / 7 * listing.price * numOfbox));
            }

        } else {
            setTotalPrice(listing.price);
        }
    }, [dateRange, listing.price, numOfbox])

    return ( 
        <Container>
          <div 
            className="
              max-w-screen-2xl 
              mx-auto
            "
          >
            {/*  Header and All*/}
            <div className="flex flex-col gap-6">
              {/* <ListingHead
                title={listing.title}
                imageSrc={listing.imageSrc}
                zipCode={listing.zipCode}
                city={listing.city}
                id={listing.id}
                rating={listing.rating}
                currentUser={currentUser}
              /> */}
              <div 
                className="
                  grid 
                  grid-cols-1 
                  md:grid-cols-7 
                  md:gap-10 
                  mt-6
                "
              >
                {/* Left Side */}
                <ListingInfo
                  listing={listing}
                  currentUser={currentUser}
                  user={listing.user}
                  rating = {listing.rating}
                  description={listing.description}
                  boxCount={listing.boxCount} 
                  petFree={listing.petFree}
                  tempControl={listing.tempControlled}
                  secureEntrance={listing.secureEntrance}
                />
                <div 
                  className="
                    order-first 
                    mb-10 
                    md:order-last 
                    md:col-span-3
                  "
                >

                  {/*Right Side  */}
                  <ListingReservation
                    user={listing.user}
                    price={listing.price}
                    totalPrice={totalPrice}
                    onChangeDate={(value) => setDateRange(value)}
                    numOfBox={numOfbox}
                    onChangeBox={(value) => setNumOfBox(value)}
                    dateRange={dateRange}
                    onSubmit={onCreateReservation}
                    disabled={isLoading}
                    disabledDates={disabledDates}
                    storeFlammable={storeFlammable}
                    storeHazard={storeHazard}
                    storePerishable={storePerishable}
                    onChangeFlammable={(value) => setStoreFlammable(value)}
                    onChangeHazard={(value) => setStoreHazard(value)}
                    onChangePerishable={(value) => setStorePerishable(value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
       );


}

export default ListingClient