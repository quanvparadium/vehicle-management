const infomation = [
    { index: 1, name: [{ name: "Trip code", attribute: "_id" }] },
    {
        index: 2,
        name: [
            { name: "Vehical code", attribute: "vehicle_id" },
            { name: "Driver code", attribute: "driver_id" },
        ],
    },
    {
        index: 3,
        name: [
            { name: "Departure date", attribute: "date_of_departure" },
            { name: "End date", attribute: "date_of_arrival" },
        ],
    },
    {
        index: 4,
        name: [
            { name: "From", attribute: "starting_point" },
            { name: "To", attribute: "destination" },
        ],
    },
    { index: 5, name: [{ name: "Routine", attribute: "pathway" }] },
    {
        index: 6,
        name: [
            { name: "Distance", attribute: "distance" },
            { name: "Intend time", attribute: "expected_time" },
        ],
    },
    {
        index: 7,
        name: [
            { name: "Price", attribute: "price" },
            { name: "Status", attribute: "status" },
        ],
    },
    { index: 8, name: [{ name: "Note", attribute: "note" }] },
];

const options = [
    { value: "AVAILABLE", label: "AVAILABLE" },
    { value: "IN PROCESS", label: "IN PROCESS" },
    { value: "DONE", label: "DONE" },
];

const tripTemplate = {
    vehicle_id: null,
    driver_id: null,
    date_of_departure: new Date(),
    date_of_arrival: new Date(),
    starting_point: null,
    destination: null,
    pathway: null,
    distance: null,
    expected_time: null,
    price: null,
    status: null,
    note: null,
};

export { infomation, options, tripTemplate };
