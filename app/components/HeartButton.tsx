'use client';


import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}



const HeartButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {

    // const hasFavorited = false;
    // const toggleFavorite = () => {}
    const {hasFavorited, toggleFavorite} = useFavorite({
        listingId, currentUser
    })



    return(
        <div onClick={toggleFavorite}
            className="relative
             hover:opacity-80
             transition
             cursor-pointer">
                <AiOutlineHeart size={28}
                    className="fill-white absolute -top-[2px] -right-[2px]" />
                {hasFavorited? (
                    <AiFillHeart size={24}
                    style={{ color: 'red' }}/>
                ) : (<AiFillHeart size={24}
                    className='fill-neutral'/>)}
                
            
        </div>
    )
}

export default HeartButton