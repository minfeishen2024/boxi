// 'use client';

import Container from "./components/Container";
import ClientOnly from "./components/ClientOnly";
import EmptyState from "./components/EmptyStates";
import getCurrentUser from './actions/getCurrentUser';
import { useState, useEffect, useMemo } from "react";
import { SafeUser } from "@/app/types";
import dynamic from "next/dynamic"



import Landing from "./components/Landing";
import Heading from "./components/Heading";
import MyMap from "./components/MyMap";
// import Map from "./components/Map";

import getListings, {IListingsParams} from "./actions/getListings";

import ListingCard from "./components/listings/ListingCard";
import ContentContainer from "./components/ContentContainer";

interface HomeProps {
  searchParams: IListingsParams,
};

const Home = async ({searchParams}: HomeProps) => {

  // const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);
  // const [isLoading, setIsLoading] = useState(true);

  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser()
  // const isEmpty = true;
  // const router = useRouter()
  
  
  if (!currentUser) {
    return(
      <ClientOnly>
        <div className="fullscreen-background-landing">
            {/* <Landing /> */}
        </div>
        
      </ClientOnly>
    )
  }

  if (listings.length === 0) {
    
    return(
      <ClientOnly>
        <ContentContainer>
        <EmptyState showReset />
        </ContentContainer>
      </ClientOnly>
    )
  }

  
  

  // listings.forEach((listing) => {
  //   console.log(listing.latitude)
  // });
  return (
    <ClientOnly>
      <ContentContainer>
      <Container>
      <div className="flex flex-wrap -mx-4">
      <div className="w-full lg:w-1/2 px-4 h-screen overflow-y-auto">
        <div className = "pt-24">
        <Heading
          title = "STORAGE NEAR YOUR ZIPCODE"
          subtitle = "You can sort and filter these storages. If you didn't enter a zipcode, this page would list all available listings from the database."/>
          <div 
          className="
            mt-10
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-1
            xl:grid-cols-2
            2xl:grid-cols-3
            gap-8
          ">
            {listings.map((listing: any) => {
              return(
                <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
              )
            })}
            
              
          </div>

          
            

        </div>
       </div>
       {/* Right side of screen */}
       <div className="w-full lg:w-1/2 px-4 h-screen">
       {/* <div className="fullscreen-map"> */}
        <MyMap data={listings}/>
      {/* </div> */}
      </div>
      </div>
       {/* </div> */}
      </Container>
      </ContentContainer>
    </ClientOnly>
  )
}

export default Home;
