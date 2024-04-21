const infomation = [
    {
        index: 0,
        name: [
            { name: "Distance", attribute: "distance" },
            { name: "Driver code", attribute: "driver_id" },
        ],
    },
    {
        index: 1,
        name: [
            { name: "Vehical code", attribute: "vehicle_id" },
            { name: "Intend time", attribute: "expected_time" },
        ],
    },
    {
        index: 2,
        name: [
            {
                name: "Departure date - End date",
                attribute: "date_of_departure",
            },
        ],
    },
    {
        index: 3,
        name: [
            { name: "From", attribute: "starting_point" },
            { name: "To", attribute: "destination" },
        ],
    },
    {
        index: 4,
        name: [
            { name: "Price", attribute: "price" },
            { name: "Routine", attribute: "pathway" },
        ],
    },
    // { index: 6, name: [{ name: "Note", attribute: "note" }] },
];

const options = [
    { value: "AVAILABLE", label: "AVAILABLE" },
    { value: "IN PROCESS", label: "IN PROCESS" },
    { value: "DONE", label: "DONE" },
];

const tripTemplate = {
    vehicle_id: null,
    driver_id: null,
    date_of_departure: null,
    date_of_arrival: null,
    starting_point: null,
    destination: null,
    pathway: null,
    distance: null,
    expected_time: null,
    price: null,
    status: "AVAILABLE",
    // note: null,
};

const ditanceSelect = [
    { value: " ditance leq 100km " },
    { value: " 100km < ditance leq 200km " },
    { value: " 200km < ditance leq 500km " },
    { value: " 500km < ditance leq 1000km " },
    { value: " 1000km < ditance " },
];

export { infomation, options, tripTemplate };
