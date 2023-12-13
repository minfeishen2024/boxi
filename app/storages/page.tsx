import EmptyState from "@/app/components/EmptyStates";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";
import getReservations from "../actions/getReservation";

import StoragesClient from "./StoragesClient";
import ContentContainer from "../components/ContentContainer";

const StoragesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    );
  }

  const listings = await getListings({ userId: currentUser.id });
  const reservations = await getReservations({});

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <ContentContainer>
          <EmptyState
            title="No storages found"
            subtitle="Looks like you don't have any storages under your name."
          />
        </ContentContainer>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ContentContainer>
        <StoragesClient
          listings={listings}
          reservations={reservations}
          currentUser={currentUser}
        />
      </ContentContainer>
    </ClientOnly>
  );
}
 
export default StoragesPage;