'use client';

import * as React from 'react';
import Image from 'next/image';

import { Icon } from '@iconify/react'

import { Avatar, Box, Button, IconButton, Input, InputGroup, MenuRoot, MenuTrigger, MenuContent, MenuItem, MenuPositioner } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons';

import SearchBarIcon from '../assets/headerSearchBar/ic_search-lg.svg';


const HeaderSearchBar = () => {
    const notificationELRef = React.useRef<HTMLButtonElement>(null);
    const settingsELRef = React.useRef<HTMLButtonElement>(null);
    const signOutELRef = React.useRef<HTMLButtonElement>(null);

    const handleMouseHover = (key: string, hover: boolean) => {
        let currentEL = null;

        switch (key) {
            case 'notification':
                currentEL = notificationELRef;
                break;

            case 'settings':
                currentEL = settingsELRef;
                break;

            case 'signout':
                currentEL = signOutELRef;
                break;
        }

        if (hover && currentEL?.current) {
            currentEL.current.style.backgroundColor = "#FF630B"
            currentEL.current.style.color = "#FFFFFF"
        } else if (currentEL?.current) {
            currentEL.current.style.backgroundColor = "#E2E8F0"
            currentEL.current.style.color = "#1A202C"
        }
    }

    return (
        <Box className="flex flex-row justify-between !p-4 items-center gap-x-2">
            <InputGroup
                endElement={<Image src={SearchBarIcon} alt="Picture of the author"
                                   style={{ height: '20px', width: '20px' }} />}
            >
                <Input placeholder='Search' style={{ borderRadius: '15px' }} />
            </InputGroup>
            <Box className="flex flex-row justify-between items-center gap-x-2">
                <Avatar.Root size='md'>
                    <Avatar.Fallback name='Jane Dee' />
                    <Avatar.Image src='https://resources.fina.org/photo-resources/2021/01/27/2636c56c-3395-40be-94b6-c4b74dc3f2c3/c24f982e-d4df-4834-b4fd-e7833c57bc5f?width=350' />
                </Avatar.Root>
                <MenuRoot>
                    <MenuTrigger>
                        <Button variant="plain">
                            {`Jane Dee`}
                            <ChevronDownIcon />
                        </Button>
                    </MenuTrigger>
                    <MenuPositioner>
                        <MenuContent>
                            <MenuItem value="option1">User Option 1</MenuItem>
                            <MenuItem value="option2">User Option 2</MenuItem>
                            <MenuItem value="option3">User Option 3</MenuItem>
                        </MenuContent>
                    </MenuPositioner>
                </MenuRoot>
                <IconButton
                    colorScheme='gray'
                    ref={notificationELRef}
                    onMouseEnter={() => handleMouseHover('notification', true)}
                    onMouseLeave={() => handleMouseHover('notification', false)}
                    className="transition ease-in-out delay-150 duration-300 bg-[#E2E8F0]"
                    css={{ borderRadius: 'full' }}
                    variant="solid"
                    aria-label='Notification'
                    fontSize='36px'
                >
                    <Icon icon="lucide:bell" width="20" height="20" />
                </IconButton>
                <IconButton
                    ref={settingsELRef}
                    onMouseEnter={() => handleMouseHover('settings', true)}
                    onMouseLeave={() => handleMouseHover('settings', false)}
                    className="transition ease-in-out delay-150 duration-300 bg-[#E2E8F0]"
                    css={{ borderRadius: 'full' }}
                    variant="solid"
                    aria-label='settings'
                    fontSize='36px'
                >
                    <Icon icon="mingcute:settings-5-line" width="20" height="20" />
                </IconButton>

                <IconButton
                    ref={signOutELRef}
                    onMouseEnter={() => handleMouseHover('signout', true)}
                    onMouseLeave={() => handleMouseHover('signout', false)}
                    className="transition ease-in-out delay-150 duration-300 bg-[#E2E8F0]"
                    css={{ borderRadius: 'full' }}
                    variant="solid"
                    aria-label='signout'
                    fontSize='36px'
                >
                    <Icon icon="uit:signout" width="25" height="25"  style={{color: '#434242'}} />
                </IconButton>
            </Box>
        </Box>
    );
}

export default HeaderSearchBar;
