import {NextResponse} from "next/server";

//The actual api call implementation to make reservation

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        listingId,
        startDate,
        endDate,
        totalPrice,
        numOfbox,
        storeHazard,
        storePerishable,
        storeFlammable
    } = body;

    if(!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error();
    }

    if(!numOfbox) {
        console.log('numOfBox undefined')
    }

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create:{
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                    numOfbox,
                    storeHazard,
                    storePerishable,
                    storeFlammable
                }
            }
        }
    });

    return NextResponse.json(listingAndReservation);
}
