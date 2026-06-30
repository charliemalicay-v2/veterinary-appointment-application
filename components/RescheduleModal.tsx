'use client'

import * as React from 'react';

import { Button, useDisclosure,
    DialogBackdrop, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogPositioner, DialogRoot
} from '@chakra-ui/react'
import moment from "moment";
import DatePicker from "react-datepicker";

import { setHours } from "date-fns/setHours";
import { setMinutes } from "date-fns/setMinutes";


const RescheduleModal = ({ openModal, setOpenModal, appointmentDate, setAppointmentDate }: { openModal: boolean; setOpenModal: (v: boolean) => void; appointmentDate: any; setAppointmentDate: (v: any) => void }) => {
    const { open, onOpen, onClose } = useDisclosure();

    const [startDate, setStartDate] = React.useState(
        setHours(setMinutes(moment().toDate(), 0), 9),
    );

    const filterPassedTime = (time: Date) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };

    React.useEffect(() => {
        console.log("startDate:", startDate);
        console.log("appointmentDate:", appointmentDate);
    }, [startDate]);

    return (
        <>
            {/*<Button onClick={onOpen}>Open Modal</Button>*/}

            <DialogRoot open={openModal} onOpenChange={(details) => { if (!details.open) setOpenModal(false) }}>
                <DialogBackdrop />
                <DialogPositioner>
                    <DialogContent>
                        <DialogHeader>Change Appointment Date</DialogHeader>
                        <DialogBody>
                            <DatePicker
                                className="col-span-2 bg-gray-200 p-2 rounded-lg h-14"
                                selected={startDate}
                                name="appointmentDate"
                            onChange={(date: Date | null) => {
                                if (date) setStartDate(date);
                            }}
                                showTimeSelect
                                filterTime={filterPassedTime}
                                dateFormat="MMMM d, yyyy h:mm aa"
                            />
                        </DialogBody>

                        <DialogFooter>
                            <Button colorScheme='blue' mr={3} onClick={() => setOpenModal(false)}>
                                Cancel
                            </Button>
                            <Button variant='outline'>Confirm</Button>
                        </DialogFooter>
                        <DialogCloseTrigger />
                    </DialogContent>
                </DialogPositioner>
            </DialogRoot>
        </>
    )
}

export default RescheduleModal;
