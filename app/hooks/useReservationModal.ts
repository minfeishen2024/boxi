import {create} from 'zustand';
import { SafeReservation } from '../types';

interface ReservationModalStore {
    isOpen: boolean;
    listingId: string | null;
    reservations: SafeReservation[] | null
    onOpen: (id: string, reservations: SafeReservation[] | null | undefined) => void;
    onClose: () => void;
    setListingId: (ud: string | null) => void;
    

    
}

const useReservationModal = create<ReservationModalStore>((set) => ({
    isOpen: false,
    listingId: null,
    reservations: [],
    onOpen: (id, reservations) => set({isOpen: true, listingId: id, reservations: reservations || []}),
    onClose: () => set({isOpen: false, listingId: null, reservations: []}),
    setListingId: (id) => set({listingId: id}),
    
}));

export default useReservationModal;