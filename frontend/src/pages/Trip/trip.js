import { useState, useEffect } from "react";
import "rsuite/DateRangePicker/styles/index.css";
import DateRangePicker from "rsuite/DateRangePicker";
import swal from "sweetalert";

import Sel from "./Sel";
import Selectt from "./Selectt";
import TripAPi from "../../api/tripApi";
import driverApi from "../../api/driverApi";
import TripApi from "../../api/tripApi";
import "./trip.css";
import { infomation, options, tripTemplate, province } from "./data";
import { ReactComponent as DistanceIcon } from "../../assets/DistanceIcon.svg";
import { ReactComponent as TimeIcon } from "../../assets/TimeIcon.svg";
import { ReactComponent as PriceIcon } from "../../assets/PriceIcon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/DeleteIcon.svg";

function Trip() {
    const [listtrips, setListtrips] = useState([]); // take list of trips from db
    useEffect(() => {}, [listtrips]);
    const [trip, setTrip] = useState({ ...tripTemplate }); // json body

    useEffect(() => {
        console.log(trip);
    }, [trip]);
    // driver list
    const [listDriver, setListdriver] = useState({});
    const [listVehicle, setListvehicle] = useState({});
    //initianize useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                let drivers = await driverApi.getAll();
                let vehicles = await TripApi.getVehicle();
                drivers = drivers.Drivers.map((driver) => ({
                    value: driver.identification,
                    label: driver.fullname,
                }));
                vehicles = vehicles.result.map((vehicle) => ({
                    value: vehicle.chassisNumber,
                    label:
                        vehicle.automaker +
                        " " +
                        vehicle.model +
                        " (odo: " +
                        vehicle.odometer +
                        " km)",
                }));
                setListvehicle(vehicles);
                setListdriver(drivers);
            } catch (error) {
                console.error("Error fetching drivers:", error);
            }
        };

        fetchData();
    }, []);

    //error
    const [errorMes, setErrorMes] = useState([]);
    //update state in trip
    const updateState = (name, value) => {
        let property;
        switch (name) {
            case "Date":
                const differenceTime = parseFloat(
                    (value[1].getTime() - value[0].getTime()) / (1000 * 60 * 60)
                ).toFixed(2);

                property = {
                    date_of_departure: value[0],
                    date_of_arrival: value[1],
                    expected_time: differenceTime,
                };
                break;
            case "vehicle_id":
                property = { vehicle_id: value };
                break;
            case "driver_id":
                property = { driver_id: value };
                break;
            case "starting_point":
                property = { starting_point: value };
                break;
            case "destination":
                property = { destination: value };
                break;
            case "pathway":
                property = { pathway: value };
                break;
            case "distance":
                property = { distance: value };
                break;
            case "expected_time":
                property = { expected_time: value };
                break;
            case "price":
                property = { price: value };
                break;
            // case infomation[6].name[0].name:
            //     property = { note: value };
            //     break;
        }
        setTrip((prev) => ({
            ...prev,
            ...property,
        }));
    };

    //update from and to by select
    function updateFrom(sta) {
        setTrip((prev) => ({
            ...prev,
            starting_point: sta,
        }));
    }
    function updateTo(sta) {
        setTrip((prev) => ({
            ...prev,
            destination: sta,
        }));
    }
    //update driver by select
    function updateId(id, name) {
        setTrip((prev) => ({
            ...prev,
            driver_id: id,
            driver_name: name,
        }));
    }
    //update vehicle by select
    function updateVehicleId(id, name) {
        setTrip((prev) => ({
            ...prev,
            vehicle_id: id,
            vehicle_name: name,
        }));
    }
    //choose the correct box in search bar
    const chooseElement = (info, attribute) => {
        if (info.index === 2) {
            return (
                <>
                    <DateRangePicker
                        className="w-full h-full focus:outline-none text-gray-500 text-center"
                        format="hh:mm aa - dd MMM yyyy"
                        showMeridian // 12h mode
                        showOneCalendar
                        placeholder=" "
                        onChange={(date) => {
                            if (!date) updateState("Date", [null, null]);
                            else updateState("Date", [date[0], date[1]]);
                        }}
                    />
                </>
            );
        } else if (info.index == 3) {
            const pro = province.map((prov) => ({
                value: prov.name,
                label: prov.name,
            }));
            return (
                <Sel
                    opt={pro}
                    update={
                        attribute == "starting_point" ? updateFrom : updateTo
                    }
                />
            );
        } else if (attribute == "driver_id") {
            return <Sel opt={listDriver} update={updateId} />;
        } else if (attribute == "vehicle_id") {
            return <Sel opt={listVehicle} update={updateVehicleId} />;
        } else
            return (
                <input
                    type="text"
                    className="w-[calc(100%-30px)] h-full focus:outline-none text-gray-500 mx-[15px]"
                    onChange={(e) => {
                        updateState(attribute, e.target.value);
                    }}
                />
            );
    };

    // add a trip into data
    async function AddTrip() {
        async function addE() {
            try {
                const res = await TripAPi.add(trip);
                dbtrips();
            } catch (error) {
                let err = error.response.data.errors;
                setErrorMes(Object.keys(err));
                console.log(errorMes);
                console.log(err);
                return false;
            }
            return true;
        }
        return await addE();
    }
    // when click submit button the added notification will appear
    function appearAndFade() {
        setErrorMes([]);
        var element = document.getElementById("element");
        element.style.display = "block";
        element.style.opacity = 1;
        setTimeout(function () {
            element.style.opacity = 0;
        }, 1000);
    }
    //use to delet a trip
    async function deleteTrip(id) {
        try {
            await TripAPi.delete(id);
            dbtrips();
            swal("Deleted", "The trip has been removed!", "success");
        } catch (err) {
            console.log(err);
        }
    }
    // take listtrips for db
    async function dbtrips() {
        const temp = await TripAPi.getAll();
        const temp_listrips = temp.trips.sort((a, b) => {
            return (
                new Date(a.date_of_departure) - new Date(b.date_of_departure)
            );
        });
        setListtrips(temp_listrips);
    }
    // use to format date from date data to dd-mm-yyyy
    function formatDate(date) {
        date = new Date(date);
        const hour = date.getHours().toString().padStart(2, "0");
        const min = date.getMinutes().toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        return `${hour}:${min} ${day}-${month}-${year}`;
    }

    useEffect(() => {
        dbtrips();
    }, []);

    return (
        <div className="flex flex-col">
            <p className="pt-[20px] font-bold text-[20px]">Trip information</p>
            <p className="text-gray450 text-[14px] mb-[15px]">
                Please enter information for the trip
            </p>
            <div>
                <div className="flex flex-col px-[50px] pb-[10px] bg-graybg rounded-[10px]">
                    {infomation.map((info) => (
                        <div
                            key={info.index}
                            className="flex flex-row gap-[2%]"
                        >
                            {info.name.map((na) => (
                                <div key={na.name} className="my-[10px] flex-1">
                                    <div>
                                        {na.attribute === "driver_id" ? (
                                            <div className="flex flex-row">
                                                <p className="h-[24px] text-[16px] mb-[5px] px-[15px]">
                                                    {na.name}
                                                </p>
                                                {/* <p className="text-[14px] text-gray450 ">
                                                    (Please enter the distance
                                                    first)
                                                </p> */}
                                            </div>
                                        ) : (
                                            <p className="h-[24px] text-[16px] mb-[5px] px-[15px]">
                                                {na.name}
                                            </p>
                                        )}

                                        <div
                                            className={`h-[35px] bg-white flex-1 rounded-[10px] ${
                                                errorMes.includes(na.attribute)
                                                    ? "border-red-700 border-[1px]"
                                                    : "noborder"
                                            }`}
                                        >
                                            {chooseElement(info, na.attribute)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="relative flex flex-row justify-center gap-[20px] py-[20px]">
                    <div id="element">Added</div>
                    <button
                        className="bg-custom-logo hover:bg-custom-hover w-[130px] h-[40px] font-bold text-white rounded-[10px] hover:"
                        onClick={async () => {
                            if (await AddTrip()) {
                                appearAndFade();
                            }
                        }}
                    >
                        Submit
                    </button>
                    {/* <button className="bg-custom-logo hover:bg-custom-hover w-[130px] h-[40px] font-bold text-white rounded-[10px]">
                        Search
                    </button> */}
                </div>
            </div>
            <p className="pt-[20px] font-bold text-[20px]">Trips</p>
            <p className="text-gray450 text-[14px] mb-[15px]">
                Below is the list of trips
            </p>

            <div className="setupWidth w-full grid grid-cols-2 gap-[2%]">
                {listtrips &&
                    listtrips.toReversed().map((curtrip) => (
                        <div
                            key={curtrip._id}
                            className="input_right flex flex-col bg-graybg rounded-[10px] gap-[10px]"
                        >
                            <div className="relative flex justify-center py-[15px]">
                                <Selectt
                                    className="justify-center"
                                    status={curtrip.status}
                                    opt={options}
                                    _id={curtrip._id}
                                />

                                <button
                                    id="transform5050"
                                    className="absolute p-3 transf right-0 items-center active:bg-gray-400 rounded-[50%] hover:bg-gray-300"
                                    onClick={() => deleteTrip(curtrip._id)}
                                >
                                    <DeleteIcon className="h-[20px] opacity-70" />
                                </button>
                            </div>

                            <div className="flex flex-row px-[10px] gap-[10px]">
                                <span className="text-cur font-medium ">
                                    Vehicals:
                                </span>
                                <input
                                    type="text"
                                    readOnly
                                    className="flex-1 min-w-0 focus:outline-none text-gray-500 rounded-[10px] px-[7px]"
                                    value={curtrip.vehicle_name}
                                />
                            </div>

                            <div className="flex flex-row px-[10px] gap-[10px]">
                                <span className="text-cur font-medium">
                                    Driver:
                                </span>
                                <input
                                    type="text"
                                    readOnly
                                    className="flex-1 min-w-0 focus:outline-none text-gray-500 rounded-[10px] px-[7px]"
                                    value={curtrip.driver_name}
                                />
                            </div>

                            <div className="flex flex-row px-[10px] gap-[10px]">
                                <div className="flex flex-col flex-1 min-w-0">
                                    <span className="text-cur font-medium ">
                                        Departure date
                                    </span>
                                    <input
                                        type="text"
                                        readOnly
                                        className="flex-1 min-w-0 focus:outline-none text-gray-500 rounded-[10px] px-[7px]"
                                        value={formatDate(
                                            curtrip.date_of_departure
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col flex-1 min-w-0">
                                    <span className="text-cur font-medium ">
                                        End date
                                    </span>
                                    <input
                                        type="text"
                                        readOnly
                                        className="flex-1 min-w-0 focus:outline-none text-gray-500 rounded-[10px] px-[7px]"
                                        value={formatDate(
                                            curtrip.date_of_arrival
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-row px-[10px] gap-[10px]">
                                <div className="flex flex-col flex-1 min-w-0">
                                    <span className="text-cur font-medium ">
                                        From
                                    </span>
                                    <input
                                        type="text"
                                        readOnly
                                        className="flex-1 min-w-0 focus:outline-none text-gray-500 rounded-[10px] px-[7px]"
                                        value={curtrip.starting_point}
                                    />
                                </div>
                                <div className="flex flex-col flex-1 min-w-0">
                                    <span className="text-cur font-medium ">
                                        To
                                    </span>
                                    <input
                                        type="text"
                                        readOnly
                                        className="flex-1 min-w-0 focus:outline-none text-gray-500 rounded-[10px] px-[7px]"
                                        value={curtrip.destination}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-row  justify-evenly pt-[15px] ">
                                <div className="flex flex-row gap-[5px]">
                                    <DistanceIcon className="h-[30px]" />
                                    <p className="text-[16px] font-medium content-center">
                                        {curtrip.distance} km
                                    </p>
                                </div>

                                <div className="flex flex-row gap-[5px]">
                                    <TimeIcon className="h-[30px]" />
                                    <p className="text-[16px] font-medium content-center">
                                        {curtrip.expected_time} hours
                                    </p>
                                </div>

                                <div className="flex flex-row gap-[5px]">
                                    <PriceIcon className="h-[30px] w-[30px]" />
                                    <p className="text-[16px] font-medium content-center">
                                        {curtrip.price} K
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col pb-[10px] px-[10px]">
                                <span className="text-cur font-medium ">
                                    Routine
                                </span>
                                <div className="scrollBar flex-1 min-w-0 text-gray-500 rounded-[10px] px-[10px] break-words bg-white overflow-y-scroll   max-h-[100px]">
                                    <p>{curtrip.pathway}</p>
                                </div>
                            </div>

                            {/* <div className="flex flex-col pb-[10px] px-[10px]">
                                <span className="text-cur font-medium ">
                                    Note
                                </span>
                                <div className="scrollBar flex-1 min-w-0 text-gray-500 rounded-[10px] px-[10px] break-words bg-white overflow-y-scroll   max-h-[100px]">
                                    <p>{curtrip.note || "NONE"}</p>
                                </div>
                            </div> */}
                        </div>
                    ))}
            </div>
            <div className="inline-block h-[100px]" />
        </div>
    );
}

export default Trip;
