const dayTimeRangeConstants = [
     "5:00 am",
     "6:00 am",
     "7:00 am",
     "8:00 am",
     "9:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 pm",
     "1:00 pm",
     "2:00 pm",
     "3:00 pm",
     "4:00 pm",
     "5:00 pm",
     "6:00 pm",
     "7:00 pm",
     "8:00 pm",
     "9:00 pm",
    "10:00 pm",
    "11:00 pm",
    "12:00 am",
     "1:00 am",
     "2:00 am",
     "3:00 am",
     "4:00 am"
]


const dummyAppointmentData = [
    {
        id: 0,
        veterinaryName: "Anika Perry",
        veterinaryServices: "Diagnostic and Therapeutic Services",
        petName: "Archie",
        petBreed: "German Shepherd",
        petAge: 12,
        petGender: "Male",
        petImage: {
            fileObject: null,
            fileName: "",
            type: "",
            size: ""
        },
        ownerName: "John Doe",
        appointmentDate: "March 19 2024, 8:00:00 am"
    },
    {
        id: 1,
        veterinaryName: "Danica Jane",
        veterinaryServices: "Anesthesia",
        petName: "Charlie",
        petBreed: "Bulldog",
        petAge: 4,
        petGender: "Female",
        petImage: {
            fileObject: null,
            fileName: "",
            type: "",
            size: ""
        },
        ownerName: "Emily Johnson",
        appointmentDate: "March 19 2024, 10:30:00 am"
    },
    {
        id: 2,
        veterinaryName: "John Fins",
        veterinaryServices: "Radiology Services",
        petName: "Max",
        petBreed: "Labrador Retriever",
        petAge: 7,
        petGender: "Male",
        petImage: {
            fileObject: null,
            fileName: "",
            type: "",
            size: ""
        },
        ownerName: "Michael Brown",
        appointmentDate: "March 20 2024, 05:30:00 am"
    },
    {
        id: 3,
        veterinaryName: "Anika Perry",
        veterinaryServices: "Electrocardiography Services",
        petName: "Oscar",
        petBreed: "Poodle",
        petAge: 9,
        petGender: "Male",
        petImage: {
            fileObject: null,
            fileName: "",
            type: "",
            size: ""
        },
        ownerName: "Sarah Davis",
        appointmentDate: "March 21 2024, 12:30:00 pm"
    },
    {
        id: 4,
        veterinaryName: "Danica Jane",
        veterinaryServices: "Dentistry",
        petName: "Milo",
        petBreed: "Beagle",
        petAge: 3,
        petGender: "Male",
        petImage: {
            fileObject: null,
            fileName: "",
            type: "",
            size: ""
        },
        ownerName: "Jessica Moore",
        appointmentDate: "March 21 2024, 2:30:00 pm"
    }
]


const sidebarItemsConstants = {
    home: {
        label: "Home",
        key: "home"
    },
    appointments: {
        label: "Appointments",
        key: "appointments"
    },
    messages: {
        label: "Messages",
        key: "messages"
    },
    contacts: {
        label: "Contacts",
        key: "contacts"
    },
    dataAnalytics: {
        label: "Data Analytics",
        key: "dataAnalytics"
    },
    subscription: {
        label: "Subscription",
        key: "subscription"
    },
    helpCenter: {
        label: "Help Center",
        key: "helpCenter"
    },
    settings: {
        label: "Settings",
        key: "settings"
    }
}

const veterinaryIconsConstants = [
    "map:veterinary-care", "healthicons:medical-advice", "streamline:medical-bag", "fa6-solid:laptop-medical",
    "fa6-solid:house-medical-circle-exclamation", "material-symbols:medical-information-outline-rounded"
]

const veterinaryInfoConstants = [
    {
        "veterinary_name": "Anika Perry",
        "address": "4517 Washington Avenue, Manchester, Kentucky 39495",
        "building": "Green Bow Vett",
        "contact_number": "+63 0123 123"
    },
    {
        "veterinary_name": "Danica Jane",
        "address": "4517 Washington Avenue, Manchester, Kentucky 39495",
        "building": "Green Bow Vett",
        "contact_number": "+63 0123 123"
    },
    {
        "veterinary_name": "John Fins",
        "address": "4517 Washington Avenue, Manchester, Kentucky 39495",
        "building": "Green Bow Vett",
        "contact_number": "+63 0123 123"
    }
]

const veterinaryServices = [
    "Diagnostic and Therapeutic Services",
    "Anesthesia",
    "Radiology Services",
    "Electrocardiography Services",
    "Dentistry",
    "Laboratory",
    "Permanent identification",
    "Pharmacy",
    "Individualized Flea Control Programs",
    "Dietary Counseling",
    "Behavioral Counseling",
    "Boarding",
    "Bathing and Grooming",
    "Emergency Care"
]

const APPOINTMENT_CARD_LEFT_OFFSET = '220px';

export {
    dayTimeRangeConstants,
    dummyAppointmentData,
    sidebarItemsConstants,
    veterinaryIconsConstants,
    veterinaryInfoConstants,
    veterinaryServices,
    APPOINTMENT_CARD_LEFT_OFFSET
}
