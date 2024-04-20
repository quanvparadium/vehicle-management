import { useState, useEffect } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowTrendUp,
    faArrowTrendDown,
} from "@fortawesome/free-solid-svg-icons";
import Chart from "chart.js/auto";
import tripApi from "../../api/tripApi";

function Home() {
    const MONTHS = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    function months(current) {
        var index = MONTHS.indexOf(current);
        if (index === -1) return [];
        return MONTHS.slice(0, index + 1);
    }

    const [income, setIncome] = useState(false);

    const [doughnut, setDoughnut] = useState();
    useEffect(() => {
        const temp = tripApi.getAll();
    }, []);

    useEffect(() => {
        const labels = months("July");
        const data = {
            labels: labels,
            datasets: [
                {
                    label: "Total revenue",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: true,
                    tension: 0.1,
                    backgroundColor: "#768CCE",
                    borderColor: "black",
                },
            ],
        };

        const chart = new Chart(document.getElementById("revenue"), {
            type: "line",
            data: data,
            options: {
                responsive: true,
                scales: {
                    x: {
                        lineWidth: 10,
                        grid: {
                            display: false, // Ẩn lưới của trục x
                        },
                        ticks: {
                            font: {
                                size: "10", // Kích thước chữ của trục y
                                weight: "bold",
                            },
                        },
                    },
                    y: {
                        grid: {
                            display: false, // Ẩn lưới của trục x
                        },
                        ticks: {
                            font: {
                                size: "10", // Kích thước chữ của trục y
                                weight: "bold",
                            },
                        },
                    },
                },
            },
        });

        // Thêm sự kiện lắng nghe thay đổi kích thước cửa sổ
        window.addEventListener("resize", () => {
            chart.resize();
        });

        // Dọn dẹp khi unmount
        return () => {
            window.removeEventListener("resize", () => {
                chart.resize();
            });
        };
    });

    useEffect(() => {
        const data = {
            labels: ["Fuel", "Maintenance", "Others"],
            datasets: [
                {
                    // label: 'My First Dataset',
                    data: [300, 50, 100],
                    backgroundColor: ["#B33A89", "#806154", "#FFC35E"],
                    hoverOffset: 4,
                },
            ],
        };

        new Chart(document.getElementById("cost"), {
            type: "doughnut",
            data: data,
        });
    });

    return (
        <div className="home_container">
            <div className="home_container1">
                <div className="container1_box">
                    <div className="box_header">Vehicle</div>
                    <ul className="box_list">
                        <li className="box_item">
                            Available <span className="box_item1">3000</span>{" "}
                        </li>
                        <li className="box_item">
                            Running <span className="box_item1">3000</span>
                        </li>
                        <li className="box_item">
                            On maintenance{" "}
                            <span className="box_item1">3000</span>
                        </li>
                    </ul>
                </div>

                <div className="container1_box">
                    <div className="box_header">Driver</div>
                    <ul className="box_list">
                        <li className="box_item">
                            Active <span className="box_item1">3000</span>{" "}
                        </li>
                        <li className="box_item">
                            Inactive <span className="box_item1">3000</span>
                        </li>
                    </ul>
                </div>

                <div className="container1_box">
                    <div className="box_header">Trip</div>
                    <ul className="box_list">
                        <li className="box_item">
                            Pending <span className="box_item1">3000</span>{" "}
                        </li>
                        <li className="box_item">
                            In progress <span className="box_item1">3000</span>
                        </li>
                        <li className="box_item">
                            Completed <span className="box_item1">3000</span>
                        </li>
                        <li className="box_item">
                            Cancelled <span className="box_item1">3000</span>
                        </li>
                    </ul>
                </div>

                <div
                    className={`container1_income ${
                        income ? "incomeUp" : "incomeDown"
                    }`}
                >
                    <div className="box_header">
                        Income <span className="box_item1">3000</span>
                    </div>
                    {income ? (
                        // <div style={{display: "inline-block", textAlign: "center"}}>
                        <FontAwesomeIcon
                            icon={faArrowTrendUp}
                            style={{
                                width: "70%",
                                height: "50%",
                                color: "rgb(19, 69, 19)",
                                margin: "auto",
                            }}
                        />
                    ) : (
                        // </div>
                        //<div style={{display: "inline-block", textAlign: "center"}}>
                        <FontAwesomeIcon
                            icon={faArrowTrendDown}
                            style={{
                                width: "70%",
                                height: "50%",
                                color: "black",
                                margin: "auto",
                            }}
                        />
                        //</div>
                    )}
                </div>
            </div>

            <div className="home_container2">
                <div className="container2_doughnutChart">
                    <canvas id="cost"></canvas>
                    <div className="cost_label">Expense summary</div>
                </div>

                {/* <canvas id="revenue"></canvas> */}
                <div className="container2_lineChart">
                    <canvas id="revenue"></canvas>
                </div>
            </div>
        </div>
    );
}

export default Home;
