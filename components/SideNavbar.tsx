'use client'

import * as React from 'react';

import Image from 'next/image';

import {Box, Button, IconButton, Text, Separator} from "@chakra-ui/react";

import { Icon } from '@iconify/react';

import { sidebarItemsConstants } from "./constants";

import headerImage from '../assets/sidenavbar/header/icon.svg';

import {
    AppointmentsSVG,
    ContactsSVG,
    DataAnalyticsSVG,
    HelpCenterSVG,
    HomeSVG,
    MessagesSVG,
    SettingsSVG, SubscriptionSVG
} from "./svgComponents";

import homeMenuIcon from '../assets/sidenavbar/menu-items/home.png';
import appointmentsMenuIcon from '../assets/sidenavbar/menu-items/appointments.png';
import appointmentsActiveMenuIcon from '../assets/sidenavbar/menu-items/appointments-active.svg';
import messagesMenuIcon from '../assets/sidenavbar/menu-items/messages.png';
import contactsMenuIcon from '../assets/sidenavbar/menu-items/contacts.png';
import dataAnalyticsMenuIcon from '../assets/sidenavbar/menu-items/dataAnalytics.png';
import subscriptionMenuIcon from '../assets/sidenavbar/menu-items/subscription.png';
import helpCenterMenuIcon from '../assets/sidenavbar/menu-items/helpCenter.png';
import settingsMenuIcon from '../assets/sidenavbar/menu-items/settings.png';
import App from "next/app";


const SideNavbar = () => {
    const menuItemRef = React.useRef<HTMLElement[]>([]);

    const [menuItemsActive, setMenuItemsActive] = React.useState(Array(Object.entries(sidebarItemsConstants).length).fill(false));
    const [menuItemHover, setMenuItemHover] = React.useState("");
    const [hideSidebar, setHideSidebar] = React.useState(false);

    const handleClickMenuItem = (index: number) => {
        setMenuItemsActive(prevState => prevState.map((data, i) => index === i));
    }

    const handleHoverMenuItem = (key: string, index: number, hover: boolean) => {
        const currentELRef = menuItemRef.current[index];
        const currentTextELRef = currentELRef?.childNodes[1] as HTMLElement | undefined;

        if (!currentELRef) return;

        if (hover) {
            setMenuItemHover(key);
        } else {
            setMenuItemHover("");
        }

        if (hover) {
            currentELRef.style.backgroundColor = "rgba(242, 93, 35, 0.17)"
            currentELRef.style.borderRightColor = "#F25D23"
            currentELRef.style.borderRightStyle = "solid"
            currentELRef.style.borderRightWidth = "5px"

            if (currentTextELRef) {
                currentTextELRef.style.color = "#F25D23"
            }
        } else {
            currentELRef.style.backgroundColor = "transparent"
            currentELRef.style.opacity = "1"

            if (!menuItemsActive[index]) {
                currentELRef.style.borderRightStyle = "none"

                if (currentTextELRef) {
                    currentTextELRef.style.color = "#FFFFFF"
                }
            }
        }
    }

    const switchMenuItemIcons = (key: string, index: number) => {
        switch (key) {
            case sidebarItemsConstants.home.key:
                return <HomeSVG fill={(menuItemHover === key || menuItemsActive[index]) ? "#F25D23" : "#FFFFFF"} height="20px" width="20px" />

            case sidebarItemsConstants.appointments.key:
                return <AppointmentsSVG fill={(menuItemHover === key || menuItemsActive[index]) ? "#F25D23" : "#FFFFFF"} height="20px" width="20px" />

            case sidebarItemsConstants.messages.key:
                return <MessagesSVG fill={(menuItemHover === key || menuItemsActive[index]) ? "#F25D23" : "#FFFFFF"} height="20px" width="20px" />

            case sidebarItemsConstants.contacts.key:
                return <ContactsSVG fill={(menuItemHover === key || menuItemsActive[index]) ? "#F25D23" : "#FFFFFF"} height="20px" width="20px" />

            case sidebarItemsConstants.dataAnalytics.key:
                return <DataAnalyticsSVG fill={(menuItemHover === key || menuItemsActive[index]) ? "#F25D23" : "#FFFFFF"} height="20px" width="20px" />

            case sidebarItemsConstants.subscription.key:
                return <SubscriptionSVG fill={(menuItemHover === key || menuItemsActive[index]) ? "#F25D23" : "#FFFFFF"} height="20px" width="20px" />

            case sidebarItemsConstants.helpCenter.key:
                return <HelpCenterSVG fill={(menuItemHover === key || menuItemsActive[index]) ? "#F25D23" : "#FFFFFF"} height="20px" width="20px" />

            case sidebarItemsConstants.settings.key:
                return <SettingsSVG fill={(menuItemHover === key || menuItemsActive[index]) ? "#F25D23" : "#FFFFFF"} height="20px" width="20px" />
        }
    }

    return (
        <div className="flex flex-col relative transition-all duration-500 ease-out"
             style={{ height: "100vh", width: `${ hideSidebar ? "120px": "240px"}`, paddingTop: '40px',
                      paddingBottom: '40px', rowGap: '40px', backgroundColor: "#1C1C1E" }}>
            <Box className="flex flex-row justify-center items-center"
                 style={{ columnGap: '10px', paddingLeft: '40px', paddingRight: '40px' }}>
                <Image src={headerImage} alt="Picture of the author"
                           style={{ height: '36px', width: '36px' }} />

                { !hideSidebar &&
                    <Text className="font-bold" fontSize="16px" color="#FF630B"
                          style={{ lineHeight: '19.2px', letterSpacing: '2%' }}>Lorem</Text>
                }

            </Box>
            <Separator className="text-neutral-500" orientation='horizontal'
                       style={{ borderStyle: 'solid' }} />
            <Box>
                { sidebarItemsConstants &&
                    Object.entries(sidebarItemsConstants).map(
                        (data, index) => {
                            return (
                                <div className={`flex flex-row items-center cursor-pointer p-4
                                                 transition-colors duration-200 ease-in-out`}
                                     ref={(ref: HTMLElement | null) => { if (ref) menuItemRef.current.push(ref) }}
                                     onMouseEnter={() => handleHoverMenuItem(data[0], index, true)}
                                     onMouseLeave={() => handleHoverMenuItem(data[0], index, false)}
                                     onClick={() => handleClickMenuItem(index)}
                                     style={{ paddingTop: '20px', paddingRight: '40px', paddingBottom: '20px',
                                              paddingLeft: '40px', columnGap: '12px',
                                              borderRight: `${menuItemsActive[index] ? '5px solid #F25D23' : 'none'}`
                                     }}>

                                    {switchMenuItemIcons(data[0], index)}

                                    { !hideSidebar &&
                                        <Text fontSize="14px"
                                              className="font-medium tracking-wide m-0 animate-fade"
                                              style={{ color: `${menuItemsActive[index] ? '#FF630B' : '#FFFFFF'}` }}
                                              key={index}>
                                                {data[1].label}
                                        </Text>
                                    }
                                </div>
                            );
                        })
                }
            </Box>
            <Separator className="mt-auto text-neutral-500" orientation='horizontal' style={{ borderStyle: 'solid' }} />
            {/* <Box className="flex flex-col justify-center items-center mt-auto gap-y-3" style={{ height: '46px' }}>
                <Image src={headerImage} alt="Picture of the author" style={{ height: "20px", width: "20px" }} />
                <Text className="font-bold text-zinc-700" fontSize="12px"
                      style={{ lineHeight: '19.2px', letterSpacing: '2%' }}>@ Lorem 2023</Text>
            </Box> */}
                <IconButton className="w-7 h-7 rounded-md cursor-pointer inset-y-1/2 transition-all duration-500 ease-out"
                            aria-label='Hide Sidebar'
                            onClick={() => setHideSidebar(!hideSidebar)}
                            style={{ position: 'absolute', left: `${hideSidebar ? '95px' : '195px'}`,
                                     backgroundColor: '#3F3F40', transitionProperty: 'all',
                                     transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
                                     transitionDuration: '500ms', zIndex: '1' }}
                >
                    <Icon icon={`${ hideSidebar ? 'fluent:chevron-double-right-20-filled' : 'fluent:chevron-double-left-20-filled'}`}
                                color="white" height="20" width="20" />
                </IconButton>
        </div> )
}

export default SideNavbar;
