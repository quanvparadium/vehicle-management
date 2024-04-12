import { useState, useEffect } from "react";
// import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./trip.css";
import { ReactComponent as DistanceIcon } from "../../assets/DistanceIcon.svg";
import { ReactComponent as TimeIcon } from "../../assets/TimeIcon.svg";
import { ReactComponent as PriceIcon } from "../../assets/PriceIcon.svg";
import { ReactComponent as CopyIcon } from "../../assets/CopyIcon.svg";
import { ReactComponent as DateIcon } from "../../assets/DateIcon.svg";

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

function Trip() {
    const [curdate1, setCurdate1] = useState(null);
    const [curdate2, setCurdate2] = useState(null);
    const [trip, setTrip] = useState({
        tripCode: "",
        vehicalCode: "",
        driverCode: "",
        departureDate: new Date(),
        endDate: new Date(),
        from: "",
        to: "",
        routine: "",
        distance: 0,
        intendTime: 0,
        price: 0,
        status: "",
        note: "",
    });

    const updateState = (name, value) => {
        let property;
        switch (name) {
            case infomation[0].name[0]:
                property = { tripCode: value };
                break;
            case infomation[1].name[0]:
                property = { vehicalCode: value };
                break;
            case infomation[1].name[1]:
                property = { driverCode: value };
                break;
            case infomation[2].name[0]:
                property = { departureDate: value };
                break;
            case infomation[2].name[1]:
                property = { endDate: value };
                break;
            case infomation[3].name[0]:
                property = { from: value };
                break;
            case infomation[3].name[1]:
                property = { to: value };
                break;
            case infomation[4].name[0]:
                property = { routine: value };
                break;
            case infomation[5].name[0]:
                property = { distance: value };
                break;
            case infomation[5].name[1]:
                property = { intendTime: value };
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

    return (
        <div className="flex flex-col mt-[30px]">
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
                                        <p className="h-[24px] text-[16px] mb-[5px] px-[15px]">
                                            {na}
                                        </p>
                                        <div className="h-[30px] bg-white flex-1 rounded-[10px] overflow-hidden px-[15px]">
                                            {info.index == 3 ? (
                                                <DatePicker
                                                    selected={
                                                        na == "Departure date"
                                                            ? curdate1
                                                            : curdate2
                                                    }
                                                    onChange={(date) => {
                                                        na == "Departure date"
                                                            ? setCurdate1(date)
                                                            : setCurdate2(date);

                                                        updateState(na, date);
                                                    }}
                                                    showIcon
                                                    icon={<DateIcon />}
                                                    className="w-full h-full focus:outline-none text-gray-500 gap-[10px] text-center"
                                                    wrapperClassName="w-full"
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    className="w-full h-full focus:outline-none text-gray-500"
                                                    onChange={(e) => {
                                                        updateState(
                                                            na,
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="flex flex-row justify-center gap-[20px] py-[20px]">
                    <button className="bg-custom-logo w-[130px] h-[40px] font-bold text-white rounded-[10px] hover:">
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
                <div className="flex flex-col min-h-[500px] bg-graybg rounded-[10px] gap-[10px]">
                    <div className="flex justify-center py-[15px]">
                        <div className="h-[39px] w-[206px] text-center content-center rounded-[10px] text-[20px] font-bold bg-green-500">
                            Status
                        </div>
                    </div>
                    <div className="flex flex-row px-[10px] gap-[10px]">
                        <p className="text-[20px] font-medium">Trip code:</p>
                        <input
                            type="text"
                            readOnly
                            className="flex-1 focus:outline-none text-gray-500 rounded-[10px] px-[7px]"
                        />
                        <button className="items-center">
                            <CopyIcon />
                        </button>
                    </div>

                    <div className="flex flex-row px-[10px] gap-[10px]">
                        <p className="text-[20px] font-medium">
                            Vehicals code:
                        </p>
                        <input
                            type="text"
                            readOnly
                            className="flex-1 focus:outline-none text-gray-500 rounded-[10px] px-[7px]"
                        />
                        <button className="items-center">
                            <CopyIcon />
                        </button>
                    </div>

                    <div className="flex flex-row px-[10px] gap-[10px]">
                        <p className="text-[20px] font-medium">Driver code:</p>
                        <input
                            type="text"
                            readOnly
                            className="flex-1 focus:outline-none text-gray-500 rounded-[10px] px-[7px]"
                        />
                        <button className="items-center">
                            <CopyIcon />
                        </button>
                    </div>

                    <div className="flex flex-row px-[10px] gap-[10px]">
                        <div className="flex flex-col flex-1">
                            <p className="text-[20px] font-medium ">
                                Departure date
                            </p>
                            <input
                                type="text"
                                readOnly
                                className="flex-1 focus:outline-none text-gray-500 rounded-[10px] px-[7px]"
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <p className="text-[20px] font-medium ">End date</p>
                            <input
                                type="text"
                                readOnly
                                className="flex-1 focus:outline-none text-gray-500 rounded-[10px] px-[7px]"
                            />
                        </div>
                    </div>

                    <div className="flex flex-row px-[10px] gap-[10px]">
                        <div className="flex flex-col flex-1">
                            <p className="text-[20px] font-medium ">From</p>
                            <input
                                type="text"
                                readOnly
                                className="flex-1 focus:outline-none text-gray-500 rounded-[10px] px-[7px]"
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <p className="text-[20px] font-medium ">To</p>
                            <input
                                type="text"
                                readOnly
                                className="flex-1 focus:outline-none text-gray-500 rounded-[10px] px-[7px]"
                            />
                        </div>
                    </div>

                    <div className="flex flex-row px-[10px] gap-[10px]">
                        <p className="text-[20px] font-medium">Routine:</p>
                        <input
                            type="text"
                            readOnly
                            className="flex-1 focus:outline-none text-gray-500 rounded-[10px] px-[7px]"
                        />
                    </div>

                    <div className="flex flex-row px-[10px] justify-evenly pt-[15px] ">
                        <div className="flex flex-row gap-[5px]">
                            <DistanceIcon className="h-[40px]" />
                            <p className="text-[17px] font-medium content-center">
                                200km
                            </p>
                        </div>

                        <div className="flex flex-row gap-[5px]">
                            <TimeIcon className="h-[40px]" />
                            <p className="text-[17px] font-medium content-center">
                                200 hours
                            </p>
                        </div>

                        <div className="flex flex-row gap-[5px]">
                            <PriceIcon className="h-[40px]" />
                            <p className="text-[17px] font-medium content-center">
                                200K
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col pb-[2%] px-[10px]">
                        <p className="text-[20px] font-medium ">Note</p>
                        <div className="scrollBar flex-1 focus:outline-none text-gray-500 rounded-[10px] px-[10px] break-words bg-white min-h-[50px] max-h-[100px] overflow-y-scroll">
                            <p>
                                "sdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaasdaaaa"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-[1000px]"></div>
        </div>
    );
}

export default Trip;
