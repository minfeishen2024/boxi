import {NextResponse} from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";


//The route.ts file to add favorite/update 
//favorite listings to the user model
interface IParams {
    listingId?: string;
}

export async function POST(
    request: Request,
    { params }: {params: IParams}

) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])]

    favoriteIds.push(listingId);
    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data:{ 
            favoriteIds
        }
    });

    return NextResponse.json(user)
}

//Function to delete listings from favorited listings

export async function DELETE(
    request: Request,
    { params } :{ params: IParams}
) {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
        return NextResponse.error()
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])]
    favoriteIds = favoriteIds.filter((id) => id !== listingId)

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    });

    return NextResponse.json(user)

}

//Move on to create hooks that use the two functions defined