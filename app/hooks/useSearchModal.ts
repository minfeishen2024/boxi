import {create} from 'zustand';

interface SearchModalStore {
    isOpen: boolean;
    reset: boolean;
    onOpen: () => void;
    onClose: () => void;
    onReset: () => void;
    clearReset: () => void;
    
}

const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    reset: false,
    onOpen: () => set({isOpen: true, reset:false}),
    onClose: () => set({isOpen: false}),
    onReset: () => set({reset: true}),
    clearReset: () => set({reset: false})
    
}));

export default useSearchModal;