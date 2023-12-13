import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  boxCount?: number;
  startDate?: string;
  endDate?: string;
  zipcode?: string;
  petFreeRequired?: string;
  tempControllRequired?: string;
  secureRequired?: string;
  sortBy?:string;
  sortOrder?: 'asc' | 'desc'
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const {
      userId,
      boxCount,
      zipcode,
      startDate,
      endDate,
      petFreeRequired,
      tempControllRequired,
      secureRequired,
      sortBy,
      sortOrder = 'asc'
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }
    if (boxCount) {
      query.boxCount = {
        gte: +boxCount
      }
    }

    if (zipcode) {
      query.zipCode = zipcode;
    }

    if (petFreeRequired) {
        
        if(petFreeRequired === "true"){
          query.petFree = true;
        }
      }

    if (tempControllRequired) {
      
      if (tempControllRequired === "true") {
        query.tempControlled = true;
      }
    }

    if (secureRequired) {
      if(secureRequired === "true") {
        query.secureEntrance = true;
      }
        
      }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }

    let orderCriteria: any = {};

    if (sortBy) {
        orderCriteria[sortBy] = sortOrder
    } else {
        orderCriteria.createdAt = 'desc'
    }
    const listings = await prisma.listing.findMany({
      where: query,
    //   orderBy: {
    //     createdAt: 'desc'
    //   }
      orderBy: orderCriteria
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString()
      
    }));
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}

// export default async function getListings(
//     params: IListingsParams
// ) {
//     try{
//         const {boxCount} = params;

//         let query: any={};

//         if (boxCount) {
//             query.boxCount = boxCount;
//         }
        
//         const listings = await prisma.listing.findMany({
//             where: query,
//             orderBy: {
//                 createdAt:'desc'
//             }
//         })
//         return listings;
//     } catch (error:any){
//         throw new Error(error)
//     }
// }