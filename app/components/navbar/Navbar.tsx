'use client';

import Container from "../Container";
import Logo from "./Logo"
import Search from "./Search";
import UserMenu from "./UserMenu";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Button from "../Button";
import {User} from "@prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { SafeUser } from "@/app/types";
import Filter from "../Filter";
import FilterIris from "../FilterIris";
import { usePathname, useRouter } from "next/navigation";


//Logo: replace with logo
//Search: search bar, can replace with toggle button for store/host
//UserMenu: Dropdown Menu at topright
interface NavbarProps {
    currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {
    const registerModal = useRegisterModal()
    const pathName = usePathname()
    let hideFilter = false;
    
    if (pathName != null) {
        hideFilter = (pathName.includes('/listings/') || pathName.includes('/confirmation')
            )
    }
    

    
    return(
        <div className="fixed w-full bg-background-1 z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div
                        className="
                            flex flex-row items-center justify-between gap-3 md:gap-0
                        "
                    >
                        <Logo />
                        <Search />
                        
                        {/* {loggedIn? (
                            <UserMenu />
                        ): (
                            <Button outline label="Login" onClick={registerModal.onOpen} />
                        )} */}
                        
                        <UserMenu currentUser={currentUser} />
                    </div>
                    
                    
                </Container>
            </div>
            {/* Need to add conditional rendering for Filter component-only render when logged in */}
            {currentUser && !hideFilter? (<Filter/>) : (<></>)}
            
        </div>
        
        

    )
}

export default Navbar;