'use client';
import useContactModal from "../hooks/useContactModal";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
import useRentModal from "../hooks/useRentModal";
import useReservationModal from "../hooks/useReservationModal";
import useSearchModal from "../hooks/useSearchModal";

interface OverlayProps {
    modalIsOpen?: boolean
}

const Overlay:React.FC<OverlayProps> = ({
    modalIsOpen
}) => {

    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const registerModal = useRegisterModal();
    const searchModal = useSearchModal();
    const contactModal = useContactModal();
    const reservationModal = useReservationModal();
  
    const isAnyModalOpen = loginModal.isOpen || rentModal.isOpen || registerModal.isOpen || searchModal.isOpen || contactModal.isOpen || reservationModal.isOpen

    if(!isAnyModalOpen){
        return null;
    }

    return <div className="fixed inset-0 bg-black bg-opacity-50 z-30"></div>;
}

export default Overlay;