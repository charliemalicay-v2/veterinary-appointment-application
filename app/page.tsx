import Image from "next/image";


import { Box, Container } from '@chakra-ui/react';

import HeaderSearchBar from "../components/HeaderSearchBar";
import SideNavbar from "../components/SideNavbar";
import AppointmentCalendar from "../components/AppointmentCalendar";


export default function Home() {
  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <SideNavbar />
      <Box className="flex flex-col w-full h-screen overflow-hidden">
        <HeaderSearchBar />
        <AppointmentCalendar />
      </Box>
    </div>
  ); 
}
