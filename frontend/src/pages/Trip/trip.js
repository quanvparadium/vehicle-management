import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";

import TripAPi from "../../api/tripApi";
import "./trip.css";
import { infomation, options, tripTemplate } from "./data";
import { ReactComponent as DistanceIcon } from "../../assets/DistanceIcon.svg";
import { ReactComponent as TimeIcon } from "../../assets/TimeIcon.svg";
import { ReactComponent as PriceIcon } from "../../assets/PriceIcon.svg";
import { ReactComponent as CopyIcon } from "../../assets/CopyIcon.svg";
import { ReactComponent as DateIcon } from "../../assets/DateIcon.svg";

function Trip() {
    const [curdate1, setCurdate1] = useState(new Date()); //date of "Departure date"
    const [curdate2, setCurdate2] = useState(new Date()); //date of "End date"
    const [listtrips, setListtrips] = useState([]);
    const [_id, setID] = useState(); // id of trip
    // json body
    const [trip, setTrip] = useState({ ...tripTemplate });

    //update state in trip
    const updateState = (name, value) => {
        let property;
        switch (name) {
            case infomation[0].name[0]:
                setID(value);
                break;
            case infomation[1].name[0]:
                property = { vehicle_id: value };
                break;
            case infomation[1].name[1]:
                property = { driver_id: value };
                break;
            case infomation[2].name[0]:
                property = { date_of_departure: value };
                break;
            case infomation[2].name[1]:
                property = { date_of_arrival: value };
                break;
            case infomation[3].name[0]:
                property = { starting_point: value };
                break;
            case infomation[3].name[1]:
                property = { destination: value };
                break;
            case infomation[4].name[0]:
                property = { pathway: value };
                break;
            case infomation[5].name[0]:
                property = { distance: value };
                break;
            case infomation[5].name[1]:
                property = { expected_time: value };
                break;
            case infomation[6].name[0]:
                property = { price: value };
                break;
            case infomation[6].name[1]:
                property = { status: value };
                break;
            case infomation[7].name[0]:
                property = { note: value };
                break;
        }
        setTrip((prev) => ({
            ...prev,
            ...property,
        }));
    };
    //choose the correct box in search bar
    const chooseElement = (info, name) => {
        if (info.index === 3) {
            return (
                <DatePicker
                    dateFormat="dd-MM-yyyy"
                    selected={name === "Departure date" ? curdate1 : curdate2}
                    onChange={(date) => {
                        name === "Departure date"
                            ? setCurdate1(date)
                            : setCurdate2(date);

                        updateState(name, date);
                    }}
                    showIcon
                    icon={<DateIcon />}
                    className="w-full h-full focus:outline-none text-gray-500 gap-[10px] text-center"
                    wrapperClassName="w-full"
                />
            );
        } else if (name === "Status") {
            const style = {
                control: (provided) => ({
                    ...provided,
                    border: 0,
                    boxShadow: "none",
                    height: "30px",
                    minHeight: "30px",
                }),
                valueContainer: (base) => ({
                    ...base,
                    height: "30px",
                    padding: "0",
                }),
                singleValue: (base) => ({
                    ...base,
                    color: "gray-500",
                }),
            };
            return (
                <Select
                    className="h-[30px] text-gray-500"
                    defaultValue={"Select"}
                    isSearchable={true}
                    name="status"
                    options={options}
                    styles={style}
                    onChange={(event) => updateState(name, event.value)}
                />
            );
        } else
            return (
                <input
                    type="text"
                    className="w-full h-full focus:outline-none text-gray-500"
                    onChange={(e) => {
                        updateState(name, e.target.value);
                    }}
                />
            );
    };
    //choose the color of status
    const statusBgColor = (status) => {
        switch (status) {
            case options[0].label:
                return "bg-status-avai";
            case options[1].label:
                return "bg-status-inpro";
            default:
                return "bg-status-done";
        }
    };
    // add a trip into data
    function AddTrip() {
        async function addE() {
            try {
                const res = await TripAPi.add(trip);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
        addE();
    }

    useEffect(() => {
        async function test() {
            const temp = await TripAPi.getAll();
            setListtrips(temp.data.trips);
        }
        test();
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
                                <div key={na} className="my-[10px] flex-1">
                                    <div>
                                        {info.index === 1 ? (
                                            <div className="flex flex-row">
                                                <p className="h-[24px] text-[16px] mb-[5px] px-[15px]">
                                                    {na}
                                                </p>
                                                <p className="text-[14px] text-gray450 ">
                                                    (use for search only)
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="h-[24px] text-[16px] mb-[5px] px-[15px]">
                                                {na}
                                            </p>
                                        )}

                                        <div className="h-[35px] bg-white flex-1 rounded-[10px] px-[15px]">
                                            {chooseElement(info, na)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="flex flex-row justify-center gap-[20px] py-[20px]">
                    <button
                        className="bg-custom-logo w-[130px] h-[40px] font-bold text-white rounded-[10px] hover:"
                        onClick={() => {
                            AddTrip();
                        }}
                    >
                        Submit
                    </button>
                    <button className="bg-custom-logo w-[130px] h-[40px] font-bold text-white rounded-[10px]">
                        Search
                    </button>
                </div>
            </div>
            <p className="pt-[20px] font-bold text-[20px]">Trips</p>
            <p className="text-gray450 text-[14px] mb-[15px]">
                Below is the list of trips
            </p>

            <div className="setupWidth w-full grid grid-cols-2 gap-[2%]">
                {listtrips &&
                    listtrips.map((curtrip) => (
                        <div
                            key={curtrip._id}
                            className="input_right flex flex-col bg-graybg rounded-[10px] gap-[10px]"
                        >
                            <div className="flex justify-center py-[15px]">
                                <div
                                    className={`h-[39px] w-[206px] text-center content-center rounded-[10px] text-[16px] font-bold ${statusBgColor(
                                        curtrip.status
                                    )}`}
                                >
                                    {curtrip.status}
                                </div>
                            </div>
                            <div className="flex flex-row px-[10px] gap-[10px] ">
                                <span className="text-cur font-medium ">
                                    Trip code:
                                </span>
                                <input
                                    type="text"
                                    readOnly
                                    className="flex-1 min-w-0 focus:outline-none text-gray-500 rounded-[10px] px-[7px]"
                                    value={curtrip._id}
                                />
                                <button
                                    className="items-center active:bg-gray-400 rounded-[10px]"
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            curtrip._id
                                        )
                                    }
                                >
                                    <CopyIcon />
                                </button>
                            </div>

                            <div className="flex flex-row px-[10px] gap-[10px]">
                                <span className="text-cur font-medium ">
                                    Vehicals code:
                                </span>
                                <input
                                    type="text"
                                    readOnly
                                    className="flex-1 min-w-0 focus:outline-none text-gray-500 rounded-[10px] px-[7px]"
                                    value={curtrip.vehicle_id}
                                />
                                <button
                                    className="items-center active:bg-gray-400 rounded-[10px]"
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            curtrip.vehicle_id
                                        )
                                    }
                                >
                                    <CopyIcon />
                                </button>
                            </div>

                            <div className="flex flex-row px-[10px] gap-[10px]">
                                <span className="text-cur font-medium">
                                    Driver code:
                                </span>
                                <input
                                    type="text"
                                    readOnly
                                    className="flex-1 min-w-0 focus:outline-none text-gray-500 rounded-[10px] px-[7px]"
                                    value={curtrip.driver_id}
                                />
                                <button
                                    className="items-center active:bg-gray-400 rounded-[10px]"
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            curtrip.driver_id
                                        )
                                    }
                                >
                                    <CopyIcon />
                                </button>
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
                                        value={curtrip.date_of_departure}
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
                                        value={curtrip.date_of_arrival}
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

                            <div className="flex flex-row px-[10px] gap-[10px]">
                                <span className="text-cur font-medium">
                                    Routine:
                                </span>
                                <input
                                    type="text"
                                    readOnly
                                    className="flex-1 min-w-0 focus:outline-none text-gray-500 rounded-[10px] px-[7px]"
                                    value={curtrip.pathway}
                                />
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
                                    <PriceIcon className="h-[30px]" />
                                    <p className="text-[16px] font-medium content-center">
                                        {curtrip.price} K
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col pb-[10px] px-[10px]">
                                <span className="text-cur font-medium ">
                                    Note
                                </span>
                                <div className="scrollBar flex-1 min-w-0 text-gray-500 rounded-[10px] px-[10px] break-words bg-white overflow-y-scroll   max-h-[100px]">
                                    <p>{curtrip.note || "NONE"}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="mb-[1000px]"></div>
        </div>
    );
}

export default Trip;
