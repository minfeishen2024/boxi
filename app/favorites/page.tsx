import EmptyState from "../components/EmptyStates";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";
import ContentContainer from "../components/ContentContainer";


const ListingPage = async () => {

    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();


    if (listings.length === 0) {
        return(
            <ClientOnly>
                <ContentContainer>
                    <EmptyState
                        title = "No favorites found"
                        subtitle= "Looks like you have no favorited storage listings" 
                    />
                </ContentContainer>
            </ClientOnly>
        )
    }


    return(
        <ClientOnly>
            <FavoritesClient
                listings = {listings}
                currentUser = {currentUser}/>
                
        </ClientOnly>
        
    )



}

export default ListingPage