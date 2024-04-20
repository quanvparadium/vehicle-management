import { useEffect, useState } from "react";
import Select from "react-select";

import TripApi from "../../api/tripApi";
import { options } from "./data";

const Selectt = (prop) => {
    let index = -1;
    for (let i = 0; i < 3; i++) {
        if (prop.status == options[i].value) {
            index = i;
            break;
        }
    }

    const [status, setStatus] = useState(prop.status);
    const style = {
        indicatorSeparator: () => {},
        control: (provided) => ({
            ...provided,
            width: "150px",
            border: 0,
            boxShadow: "none",
            height: "30px",
            minHeight: "30px",
            background: "none",
        }),
        valueContainer: (base) => ({
            ...base,
            height: "30px",
            padding: "0",
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: "black", // Custom colour
        }),
    };

    //update data
    function updateTrip(id, sta) {
        TripApi.update(id, sta);
        setStatus(sta);
    }

    return (
        <div
            className={`h-[39px] w-[206px] flex justify-end pr-[2%] rounded-[10px] text-center text-[16px] font-bold ${
                status === options[0].label
                    ? "bg-status-avai"
                    : status === options[1].label
                    ? "bg-status-inpro"
                    : "bg-status-done"
            }`}
        >
            <Select
                className="h-[30px] text-black bg-none"
                defaultValue={options[index]}
                name="status"
                options={prop.opt}
                styles={style}
                onChange={(event) => updateTrip(prop._id, event.value)}
            />
        </div>
    );
};

export default Selectt;
