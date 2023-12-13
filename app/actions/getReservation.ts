import prisma from "@/app/libs/prismadb";

//Action for client components to get reservations

interface IParams {
    listingId?: string;
    userId?: string;
    //authorId is used for querying reservations 
    //made on properties owned by the currentUser
    authorId?: string;
}


export default async function getReservations(
    params: IParams
) {
  try{  
        const {listingId, userId, authorId} = params;

        const query:  any = {};


        // find all reservation a particular listing has
        if (listingId) {
            query.listingId = listingId;

        }

        //find all trips a user have
        if (userId) {
            query.userId = userId;
        }


        //find all reservations other users made for our listing
        if (authorId) {
            query.listing = {userId: authorId}
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },

            orderBy:{
                createdAt: 'desc'
            }
        });

        const safeReservations = reservations.map(
            (reservation) => ({
                ...reservation,
                createdAt: reservation.createdAt.toISOString(),
                startDate: reservation.startDate.toISOString(),
                endDate: reservation.endDate.toISOString(),
                listing: {
                    ...reservation.listing,
                    createdAt: reservation.listing.createdAt.toISOString()
                }
            })
        );
        return safeReservations;
    } catch (error: any) {
        throw new Error(error);
    }
    
}