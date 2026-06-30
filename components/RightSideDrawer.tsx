'use client'

import * as React from 'react';

import {
    Avatar, Box,
    Button,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerPositioner,
    DrawerRoot,
    IconButton,
    Input,
    MenuContent, MenuItem, MenuPositioner, MenuRoot,
    MenuTrigger,
    Stack,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import {Icon} from "@iconify/react";
import {veterinaryInfoConstants} from "./constants";


const RightSideDrawer = ( { openDrawer, setOpenDrawer, appointmentData }: { openDrawer: boolean; setOpenDrawer: (v: boolean) => void; appointmentData: any } ) => {
    const { open, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef<HTMLButtonElement>(null)

    const [currentVeterinary, setCurrentVeterinary] = React.useState({
        address: "",
        building: "",
        contact_number: "",
        veterinary_name: ""
    });

    React.useEffect(() => {
        const currentData = veterinaryInfoConstants.filter(data => data.veterinary_name === appointmentData.veterinaryName);

        if (currentData.length > 0) {
            setCurrentVeterinary(currentData[0])
        }
    }, [appointmentData]);

    // React.useEffect(() => {
    //     console.log("currentVeterinary:", currentVeterinary);
    // }, [currentVeterinary]);

    return (
        <>
            <DrawerRoot size="sm" open={open || openDrawer}
                onOpenChange={(details) => { if (!details.open) { onClose(); setOpenDrawer(false); } }}
                finalFocusEl={() => btnRef.current} >
                <DrawerBackdrop />
                <DrawerPositioner>
                    <DrawerContent>
                        <DrawerHeader className="flex flex-row items-center justify-start gap-x-6 border-b border-current
                                                 border-solid border-stone-300 py-10">
                        <Avatar.Root style={{ width: '90px', height: '90px' }}>
                            <Avatar.Fallback name={ appointmentData.ownerName } />
                        </Avatar.Root>
                            <Stack direction="column">border-stone-300
                                <Text className="m-0">{appointmentData.ownerName}</Text>
                                <Text fontSize="14px" className="text-gray-400 m-0">Client</Text>
                            </Stack>

                            <MenuRoot>
                                <MenuTrigger>
                                    <IconButton variant="plain" className="hover:bg-gray-400 ml-auto"
                                                aria-label="Options"
                                                css={{ borderRadius: 'full' }}
                                    >
                                        <Icon icon="mdi:dots-vertical" width="25" height="25"
                                                style={{color: '#434242'}} />
                                    </IconButton>
                                </MenuTrigger>
                                <MenuPositioner>
                                    <MenuContent>
                                        <MenuItem value="modify" className="flex flex-row gap-x-2"
                                                  style={{ color: '#484848' }} disabled>
                                            <Icon icon="el:file-edit" width="15" height="15"  style={{color: '#434242'}} />
                                            <Text fontSize="14px">Modify</Text>
                                        </MenuItem>
                                    </MenuContent>
                                </MenuPositioner>
                            </MenuRoot>
                        </DrawerHeader>
                        <DrawerBody style={{ padding: 0 }}>
                            <Box className="w-full h-auto flex flex-col gap-y-4 border-b border-current
                                            border-solid border-stone-300 px-8 py-6">
                                <Text style={{color: '#999999'}}>Contact Information</Text>
                                <Box className="grid grid-cols-6">
                                    <span className="flex flex-row gap-x-2 col-span-2">
                                        <Icon icon="ic:baseline-email" width="20" height="20"  style={{color: '#999999'}} />
                                        <Text style={{color: '#999999'}}>Email</Text>
                                    </span>
                                    <Text className="col-span-4">No Email</Text>
                                </Box>
                                <Box className="grid grid-cols-6">
                                    <span className="flex flex-row gap-x-2 col-span-2">
                                        <Icon icon="healthicons:phone" width="20" height="20" style={{color: '#999999'}} />
                                        <Text style={{color: '#999999'}}>Phone</Text>
                                    </span>
                                    <Text className="col-span-4">No Phone number</Text>
                                </Box>
                                <Box className="grid grid-cols-6">
                                    <span className="flex flex-row gap-x-2 col-span-2">
                                        <Icon icon="mdi:location" width="20" height="20" style={{color: '#999999'}} />
                                        <Text style={{color: '#999999'}}>Address</Text>
                                    </span>
                                    <Text className="col-span-4">No Address</Text>
                                </Box>
                            </Box>
                            <Box className="w-full h-auto flex flex-col gap-y-4 border-b border-current
                                            border-solid border-stone-300 p-8">
                                <Text style={{color: '#999999'}}>Clinic Details</Text>

                                <Box className="grid grid-cols-6">
                                <Avatar.Root style={{ width: '55px', height: '55px' }}>
                                    <Avatar.Fallback name={ currentVeterinary.building } />
                                </Avatar.Root>
                                    <span className="flex flex-col gap-x-4 col-span-4">
                                        <Text>{ appointmentData.veterinaryName }</Text>
                                        <Text fontSize="14px" className="text-gray-400 m-0">
                                            { currentVeterinary.address.split(",").slice(-1) }
                                        </Text>
                                    </span>
                                </Box>

                                <Box className="grid grid-cols-6">
                                    <span className="flex flex-row gap-x-2 col-span-2">
                                        <Icon icon="ic:baseline-email" width="20" height="20"  style={{color: '#999999'}} />
                                        <Text style={{color: '#999999'}}>Email</Text>
                                    </span>
                                    <Text className="col-span-4">No Email</Text>
                                </Box>
                                <Box className="grid grid-cols-6">
                                    <span className="flex flex-row gap-x-2 col-span-2">
                                        <Icon icon="healthicons:phone" width="20" height="20" style={{color: '#999999'}} />
                                        <Text style={{color: '#999999'}}>Phone</Text>
                                    </span>
                                    <Text className="col-span-4">{currentVeterinary.contact_number}</Text>
                                </Box>
                                <Box className="grid grid-cols-6">
                                    <span className="flex flex-row gap-x-2 col-span-2">
                                        <Icon icon="mdi:location" width="20" height="20" style={{color: '#999999'}} />
                                        <Text style={{color: '#999999'}}>Address</Text>
                                    </span>
                                    <Text className="col-span-4">{currentVeterinary.address}</Text>
                                </Box>
                            </Box>

                            <Box className="w-full h-auto flex flex-col gap-y-4 border-b border-current
                                            border-solid border-stone-300 p-8">
                                <Text style={{color: '#999999'}}>Pet Details</Text>

                                <Box className="grid grid-cols-6">
                                <Avatar.Root style={{ width: '55px', height: '55px' }}>
                                    <Avatar.Fallback name={ appointmentData.petName } />
                                </Avatar.Root>
                                    <span className="flex flex-col gap-x-4 col-span-4">
                                        <Text>{ appointmentData.petName }</Text>
                                        <Text fontSize="14px" className="text-gray-400 m-0">
                                            { appointmentData.petBreed }
                                        </Text>
                                    </span>
                                </Box>

                                <Box className="grid grid-cols-6">
                                    <span className="flex flex-row gap-x-2 col-span-2">
                                        <Icon icon="ic:baseline-email" width="20" height="20"  style={{color: '#999999'}} />
                                        <Text style={{color: '#999999'}}>Breed</Text>
                                    </span>
                                    <Text className="col-span-4">{appointmentData.petBreed}</Text>
                                </Box>
                                <Box className="grid grid-cols-6">
                                    <span className="flex flex-row gap-x-2 col-span-2">
                                        <Icon icon="healthicons:phone" width="20" height="20" style={{color: '#999999'}} />
                                        <Text style={{color: '#999999'}}>Sex</Text>
                                    </span>
                                    <Text className="col-span-4">{appointmentData.petGender}</Text>
                                </Box>
                                <Box className="grid grid-cols-6">
                                    <span className="flex flex-row gap-x-2 col-span-2">
                                        <Icon icon="mdi:location" width="20" height="20" style={{color: '#999999'}} />
                                        <Text style={{color: '#999999'}}>Age</Text>
                                    </span>
                                    <Text className="col-span-4">{appointmentData.petAge}</Text>
                                </Box>
                                <Box className="grid grid-cols-6">
                                    <span className="flex flex-row gap-x-2 col-span-2">
                                        <Icon icon="mdi:location" width="20" height="20" style={{color: '#999999'}} />
                                        <Text style={{color: '#999999'}}>Birthday</Text>
                                    </span>
                                    <Text className="col-span-4">Not Set</Text>
                                </Box>
                            </Box>
                        </DrawerBody>

                        <DrawerFooter>
                            <Button className="w-32 text-gray-50" variant='plain' style={{ backgroundColor: '#F25D23' }}
                                    onClick={() => setOpenDrawer(false)}>
                                Close
                            </Button>
                        </DrawerFooter>
                        <DrawerCloseTrigger />
                    </DrawerContent>
                </DrawerPositioner>
            </DrawerRoot>
        </>
    )
}

export default RightSideDrawer;
