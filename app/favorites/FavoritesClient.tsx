'use client';

import Container from "../components/Container";
import ContentContainer from "../components/ContentContainer";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface FavoritesClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;

}


const FavoritesClient: React.FC<FavoritesClientProps> = ({
    listings,
    currentUser
}) => {
    return(
        
        <Container>
            <ContentContainer>
      <Heading
        title="FAVORITES"
        subtitle="List of storage listings you have favorited"
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
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
      </ContentContainer>
    </Container>
    )
}


export default FavoritesClient