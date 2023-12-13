import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import {Nunito} from "next/font/google";
import {Montserrat} from "next/font/google";

import Navbar from "./components/navbar/Navbar";

import './globals.css'
import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/modals/RegisterModal';
import Modal from './components/modals/Modal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import Filter from './components/Filter';
import Container from './components/Container';
import RentModal from './components/modals/RentModal';
import SearchModal from './components/modals/SearchModal';
import ReservationModal from './components/modals/ReservationModal';
import Overlay from './components/Overlay';
import ContactModal from './components/modals/ContactModal';

const font = Nunito({
  subsets:["latin"],
})

const font2 = Montserrat({
  subsets:["latin"],
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Boxi',
  description: 'Boxi Project',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();




  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
        <ToasterProvider />
        <SearchModal/>
        <RegisterModal/>
        <ContactModal/>
        <LoginModal/>
        <RentModal/>
        <ReservationModal/>
        <Navbar currentUser={currentUser}/>
        <Overlay />
        </ClientOnly>


        {/* <div className="pb-20 pt-40 " > */}
        <div>
          {children}
        </div>
        
        
        
        </body>
    </html>
  )
}
