'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import getReservations from "../actions/getReservation";

import { SafeReservation, SafeUser, SafeListing } from "@/app/types"
;
import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import StorageCard from "@/app/components/storages/StorageCard";

interface StorageProps {
  listings: SafeListing[],
  reservations: SafeReservation[],
  currentUser?: SafeUser | null,
}

const StoragesClient: React.FC<StorageProps> = ({
  listings,
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');
  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/listings/${id}`)
    .then(() => {
      toast.success('Listing Deleted');
      router.refresh();
    })
    .catch(() => {
      toast.error('Something went wrong.')
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);

  const filterReservations = (listingId: string) => {
    return reservations.filter(reservation => reservation.listingId === listingId)
  }

  return (
    <Container>
      <Heading
        title="MY STORAGE PROPERTIES"
        subtitle="These are the storages you are hosting. Click on each one to view who has made reservations on them, and manage their reservations."
      />
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listing) => (
          <StorageCard
            key={listing.id}
            data={listing}
            reservations = {filterReservations(listing.id)}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete Property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
   );
}
 
export default StoragesClient;