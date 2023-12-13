
'use client';
import {useRouter} from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";
import BackgroundImage from "./BackgroundImage";
import imgSrc from '../static/images/boxibackground.png'


interface Landing {
    title? : string;
    subtitle?: string;
    showReset?: boolean;
}



const Landing: React.FC<Landing> = ({
    title= "Welcome to Boxi",
    subtitle= "Replace with landing Image",
    showReset
}) => {
    const router = useRouter();

    return (

        <div className="fixed flex flex-row bottom-0 w-full h-[25vh] bg-transparent justify-center items-center p-4">
    <div className="w-1/3 h-full flex justify-center items-center">
        {/* Content of left div */}
    </div>
    <div className="w-1/3 h-full py-20 flex justify-center items-center">
        <Button landing onClick={() => {}} label="Get Started"/>
    </div>
    <div className="w-1/3 h-full flex justify-center items-center">
        {/* Content of right div */}
    </div>
</div>


        
        
        // <div 
        //     className="
                
        //         h-[60vh]
        //         flex
        //         flex-col
        //         gap-2
        //         justify-center
        //         items-center"
        //         >
                    
        //             <Heading 
        //                 center
        //                 title={title}
        //                 subtitle={subtitle}
        //                 />
        //             <div className="w-48 mt-4">
                        
        //                     <Button
        //                         outline
        //                         label="User not logged in"
        //                         onClick={() => router.push("/")}
        //                         />
                        
        //             </div>
                    
        //         </div>
                
    )
}

export default Landing