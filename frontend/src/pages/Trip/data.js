const infomation = [
    { index: 1, name: ["Trip code"] },
    { index: 2, name: ["Vehical code", "Driver code"] },
    { index: 3, name: ["Departure date", "End date"] },
    { index: 4, name: ["From", "To"] },
    { index: 5, name: ["Routine"] },
    {
        index: 6,
        name: ["Distance", "Intend time"],
    },
    {
        index: 7,
        name: ["Price", "Status"],
    },
    { index: 8, name: ["Note"] },
];

const options = [
    { value: "AVAILABLE", label: "AVAILABLE" },
    { value: "IN PROCESS", label: "IN PROCESS" },
    { value: "DONE", label: "DONE" },
];

const tripTemplate = {
    vehicle_id: "",
    driver_id: "",
    date_of_departure: new Date(),
    date_of_arrival: new Date(),
    starting_point: "",
    destination: "",
    pathway: "",
    distance: null,
    expected_time: null,
    price: 0,
    status: "",
    note: "",
};

export { infomation, options, tripTemplate };
