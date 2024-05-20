import { useEffect, useState } from "react";
import Select from "react-select";

import TripApi from "../../api/tripApi";

const Sel = (prop) => {
    const style = {
        indicatorSeparator: () => {},
        control: (provided) => ({
            ...provided,
            width: "100%",
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

    return (
        <div className={`w-full h-full`}>
            <Select
                className="h-full text-gray-500 mx-[15px]"
                options={prop.opt}
                styles={style}
                onChange={(event) => {
                    prop.update(event.value, event.label);
                }}
            />
        </div>
    );
};

export default Sel;
