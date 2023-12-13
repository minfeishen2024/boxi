import EmptyState from "@/app/components/EmptyStates";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import ReservationsClient from "./ReservationsClient";
import ContentContainer from "../components/ContentContainer";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly> 
        <ContentContainer>
            <EmptyState
            title="Unauthorized"
            subtitle="Please login"
            />
        </ContentContainer>
      </ClientOnly>
    )
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <ContentContainer>
            <EmptyState
            title="No reservations found"
            subtitle="Looks like you haven't made any reservation to store your stuff."
            />
        </ContentContainer>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ContentContainer>
        <ReservationsClient
            reservations={reservations}
            currentUser={currentUser}
        />
      </ContentContainer>
    </ClientOnly>
  );
}
 
export default ReservationsPage;