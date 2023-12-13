'use client'


import { SafeListing, SafeUser } from "@/app/types";
import MapGL from 'react-map-gl';
import { useCallback, useState } from "react";
import { CollapseProps, Collapse, Card, CardBody, Rating, Typography, CardHeader} from "@material-tailwind/react";

import Button from "@/app/components/Button";
import useContactModal from "@/app/hooks/useContactModal";

import Avatar from "@/app/components/Avatar";
import { FaEnvelope } from "react-icons/fa";
import ListingHead from "@/app/components/listings/ListingHead";

interface ListingInfoProps {
    user: SafeUser;
    description: string;
    boxCount: number;
    rating: number | null;
    petFree: boolean;
    secureEntrance: boolean;
    tempControl: boolean;
    currentUser?: SafeUser | null
    listing: SafeListing

}

const Map = null;


const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    boxCount,
    rating,
    petFree,
    secureEntrance,
    tempControl,
    currentUser,
    listing
}) => {

    if (rating == null) {
        rating = 0;
    } else {
        rating = rating
    }

    const [open, setOpen] = useState(false);
    const [actionLabel, setActionLabel] = useState("Expand Comments");
    const contactModal = useContactModal();
    


const toggleOpen = () => {
    const newOpenState = !open;
    setOpen(newOpenState);
    setActionLabel(newOpenState ? "Hide Comments" : "Expand Comments");
}

  

 

    //value for getting coordinate of listing
    const coordinate = { latitude: 40.7128, longitude: -74.0060 };
    const [viewport, setViewport] = useState({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        zoom: 10
      });

    
    
    

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
            <ListingHead
                title={listing.title}
                imageSrc={listing.imageSrc}
                zipCode={listing.zipCode}
                city={listing.city}
                id={listing.id}
                rating={listing.rating}
                currentUser={currentUser}
              />
                <div className="text-xl font-semibold
                    flex flex-row items-center gap-2">
                        <div>Hosted by {user?.name}</div>
                      
                        <Avatar src={user?.image} className="hover:cursor-pointer"/>
                        {/* <div className="text-sm hover: cursor-pointer">Rating placeholder</div> */}
                        <div className="flex flex-col items-start">
                            <FaEnvelope style={{color:'#59745D'}} size={25}className="hover:cursor-pointer" onClick={contactModal.onOpen}/>
                        {/* <Rating value={rating}/> */}
                        
                    </div>
                    </div>
                    <div className="
                        flex
                        flex-row items-center
                        gap-1
                        font-light
                        text-neutral-500">
                        <div>Stores {boxCount} boxes</div>
                        <div style={{backgroundColor: "#693B18"}}className="h-full w-px bg-gray-300 mx-4"></div>
                        {petFree&&(
                        <>
                            <div>Pet Free</div>
                            <div style={{backgroundColor: "#693B18"}}className="h-full w-px bg-gray-300 mx-4"></div>
                            </>)
                        }
                        
                        {tempControl &&(
                        <>
                        <div>Temperature Controlled</div>
                        <div style={{backgroundColor: "#693B18"}}className="h-full w-px bg-gray-300 mx-4"></div>
                        </>)
                         }
                        {/* <div style={{backgroundColor: "#693B18"}}className="h-full w-px bg-gray-300 mx-4"></div> */}
                        {secureEntrance&&(<><div>Secure Access</div>
                        <div style={{backgroundColor: "#693B18"}}className="h-full w-px bg-gray-300 mx-4"></div></>)}
                        {/* <div style={{backgroundColor: "#693B18"}}className="h-full w-px bg-gray-300 mx-4"></div> */}
                        <div>Offers Pickup</div>
                        <div style={{backgroundColor: "#693B18"}}className="h-full w-px bg-gray-300 mx-4"></div>
                        {/* <div style={{backgroundColor: "#693B18"}}className="h-full w-px bg-gray-300 mx-4"></div> */}
                        <div>Offers Dropoff</div>
                        {/* <div style={{backgroundColor: "#693B18"}}className="h-full w-px bg-gray-300 mx-4"></div> */}

                        </div>
                    <hr/>
                    <div className="text-lg font-light text-neutral-500">
                        <div className="text-xl font-semibold">Description</div>
                        {description}
                    </div>
                    <hr />
                    {/* Div where the map is supposed to be */}
                    <div className="max-w-1/2 w-full">
                {/* <MapGL
                    {...viewport}
                    width="100%"
                    height="400px" // Adjust height as needed
                    onViewportChange={setViewport}
                    mapStyle="mapbox://styles/mapbox/streets-v11" // Use your preferred style
                    mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN} // Your Mapbox access token
                ></MapGL> */}

                </div>
    <Button green label={actionLabel} onClick={toggleOpen}/>

    {open? (
        <div>
    
    <Card className="my-4 mx-auto w-8/12">
    <CardBody>
      <Typography>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  
     </Typography>
   </CardBody>
</Card>
</div>
    ):(<></>)}
       
            </div>

        </div>
    )
}

export default ListingInfo