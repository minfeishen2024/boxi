'use client';
import axios from 'axios';
import {AiFillGithub} from "react-icons/ai";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
    Select,
    Option,
    Button
  } from "@material-tailwind/react";
import {FcGoogle} from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import {toast} from 'react-hot-toast';
import useLoginModal from '@/app/hooks/useLoginModal';
import {useRouter} from 'next/navigation';
import { useEffect } from 'react';
import useReservationModal from '@/app/hooks/useReservationModal';
import getReservations from '@/app/actions/getReservation';
import { SafeReservation } from '@/app/types';


//Reservation Modal: The modal that displays information on all reservations
// for a particular listing, and lets the listing host manage them

interface ReservationModalProps {
    listingId?: string | null;
    
}



const ReservationModal: React.FC<ReservationModalProps> = ({
    listingId,
}) => {

    const router = useRouter();
    const reservationModal = useReservationModal();
    const[isLoading, setIsLoading] = useState(false);
    const reservations = reservationModal.reservations

    // useEffect(() => {
    //     const fetchReservations = async () => {
    //         try {
    //           const fetchedReservations = await getReservations({ listingId: listingId });
    //           console.log(fetchedReservations)
    //           setReservations(fetchedReservations);
    //         } catch (error) {
    //           console.error('Error fetching reservations:', error);
    //           // Optionally, handle the error (e.g., show a toast notification)
    //         }
    //       }
    //     fetchReservations();
    //   }, [listingId, reservationModal.isOpen]);

    
    

    const TABS = [
        {
          label: "All",
          value: "all",
        },
        {
          label: "Pending",
          value: "pending",
        },
        {
          label: "Upcoming",
          value: "upcoming",
        },

        {
            label: "Ongoing",
            value: "ongoing",
          },

      ];
       
      const TABLE_HEAD = ["Requester", "Start Date", "End Date", "Status", "Manage"];

      const TABLE_ROWS = [
        {
          img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
          name: "John Michael",
          job: "Manager",
          org: "Organization",
          pending: true,
          date: "23/04/18",
        },
        {
          img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
          name: "Alexa Liras",
          pending: false,
          date: "23/04/18",
        },
        {
          img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
          name: "Laurent Perrier",
          email: "laurent@creative-tim.com",
          job: "Executive",
          org: "Projects",
          pending: false,
          date: "19/09/17",
        },
      ];

    let bodyContent=(
        <div className = "flex flex-col gap-4">
            <Heading title="Manage Reservations" subtitle="View, approve, and provide updates on all reservations made to this listing"/>
            <Card className="h-full w-full">
            <Tabs value="all" className="w-full">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="overflow-x-auto">
          <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              ({ img, name, pending, date }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt={name} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                          
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                    <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={pending ? "pending" : "approved"}
                          color={pending ? "blue-gray" : "green"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        {/* <IconButton variant="text">
                          {/* <PencilIcon className="h-4 w-4" /> */}
                        {/* </IconButton> */} 
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
        </div>
        </Card>
          </div>
           
    )

    if (reservations != null) {
        const tableRows = reservations.map(reservation => {
            const startDate = new Date(reservation.startDate)
            const endDate = new Date(reservation.endDate)
            return {
                name: reservation.userId,
                pending: reservation.status === "Waiting To Be Approved",
                startDate: startDate.toLocaleDateString(),
                endDate: endDate.toLocaleDateString()
            }
        })


        bodyContent = (
            <div className = "flex flex-col gap-4">
               <Heading title="Manage Reservations" subtitle="View, approve, and provide updates on all reservations made to this listing"/>
            <Card className="h-full w-full">
            <Tabs value="all" className="w-full">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs> 
          <div className="overflow-x-auto">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
            <tr>
                {TABLE_HEAD.map((head) => (
                <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                    >
                    {head}
                    </Typography>
                </th>
                ))}
            </tr>
            </thead>

            <tbody>
            {tableRows.map(
              ({ name, pending, startDate, endDate }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        {/* <Avatar src={img} alt={name} size="sm" /> */}
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            User
                          </Typography>
                          
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {startDate}
                      </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {endDate}
                      </Typography>
                    </td>
                    <td className={classes}>
                    <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={pending ? "pending" : "approved"}
                          color={pending ? "blue-gray" : "green"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      {/* <Tooltip content="Manage this reservation"> */}
                      <div className="w-full">
      <Select label="Select Action">
        <Option>Approve</Option>
        <Option>Deny</Option>
        <Option>Provide Update</Option>
      </Select>
    </div>
                      {/* </Tooltip> */}
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
    </table>
    </div>
    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 1
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>

    </Card>
</div>
            
        )
    }



    
    return(
        <Modal
            disabled={isLoading}
            listingId={reservationModal.listingId}
            isOpen={reservationModal.isOpen}
            title="Reservations"
            // actionLabel="Login"
            onClose={reservationModal.onClose}
            onSubmit={() => {}}
            body = {bodyContent}
             />
    )
}

export default ReservationModal