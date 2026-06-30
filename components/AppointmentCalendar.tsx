'use client';

import * as React from 'react';

import Image from 'next/image';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import moment from 'moment';

import {
    Box, Button, IconButton,
    DialogBackdrop, DialogBody, DialogCloseTrigger, DialogContent, DialogHeader, DialogPositioner, DialogRoot,
    useDisclosure, Text,
    MenuContent, MenuItem, MenuPositioner, MenuRoot, MenuTrigger
} from "@chakra-ui/react";
import {ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';

import DatePicker from "react-datepicker";

import { Icon } from '@iconify/react';

import { setHours } from "date-fns/setHours";
import { setMinutes } from "date-fns/setMinutes";


import {
    dayTimeRangeConstants, dummyAppointmentData,
    veterinaryIconsConstants,
    veterinaryInfoConstants,
    veterinaryServices,
    APPOINTMENT_CARD_LEFT_OFFSET
} from './constants';

import noImage1 from '../assets/appointments/no_image.png';
import useGenerateRandomColor from "../hooks/useGenerateRandomColor";
import RightSideDrawer from "./RightSideDrawer";
import RescheduleModal from "./RescheduleModal";


export interface PetImage {
    fileObject: File | null;
    fileName: string;
    type: string;
    size: string;
}

export interface AppointmentData {
    id: number;
    veterinaryName: string;
    veterinaryServices: string;
    petName: string;
    petBreed: string;
    petAge: number;
    petGender: string;
    petImage: PetImage;
    ownerName: string;
    appointmentDate: string;
}

interface DisplayAppointmentData extends AppointmentData {
    top: string;
    backgroundColor: string;
    borderColor: string;
    iconIndex: number;
}

interface FormValues {
    veterinaryName: string;
    veterinaryServices: string;
    petName: string;
    petBreed: string;
    petAge: string;
    petGender: string;
    petImage: File | string;
    ownerName: string;
    appointmentDate: string;
}


const AppointmentCalendar = () => {
    const [currentDate, setCurrentDate] = React.useState(moment());
    const [currentMonth, setCurrentMonth] = React.useState(moment().format('MMMM'));

    const [uploadImageLink, setUploadImageLink] = React.useState<string | null>(null);
    const [uploadImageFile, setUploadImageFile] = React.useState<File | null>(null);

    const [startDate, setStartDate] = React.useState(
        setHours(setMinutes(new Date(), 0), 9),
    );

    const [listAppointmentData, setListAppointmentData] = React.useState<AppointmentData[]>([]);
    const [displayAppointmentData, setDisplayAppointmentData] = React.useState<DisplayAppointmentData[]>([]);

    const [appointmentData, setAppointmentData] = React.useState({
        id: -1,
        veterinaryName: "",
        veterinaryServices: "",
        petName: "",
        petBreed: "",
        petAge: 1,
        petGender: "",
        petImage: {
            fileObject: null as File | null,
            fileName: "",
            type: "",
            size: ""
        },
        ownerName: "",
        appointmentDate: ""
    });

    const [selectedAppointmentData, setSelectedAppointmentData] = React.useState<AppointmentData>({
        id: -1,
        veterinaryName: "",
        veterinaryServices: "",
        petName: "",
        petBreed: "",
        petAge: 1,
        petGender: "",
        petImage: {
            fileObject: null,
            fileName: "",
            type: "",
            size: ""
        },
        ownerName: "",
        appointmentDate: ""
    });

    const [openAppointmentInfo, setOpenAppointmentInfo] = React.useState(false);
    const [openReSchedDate, setOpenReSchedDate] = React.useState(false);
    const [triggerReSchedDate, setTriggerReSchedDate] = React.useState(false);

    const calendarDayTimeRef = React.useRef<HTMLElement[]>([]);
    const inputUploadFileRef = React.useRef<HTMLInputElement>(null);

    const { open, onOpen, onClose, setOpen } = useDisclosure();

    const { color, generateColor } = useGenerateRandomColor();

    const buildPetImage = (file: unknown): PetImage => ({
        fileObject: file instanceof File ? file : null,
        fileName: file instanceof File ? file.name : "",
        type: file instanceof File ? file.type : "",
        size: file instanceof File ? `${file.size} bytes` : ""
    });

    const filterPassedTime = (time: Date) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };

    const handleChangeDayClick = (addMonth: boolean) => {
        if (addMonth) {
            setCurrentDate(moment(currentDate).add(1, 'day'));
        } else {
            setCurrentDate(moment(currentDate).subtract(1, 'day'));
        }
    }

    const handleDeleteAppointmentClick = (appointmentID: number) => {
        setDisplayAppointmentData(prevState => prevState.filter(data => data.id !== appointmentID))
    }

    const handlePlacingAppointment = (dateTime: string) => {
        const timeHours = moment(dateTime).hour() > 12 ? moment(dateTime).hour() - 12 : moment(dateTime).hour()
        const timeMins = moment(dateTime).minute()
        const timeAMPM = moment(dateTime).format('a')

        const timeIndex = dayTimeRangeConstants.map((data, index) => {
            if (data === `${timeHours.toString()}:00 ${timeAMPM}`)
                return index
            return 0
        } ).filter((data) => data !== 0)

        const currentRef = (timeIndex.length > 0 ? calendarDayTimeRef.current[timeIndex[0]] :
            calendarDayTimeRef.current[0]);

        if (!currentRef) return '0px';

        const { offsetTop, offsetHeight } = currentRef

        let topPlacement = offsetTop - (offsetHeight * 2) - (offsetHeight / 2)

        if (timeMins > 0) {
            topPlacement = topPlacement + (offsetHeight / 2)
        }

        return `${topPlacement + 4}px`;
    }

    const handleReschedDateClick = (selectedData: AppointmentData) => {
        setSelectedAppointmentData(selectedData);
        setTriggerReSchedDate(true);
    }

    const handleUploadFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploadImageLink(URL.createObjectURL(e.target.files[0]));
            setUploadImageFile(e.target.files[0]);
        }
    }

    const handleUploadFileClicked = () => {
        inputUploadFileRef.current?.click();
    }

    const handleViewAppointmentClick = (selectedData: AppointmentData) => {
        setOpenAppointmentInfo(true);
        setSelectedAppointmentData(selectedData);
    }

    React.useEffect(() => {
        const modDummyData = dummyAppointmentData.map(data => ({
                ...data,
                top: handlePlacingAppointment(data.appointmentDate),
                backgroundColor: Math.random().toString(16).substr(-6).padStart(6, '0'),
                borderColor: Math.random().toString(16).substr(-6).padStart(6, '0'),
                iconIndex: Math.floor(Math.random() * veterinaryIconsConstants.length - 1) + 1
        }));

        if (displayAppointmentData.length === 0) {
            setDisplayAppointmentData(prevState => [
                ...prevState,
                ...modDummyData
            ]);
        }
    }, []);

    React.useEffect(() => {
        if (appointmentData.veterinaryName.length > 0) {
            setListAppointmentData(prevState => [...prevState, appointmentData]);
        }

    }, [appointmentData]);

    // Sync month label when day navigation changes the displayed month
    React.useEffect(() => {
        if (currentDate.format("MMMM") !== currentMonth) {
            setCurrentMonth(currentDate.format("MMMM"));
        }
    }, [currentDate]);

    // Sync displayed date when user picks a different month from the menu
    React.useEffect(() => {
        setCurrentDate(moment(currentDate).month(currentMonth));
    }, [currentMonth]);

    React.useEffect(() => {
        if (listAppointmentData.length > 0) {
            setDisplayAppointmentData(prevState =>
                [...prevState,
                    {
                        ...listAppointmentData[listAppointmentData.length - 1],
                        top: handlePlacingAppointment(listAppointmentData[listAppointmentData.length - 1].appointmentDate),
                        backgroundColor: Math.random().toString(16).substr(-6).padStart(6, '0'),
                        borderColor: Math.random().toString(16).substr(-6).padStart(6, '0'),
                        iconIndex: Math.floor(Math.random() * veterinaryIconsConstants.length-1) + 1
                    }]
            )
        }

    }, [listAppointmentData]);

    React.useEffect(() => {
        if (selectedAppointmentData.id !== -1 && triggerReSchedDate) {
            setOpenReSchedDate(true);
            setTriggerReSchedDate(false);

        }
    }, [selectedAppointmentData]);

    return (
        <Box className="!flex !flex-col !flex-1 !h-0 !bg-white">
            <Box className="!flex !flex-row !w-full !px-6 !py-5 !border-b !border-gray-200 !bg-white !shrink-0">
                <Box className="!flex !flex-col !gap-y-1.5 !w-full">
                    <Text className="!text-gray-500 !text-xs !font-semibold !uppercase !tracking-wider">Appointments</Text>
                    <div className="!flex !flex-row !items-center !gap-2">
                        <MenuRoot>
                            <MenuTrigger>
                                <Button variant="plain"
                                        className="!text-2xl !font-bold !text-gray-800 !hover:text-orange-600 !transition-colors !px-0">
                                    {currentMonth}
                                </Button>
                            </MenuTrigger>
                            <MenuPositioner>
                                <MenuContent>
                                    <MenuItem value="january" onSelect={() => {setCurrentMonth("January")}}>January</MenuItem>
                                    <MenuItem value="february" onSelect={() => {setCurrentMonth("February")}}>February</MenuItem>
                                    <MenuItem value="march" onSelect={() => {setCurrentMonth("March")}}>March</MenuItem>
                                    <MenuItem value="april" onSelect={() => {setCurrentMonth("April")}}>April</MenuItem>
                                    <MenuItem value="may" onSelect={() => {setCurrentMonth("May")}}>May</MenuItem>
                                    <MenuItem value="june" onSelect={() => {setCurrentMonth("June")}}>June</MenuItem>
                                    <MenuItem value="july" onSelect={() => {setCurrentMonth("July")}}>July</MenuItem>
                                    <MenuItem value="august" onSelect={() => {setCurrentMonth("August")}}>August</MenuItem>
                                    <MenuItem value="september" onSelect={() => {setCurrentMonth("September")}}>September</MenuItem>
                                    <MenuItem value="october" onSelect={() => {setCurrentMonth("October")}}>October</MenuItem>
                                    <MenuItem value="november" onSelect={() => {setCurrentMonth("November")}}>November</MenuItem>
                                    <MenuItem value="december" onSelect={() => {setCurrentMonth("December")}}>December</MenuItem>
                                </MenuContent>
                            </MenuPositioner>
                        </MenuRoot>

                        <IconButton
                            css={{ borderRadius: 'full' }}
                            variant='solid'
                            aria-label='Previous day'
                            fontSize='16px'
                            className="!bg-gray-100 !text-gray-600 !hover:bg-gray-200 !transition-colors"
                            onClick={() => {handleChangeDayClick(false)}}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                        <IconButton
                            css={{ borderRadius: 'full' }}
                            variant='solid'
                            aria-label='Next day'
                            fontSize='16px'
                            className="!bg-gray-100 !text-gray-600 !hover:bg-gray-200 !transition-colors"
                            onClick={() => {handleChangeDayClick(true)}}
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    </div>
                    <div className="!text-sm !text-gray-500">{
                        currentDate.format(
                            `[${ (currentDate.format('MMMM D YYYY') === moment().format('MMMM D YYYY')) ? 
                                'Today' : 'Day' } is] dddd, MMMM D YYYY`)
                    }</div>
                </Box>
                <Button variant="plain" onClick={onOpen}
                        className="!bg-orange-600 !hover:bg-orange-700 !text-white !font-medium !px-5 !py-2 !rounded-lg !shadow-sm !hover:shadow-md !transition-all !h-fit">
                    + New Appointment
                </Button>
            </Box>
            <Box className="!flex !flex-col !flex-1 !w-full !relative !overflow-y-auto !bg-gray-50 !min-h-0">
                { dayTimeRangeConstants && dayTimeRangeConstants.map((data, index) => {
                    return (
                        <Box className="!px-12 !border-b !border-gray-200 !grid !grid-cols-12 !hover:bg-gray-100 !transition-colors" key={index}
                             ref={(ref: HTMLElement | null) => { if (ref) calendarDayTimeRef.current.push(ref) }}>
                            <div className="!py-7 !border-r !border-gray-200 !text-xs !font-medium !text-gray-400 !pr-3 !text-right">{data}</div>
                            <Box className="!col-span-11 !w-full !h-full">
                            </Box>
                        </Box>
                    )
                })}

                { displayAppointmentData && displayAppointmentData.length &&
                    displayAppointmentData.map((data, index) => {
                        if (moment(data.appointmentDate).format('MMMM D YYYY') === moment(currentDate).format('MMMM D YYYY'))
                            return (
                                <Box key={index} className="!absolute !rounded-xl !p-3 !flex !flex-row
                                                             !justify-start !items-start !gap-3 !shadow-md !hover:shadow-lg !transition-shadow !w-[85%] !h-[90px]"
                                    style={{ top: data.top,
                                             left: APPOINTMENT_CARD_LEFT_OFFSET,
                                             backgroundColor: `#${data.backgroundColor}` }}>
                                    <div className="!mt-0.5">
                                        <Icon icon={veterinaryIconsConstants[data.iconIndex]}
                                              width="22" height="22" className="!text-gray-600" />
                                    </div>
                                    <div className="!flex !flex-col !gap-0.5 !flex-1 !min-w-0">
                                        <div className="!font-semibold !text-sm !text-gray-800 !truncate">{data.veterinaryServices}</div>
                                        <div className="!text-xs !text-gray-500">{moment(data.appointmentDate).format("h:mm a")} - {moment(data.appointmentDate).add(1, 'hours').format("h:mm a")}</div>
                                        <div className="!flex !flex-row !items-center !gap-1.5 !mt-0.5">
                                            <Icon icon="carbon:user-avatar" width="16" height="16" className="!text-gray-400" />
                                            <div className="!text-xs !text-gray-500 !truncate">{data.ownerName}</div>
                                        </div>
                                    </div>
                                    <MenuRoot>
                                        <MenuTrigger>
                                            <IconButton variant="plain"
                                                        aria-label="Options"
                                                        css={{ borderRadius: 'full' }}
                                                        className="!text-gray-500 !hover:text-gray-700 !hover:bg-black/10 !mb-auto !-mt-1 !-mr-1"
                                            >
                                                <Icon icon="mdi:dots-vertical" width="20" height="20" />
                                            </IconButton>
                                        </MenuTrigger>
                                        <MenuPositioner>
                                            <MenuContent>
                                                <MenuItem value="view" className="!flex !flex-row !gap-2 !text-gray-600"
                                                          onSelect={() => handleViewAppointmentClick(data)}>
                                                    <Icon icon="system-uicons:flip-view" width="20" height="20" />
                                                    <span>View</span>
                                                </MenuItem>
                                                <MenuItem value="reschedule" className="!flex !flex-row !gap-2 !text-gray-600"
                                                          onSelect={() => handleReschedDateClick(data)} disabled>
                                                    <Icon icon="healthicons:i-schedule-school-date-time" width="20" height="20" />
                                                    <span>Reschedule</span>
                                                </MenuItem>
                                                <MenuItem value="delete" className="!flex !flex-row !gap-2 !text-red-500"
                                                          onSelect={ () => handleDeleteAppointmentClick(data.id) }>
                                                    <Icon icon="fluent:delete-48-regular" width="20" height="20" />
                                                    <span>Delete</span>
                                                </MenuItem>
                                            </MenuContent>
                                        </MenuPositioner>
                                    </MenuRoot>
                                </Box>
                                )
                        else <></>
                })}
            </Box>
            <RescheduleModal openModal={openReSchedDate}
                             setOpenModal={setOpenReSchedDate}
                             appointmentDate={selectedAppointmentData}
                             setAppointmentDate={setSelectedAppointmentData} />
            <RightSideDrawer openDrawer={openAppointmentInfo} setOpenDrawer={setOpenAppointmentInfo}
                             appointmentData={selectedAppointmentData} />
            <DialogRoot open={open} onOpenChange={(details) => setOpen(details.open)} size='xl'>
                <DialogBackdrop />
                <DialogPositioner>
                    <DialogContent>
                        <DialogHeader>
                            <div className="!text-xl !font-bold !text-gray-800">Set An Appointment</div>
                        </DialogHeader>
                        <DialogBody className="!flex !flex-col !gap-6 !w-full">
                            <Formik<FormValues> initialValues={{ veterinaryName: '', veterinaryServices: '', petName: '', petBreed: '',
                                petAge: '', petGender: '', petImage: '', ownerName: '', appointmentDate: ''}}
                                    validate={(values: FormValues) => {
                                        const errors: Partial<Record<keyof FormValues, string>> = {};

                                        if (!values.veterinaryName) {
                                            errors.veterinaryName = 'Please select a veterinary';
                                        }

                                        if (!values.veterinaryServices) {
                                            errors.veterinaryServices = 'Please select a service';
                                        }

                                        if (!values.petName) {
                                            errors.petName = 'Please enter your pet\'s name';
                                        }

                                        if (!values.petBreed) {
                                            errors.petBreed = 'Please enter your pet\'s breed';
                                        }

                                        if (!values.petAge) {
                                            errors.petAge = 'Please enter your pet\'s age';
                                        }

                                        if (!values.petGender) {
                                            errors.petGender = 'Please select your pet\'s gender';
                                        }

                                        if (!values.ownerName) {
                                            errors.ownerName = 'Please enter the owner\'s name';
                                        }

                                        if (!values.appointmentDate) {
                                            errors.appointmentDate = 'Please select an appointment date';
                                        }

                                        return errors;
                                    }}

                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(() => {
                                            setAppointmentData({
                                                id: listAppointmentData.length,
                                                veterinaryName: values.veterinaryName,
                                                veterinaryServices: values.veterinaryServices,
                                                petName: values.petName,
                                                petBreed: values.petBreed,
                                                petAge: parseInt(values.petAge) || 1,
                                                petGender: values.petGender,
                                                petImage: buildPetImage(values.petImage),
                                                ownerName: values.ownerName,
                                                appointmentDate: values.appointmentDate
                                            })

                                            setSubmitting(false);
                                            onClose();
                                            }, 400);
                                    }}>
                                {({ isSubmitting, setFieldValue }) => (
                                    <Form className="!flex !flex-col !gap-6 !w-full">
                                        <div className="!relative">
                                            <div className="!absolute !inset-0 !flex !items-center">
                                                <div className="!w-full !border-t !border-gray-200"></div>
                                            </div>
                                            <div className="!relative !flex !justify-center">
                                                <span className="!bg-white !px-3 !text-sm !font-semibold !text-gray-500 !uppercase !tracking-wider">Veterinary Information</span>
                                            </div>
                                        </div>

                                        <div className="!grid !grid-cols-[140px_1fr] !gap-4 !items-start !w-full">
                                            <label className="!text-sm !font-medium !text-gray-600 !pt-2.5">Veterinary</label>
                                            <div className="!flex !flex-col !gap-1">
                                                <Field as="select" name="veterinaryName"
                                                       className="!w-full !border !border-gray-300 !rounded-lg !px-3 !py-2.5 !text-sm !bg-white !focus:ring-2 !focus:ring-orange-500 !focus:border-orange-500 !outline-none !transition-shadow">
                                                    <option value="">Please Select</option>
                                                    { veterinaryInfoConstants &&
                                                        veterinaryInfoConstants.map((data, index) => {
                                                            return(
                                                                <option key={index} value={data.veterinary_name}>
                                                                    {data.veterinary_name}
                                                                </option>)
                                                        })
                                                    }
                                                </Field>
                                                <ErrorMessage name="veterinaryName" component="div" className="!text-xs !text-red-500" />
                                            </div>
                                        </div>

                                        <div className="!grid !grid-cols-[140px_1fr] !gap-4 !items-start !w-full">
                                            <label className="!text-sm !font-medium !text-gray-600 !pt-2.5">Services</label>
                                            <div className="!flex !flex-col !gap-1">
                                                <Field as="select" name="veterinaryServices"
                                                       className="!w-full !border !border-gray-300 !rounded-lg !px-3 !py-2.5 !text-sm !bg-white !focus:ring-2 !focus:ring-orange-500 !focus:border-orange-500 !outline-none !transition-shadow">
                                                    <option value="">Please Select</option>
                                                    { veterinaryServices &&
                                                        veterinaryServices.map((data, index) => {
                                                            return(
                                                                <option key={index} value={data}>
                                                                    {data}
                                                                </option>)
                                                            })}
                                                </Field>
                                                <ErrorMessage name="veterinaryServices" component="div" className="!text-xs !text-red-500" />
                                            </div>
                                        </div>

                                        <div className="!relative">
                                            <div className="!absolute !inset-0 !flex !items-center">
                                                <div className="!w-full !border-t !border-gray-200"></div>
                                            </div>
                                            <div className="!relative !flex !justify-center">
                                                <span className="!bg-white !px-3 !text-sm !font-semibold !text-gray-500 !uppercase !tracking-wider">Pet Information</span>
                                            </div>
                                        </div>

                                        <div className="!grid !grid-cols-[140px_1fr] !gap-4 !items-start !w-full">
                                            <label className="!text-sm !font-medium !text-gray-600 !pt-2.5">Name</label>
                                            <div className="!flex !flex-col !gap-1">
                                                <Field type="text" name="petName" placeholder="Enter pet name"
                                                       className="!w-full !border !border-gray-300 !rounded-lg !px-3 !py-2.5 !text-sm !bg-white !focus:ring-2 !focus:ring-orange-500 !focus:border-orange-500 !outline-none !transition-shadow !placeholder:text-gray-400" />
                                                <ErrorMessage name="petName" component="div" className="!text-xs !text-red-500" />
                                            </div>
                                        </div>

                                        <div className="!grid !grid-cols-[140px_1fr] !gap-4 !items-start !w-full">
                                            <label className="!text-sm !font-medium !text-gray-600 !pt-2.5">Breed</label>
                                            <div className="!flex !flex-col !gap-1">
                                                <Field type="text" name="petBreed" placeholder="Enter breed"
                                                       className="!w-full !border !border-gray-300 !rounded-lg !px-3 !py-2.5 !text-sm !bg-white !focus:ring-2 !focus:ring-orange-500 !focus:border-orange-500 !outline-none !transition-shadow !placeholder:text-gray-400" />
                                                <ErrorMessage name="petBreed" component="div" className="!text-xs !text-red-500" />
                                            </div>
                                        </div>

                                        <div className="!grid !grid-cols-[140px_1fr] !gap-4 !items-start !w-full">
                                            <label className="!text-sm !font-medium !text-gray-600 !pt-2.5">Age (months)</label>
                                            <div className="!flex !flex-col !gap-1 !max-w-[120px]">
                                                <Field type="number" name="petAge" placeholder="Age"
                                                       className="!w-full !border !border-gray-300 !rounded-lg !px-3 !py-2.5 !text-sm !bg-white !focus:ring-2 !focus:ring-orange-500 !focus:border-orange-500 !outline-none !transition-shadow !placeholder:text-gray-400" />
                                                <ErrorMessage name="petAge" component="div" className="!text-xs !text-red-500" />
                                            </div>
                                        </div>

                                        <div className="!grid !grid-cols-[140px_1fr] !gap-4 !items-start !w-full">
                                            <label className="!text-sm !font-medium !text-gray-600 !pt-2.5">Gender</label>
                                            <div className="!flex !flex-col !gap-1">
                                                <Field as="select" name="petGender"
                                                       className="!w-full !border !border-gray-300 !rounded-lg !px-3 !py-2.5 !text-sm !bg-white !focus:ring-2 !focus:ring-orange-500 !focus:border-orange-500 !outline-none !transition-shadow !max-w-[160px]">
                                                    <option value="">Please Select</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </Field>
                                                <ErrorMessage name="petGender" component="div" className="!text-xs !text-red-500" />
                                            </div>
                                        </div>

                                        <div className="!grid !grid-cols-[140px_1fr] !gap-4 !items-start !w-full">
                                            <label className="!text-sm !font-medium !text-gray-600 !pt-2.5">Image</label>
                                            <div className="!flex !flex-col !gap-3">
                                                <div className="!flex !items-center !gap-4">
                                                    { uploadImageLink ?
                                                        <Image src={uploadImageLink} alt="Uploaded pet image" width={80} height={80}
                                                               className="!w-20 !h-20 !rounded-xl !object-cover !border !border-gray-200"
                                                        /> :
                                                        <Image src={noImage1} alt="No image uploaded" width={80} height={80}
                                                               className="!w-20 !h-20 !rounded-xl !object-cover !border !border-gray-200 !opacity-60"
                                                        />
                                                    }
                                                    <input type="file" className="!hidden" name="petImage" ref={inputUploadFileRef}
                                                           onChange={(e) =>{
                                                               if (e.target.files) {
                                                                   setFieldValue("petImage", e.target.files[0]);
                                                               }
                                                               handleUploadFileChange(e)}} />
                                                    <button type="button"
                                                            className="!px-4 !py-2 !text-sm !font-medium !text-orange-600 !bg-orange-50 !border !border-orange-200 !rounded-lg !hover:bg-orange-100 !transition-colors !cursor-pointer"
                                                            onClick={() => handleUploadFileClicked()}>
                                                        Upload Photo
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="!relative">
                                            <div className="!absolute !inset-0 !flex !items-center">
                                                <div className="!w-full !border-t !border-gray-200"></div>
                                            </div>
                                            <div className="!relative !flex !justify-center">
                                                <span className="!bg-white !px-3 !text-sm !font-semibold !text-gray-500 !uppercase !tracking-wider">Owner Information</span>
                                            </div>
                                        </div>

                                        <div className="!grid !grid-cols-[140px_1fr] !gap-4 !items-start !w-full">
                                            <label className="!text-sm !font-medium !text-gray-600 !pt-2.5">Name</label>
                                            <div className="!flex !flex-col !gap-1">
                                                <Field type="text" name="ownerName" placeholder="Enter owner name"
                                                       className="!w-full !border !border-gray-300 !rounded-lg !px-3 !py-2.5 !text-sm !bg-white !focus:ring-2 !focus:ring-orange-500 !focus:border-orange-500 !outline-none !transition-shadow !placeholder:text-gray-400" />
                                                <ErrorMessage name="ownerName" component="div" className="!text-xs !text-red-500" />
                                            </div>
                                        </div>

                                        <div className="!grid !grid-cols-[140px_1fr] !gap-4 !items-start !w-full">
                                            <label className="!text-sm !font-medium !text-gray-600 !pt-2.5">Appointment</label>
                                            <div className="!flex !flex-col !gap-1">
                                                <DatePicker
                                                    className="!w-full !border !border-gray-300 !rounded-lg !px-3 !py-2.5 !text-sm !bg-white !focus:ring-2 !focus:ring-orange-500 !focus:border-orange-500 !outline-none !transition-shadow"
                                                    selected={startDate}
                                                    name="appointmentDate"
                                                    onChange={(date: Date | null) => {
                                                        if (date) {
                                                            setStartDate(date);
                                                            setFieldValue("appointmentDate", moment(date).format("MMMM D YYYY, h:mm:ss a"));
                                                        }
                                                    }}
                                                    showTimeSelect
                                                    filterTime={filterPassedTime}
                                                    dateFormat="MMMM d, yyyy h:mm aa"
                                                    placeholderText="Select date and time"
                                                />
                                                <ErrorMessage name="appointmentDate" component="div" className="!text-xs !text-red-500" />
                                            </div>
                                        </div>

                                        <div className="!flex !justify-end !items-center !gap-3 !pt-4 !border-t !border-gray-200">
                                            <Button variant="plain" onClick={onClose}
                                                    className="!px-5 !py-2.5 !text-sm !font-medium !text-gray-600 !bg-gray-100 !hover:bg-gray-200 !rounded-lg !transition-colors">
                                                Cancel
                                            </Button>
                                            <Button type="submit" disabled={isSubmitting} variant="plain"
                                                    className="!px-5 !py-2.5 !text-sm !font-medium !text-white !bg-orange-600 !hover:bg-orange-700 !rounded-lg !shadow-sm !hover:shadow-md !transition-all !disabled:opacity-50 !disabled:cursor-not-allowed">
                                                {isSubmitting ? 'Saving...' : 'Confirm'}
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </DialogBody>
                        <DialogCloseTrigger />
                    </DialogContent>
                </DialogPositioner>
            </DialogRoot>
        </Box>
    )
}

export default AppointmentCalendar;
