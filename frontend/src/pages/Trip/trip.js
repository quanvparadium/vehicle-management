// import { useState, useEffect } from "react";
// import axios from "axios";

import { ReactComponent as DistanceIcon } from "../../assets/DistanceIcon.svg";
import { ReactComponent as TimeIcon } from "../../assets/TimeIcon.svg";
import { ReactComponent as PriceIcon } from "../../assets/PriceIcon.svg";

const infomation = [
    { index: 1, name: ["Trip code"] },
    { index: 2, name: ["Vehical code", "Driver code"] },
    { index: 3, name: ["Departure date", "Arrive date"] },
    { index: 4, name: ["Departure place", "Destination"] },
    { index: 5, name: ["Routine"] },
    { index: 6, name: ["Distance", "Intend time", "Price", "Status"] },
    { index: 7, name: ["Note"] },
];

function Trip() {
    return (
        <div className="mx-auto max-w-[1440px] px-2 sm:px-6 lg:px-8 bg-white">
            <div className="relative flex items-center justify-between p-6 text-left">
                <>
                    <div className="flex flex-col mt-[30px]">
                        <p className=" pt-[20px] font-bold text-[20px]">
                            Trip information
                        </p>
                        <p className="text-gray450 text-[14px] mb-[15px]">
                            Please enter information for the trip
                        </p>
                        <div>
                            <div className="flex flex-col px-[30px] pb-[10px] bg-graybg rounded-[10px]">
                                {infomation.map((info) => (
                                    <div
                                        key={info.index}
                                        className="flex flex-row gap-[50px]"
                                    >
                                        {info.name.map((na) => (
                                            <div
                                                key={na}
                                                className="my-[10px] flex-1"
                                            >
                                                <div>
                                                    <p className="text-[16px] mb-[5px] px-[15px]">
                                                        {na}
                                                    </p>
                                                    <div className="w-full bg-white flex-1 rounded-[10px] overflow-hidden px-[15px]">
                                                        <input
                                                            type="text"
                                                            className="w-full focus:outline-none text-gray-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-row justify-center gap-[20px] py-[20px]">
                                <button className="bg-custom-logo w-[130px] h-[40px] font-bold text-white rounded-[10px]">
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
                        <div className="min-h-[500px] w-full grid grid-cols-3">
                            <div className="flex flex-col bg-graybg rounded-[10px]">
                                <div className="flex justify-center py-[15px]">
                                    <div className="h-[39px] w-[206px] text-center content-center rounded-[10px] text-[20px] font-bold bg-green-500">
                                        Status
                                    </div>
                                </div>
                                <div className="flex flex-row px-[10px]">
                                    <p className="text-[20px] font-bold">
                                        Trip code:
                                    </p>
                                    <input
                                        type="text"
                                        readOnly
                                        className="flex-1"
                                    />
                                </div>
                                <div className="flex flex-row">
                                    <p>Vehicals code:</p>
                                    <input
                                        type="text"
                                        readOnly
                                        className="flex-1"
                                    />
                                </div>
                                <div className="flex flex-row">
                                    <div className="flex flex-col flex-1">
                                        <p>Departure date</p>
                                        <input
                                            type="text"
                                            readOnly
                                            className="flex-1"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <p>Arrive date</p>
                                        <input
                                            type="text"
                                            readOnly
                                            className="flex-1"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="flex flex-col flex-1">
                                        <p>Departure place</p>
                                        <input
                                            type="text"
                                            readOnly
                                            className="flex-1"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <p>Destination</p>
                                        <input
                                            type="text"
                                            readOnly
                                            className="flex-1"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <p>Routine:</p>
                                    <input
                                        type="text"
                                        readOnly
                                        className="flex-1"
                                    />
                                </div>
                                <div className="flex flex-row">
                                    <DistanceIcon />
                                    <p>200km</p>
                                    <TimeIcon />
                                    <p>200 hours</p>
                                    <PriceIcon />
                                    <p>200K</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </div>
    );
}

export default Trip;
