'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import ReservationCard from "../components/reservations/ReservationCard";

interface ReservationClientProps {
  reservations: SafeReservation[],
  currentUser?: SafeUser | null,
}

const ReservationClient: React.FC<ReservationClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success('Reservation cancelled');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);

  reservations.forEach((reservation) => {
    console.log(reservation.id);
});

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Ongoing",
    value: "ongoing",
  },
  {
    label: "Upcoming",
    value: "upcoming",
  },
  {
    label: "Pending",
    value: "Wait To Be Approved",
  },
  {
    label: "Completed",
    value: "Completed",
  },

];

// TODO: add tab functionality
var pendingReservations = reservations.filter(x => x.status == "Waiting To Be Approved")
var ongoingReservations = reservations.filter(x => x.status == "Ongoing")
var upcomingReservations = reservations.filter(x => x.status == "Upcoming")

  return (
    <Container>
      <Heading
        title="MY RESERVATIONS"
        subtitle="These are the reservations you have made to store your stuff. Click on each one to view details and status!"
      />
      <br></br>

      {/* tab bar */}
      <div className="mb-5 relative z-0 flex flex-col justify-center items-center">
        <Tabs value="all" className="w-5/6">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs> 
      </div>
      
      <div className="w-full overflow-hidden text-lg">
        <div className="flex flex-col items-center justify-center gap-4">
            {reservations.map((reservation: any) => (
            <ReservationCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
            />
          ))}
        </div>
      </div>
    </Container>
   );
}
 
export default ReservationClient;