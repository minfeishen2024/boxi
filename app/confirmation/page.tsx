import EmptyState from "../components/EmptyStates";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";

import ConfirmClient from "./ConfirmClient";
import ContentContainer from "../components/ContentContainer";
import { Bebas_Neue } from "next/font/google";

const Bebas = Bebas_Neue({weight: "400",
     subsets: ['latin']})


const ConfirmationPage = async () => {
    const currentUser = await getCurrentUser();
    

    if (!currentUser) {
        return( 
        <ClientOnly>
            <EmptyState
                title="Not Logged In"
                subtitle = "looks like you have not reserved any trips"
                />
        </ClientOnly>
    )}

    const reservations = await getReservations({ userId: currentUser.id });

    return(
        <ClientOnly>
            
            <div className="fullscreen-background">
                <ConfirmClient reservations={reservations}
                    currentUser={currentUser}
                     />
            </div>
            
    </ClientOnly>
    )
}

export default ConfirmationPage