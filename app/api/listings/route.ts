import {NextResponse} from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';



export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json()
    const {
            address,
            state,
            city,
            zipCode,
            title,
            description,
            imgSrc,
            boxCount,
            price,
            petFree,
            tempControlled,
            secureEntrance,
            latitude,
            longitude
    } = body;

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc: imgSrc,
            boxCount,
            address,
            state,
            city,
            zipCode,
            userId: currentUser.id,
            price: parseInt(price, 10),
            petFree,
            tempControlled,
            secureEntrance,
            latitude,
            longitude

        }
    });

    return NextResponse.json(listing);

}