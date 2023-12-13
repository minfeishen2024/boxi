'use client';
import { useEffect, useState } from "react";



interface ContentContainerProps {
    children: React.ReactNode;
}

const ContentContainer:React.FC<ContentContainerProps> = ({
    children
}) =>{
    const[hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return ( 
        <div className="pb-20 pt-40 " >
        {children}
        </div>
    )
}

export default ContentContainer;