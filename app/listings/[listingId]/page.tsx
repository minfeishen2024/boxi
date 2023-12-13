import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById"
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyStates";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservation";
import ContentContainer from "@/app/components/ContentContainer";

interface IParams {
    listingId?: string;
}


const ListingPage = async ({params}: {params: IParams}) => {
    const listing = await getListingById(params)
    const reservations = await getReservations(params)
    const currentUser = await getCurrentUser()

    if (!listing) {
        return(
            <ClientOnly>
                <ContentContainer>
                <EmptyState/>
                </ContentContainer>
            </ClientOnly>
        )
    }
    return(
        <ClientOnly>
            <ContentContainer>
           <ListingClient 
                listing={listing}
                reservations = {reservations}
                currentUser={currentUser}/>
                </ContentContainer>
        </ClientOnly>
        
    )
}

export default ListingPage