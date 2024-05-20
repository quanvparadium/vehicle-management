import { useState, useEffect } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowTrendUp,
    faArrowTrendDown,
} from "@fortawesome/free-solid-svg-icons";
import Chart from "chart.js/auto";
import tripApi from "../../api/tripApi";
import vehicleApi from "../../api/vehicleApi";
import driverApi from "../../api/driverApi";

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
    
    function months(maxMonth) {
        // Trích xuất phần tháng từ maxMonth
        const monthNumber = parseInt(maxMonth.split('-')[1]);
    
        // Kiểm tra xem tháng có hợp lệ không
        if (monthNumber < 1 || monthNumber > 12) return [];
    
        // Trả về mảng các tháng từ tháng 1 đến tháng maxMonth
        return MONTHS.slice(0, monthNumber);
    }
    

    const [income, setIncome] = useState(false);

    const [doughnut, setDoughnut] = useState([0, 0]);

    async function countFuelStates() {
        try {
            const vehicles = await vehicleApi.getAllVehicle();
            console.log("response in home.js/ vehicleStates: ", vehicles);

            //const vehicles = response.trips; // Trích xuất mảng chuyến đi từ thuộc tính 'trips'
            
            // Check if trips is an array
            if (!Array.isArray(vehicles)) {
                throw new Error("API response vehicles is not an array");
            }
            
            const totalFuel = 200*vehicles.reduce((sum, vehicle) => {
                const fuelState = parseFloat(vehicle.fuelState);  // Convert fuelState to a number
                return sum + (isNaN(fuelState) ? 0 : fuelState);  // Handle NaN cases
              }, 0);
            const maintenanceCount = 5000*vehicles.filter(vehicle => vehicle.state === 'ON MAINTENANCE').length;
            console.log("fuel: ", totalFuel);
            console.log("maintenance: ", maintenanceCount);

            setDoughnut([totalFuel, maintenanceCount, 10000]);
            console.log("doughnut: ", doughnut);
        
        } catch (error) {
          console.error("Error fetching vehicles:", error);
        }
      }

      /////////////////////////
      const [line, setLine] = useState([]);
      const [maxMonth, setMaxMonth] = useState('');

      async function countPrices() {
        try {
            const response = await tripApi.getAll();
            const trips = response.trips; // Adjust based on actual API response
      
            if (!Array.isArray(trips)) {
              throw new Error("API response trips is not an array");
            }
      
            // Tạo một đối tượng để lưu trữ tổng giá của từng tháng
            let monthPriceMap = {};

            // Duyệt qua từng chuyến đi
            trips.forEach(trip => {
                const date = new Date(trip.date_of_arrival);
                const month = date.getMonth() + 1; // Lấy tháng (getMonth() trả về từ 0-11 nên cần cộng thêm 1)
                const yearMonth = `${date.getFullYear()}-${month < 10 ? '0' + month : month}`; // Định dạng lại thành chuỗi "yyyy-mm"

                // Cộng dồn giá của chuyến đi vào tổng giá của tháng tương ứng
                if (!monthPriceMap[yearMonth]) {
                    monthPriceMap[yearMonth] = 0;
                }
                monthPriceMap[yearMonth] += trip.price;
            });

            // Tìm tháng cao nhất
            let maxMonth = Object.keys(monthPriceMap).reduce((a, b) => monthPriceMap[a] > monthPriceMap[b] ? a : b);
            setMaxMonth(maxMonth);

            // Tạo một mảng để lưu giá của từng tháng từ tháng 1 đến tháng cao nhất
            let prices = [];
            for (let i = 1; i <= parseInt(maxMonth.split('-')[1]); i++) {
                let yearMonth = `2024-${i < 10 ? '0' + i : i}`;
                prices.push(monthPriceMap[yearMonth] || 0); // Nếu tháng đó không có giá thì thêm 0 vào mảng
            }

            console.log("prices ", prices); // In ra mảng giá
            setLine(prices);
          } catch (error) {
            console.error("Error fetching trips:", error);
          }
        }


      //////////////////
    
    const [tripCounts, setTripCounts] = useState({
        AVAILABLE: 0,
        'IN PROCESS': 0,
        DONE: 0,
      });
    
    async function countTripStates() {
        try {

            const response = await tripApi.getAll();
            console.log("response in home.js: ", response);

            const trips = response.trips; // Trích xuất mảng chuyến đi từ thuộc tính 'trips'
            
            // Check if trips is an array
            if (!Array.isArray(trips)) {
                throw new Error("API response trips is not an array");
            }
         

        let stateCounts = trips.reduce((counts, trip) => {
            let status = trip.status;
            if (!counts[status]) {
                counts[status] = 0;
            }
            counts[status]++;
            return counts;
        }, {});
    
          return stateCounts;
        } catch (error) {
          console.error("Error fetching trips:", error);
          return {
            AVAILABLE: 0,
            'IN PROCESS': 0,
            DONE: 0,
        };
        }
      }

    async function fetchTripCounts() {
        try {
          const counts = await countTripStates();
          console.log("coutns trips = ", counts);
          setTripCounts(counts);
        } catch (error) {
          console.error("Error fetching trip counts:", error);
        }
      }
    
    
    const [vehicleCounts, setVehicleCounts] = useState({
        AVAILABLE: 0,
        RUNNING: 0,
        'ON MAINTENANCE': 0,
      });
    
    async function countVehicleStates() {
        try {
            const vehicles = await vehicleApi.getAllVehicle();
            console.log("response in home.js/ vehicleStates: ", vehicles);

            //const vehicles = response.trips; // Trích xuất mảng chuyến đi từ thuộc tính 'trips'
            
            // Check if trips is an array
            if (!Array.isArray(vehicles)) {
                throw new Error("API response vehicles is not an array");
            }
         

        let stateCounts = vehicles.reduce((counts, vehicle) => {
            let state = vehicle.state;
            if (!counts[state]) {
                counts[state] = 0;
            }
            counts[state]++;
            return counts;
        }, {});
    
          return stateCounts;
        } catch (error) {
          console.error("Error fetching vehicles:", error);
          return {
            AVAILABLE: 0,
            RUNNING: 0,
            'ON MAINTENANCE': 0,
          };
        }
      }

      async function fetchVehicleCounts() {
        try {
          const counts = await countVehicleStates();
          console.log("coutns vehicle = ", counts);
          setVehicleCounts(counts);
        } catch (error) {
          console.error("Error fetching vehicles counts:", error);
        }
      }

    ////////////
    const [driverCounts, setDriverCounts] = useState({
        ACTIVE: 0,
        INACTIVE: 0,
      });
    
    async function countDriverStates() {
        try {
            const drivers = await driverApi.getAll();
            console.log("response in home.js/ driverStates: ", drivers);

            //const vehicles = response.trips; // Trích xuất mảng chuyến đi từ thuộc tính 'trips'
            
            // Check if trips is an array
            if (!Array.isArray(drivers)) {
                throw new Error("API response vehicles is not an array");
            }
         

        let stateCounts = drivers.reduce((counts, driver) => {
            let state = driver.state;
            if (!counts[state]) {
                counts[state] = 0;
            }
            counts[state]++;
            return counts;
        }, {});
    
          return stateCounts;
        } catch (error) {
          console.error("Error fetching vehicles:", error);
          return {
            ACTIVE: 0,
            INACTIVE: 0,
          };
        }
      }

      async function fetchDriverCounts() {
        try {
          const counts = await countDriverStates();
          console.log("coutns driver = ", counts);
          setDriverCounts(counts);
        } catch (error) {
          console.error("Error fetching vehicles counts:", error);
        }
      }
  
      useEffect(() => {
        fetchTripCounts();
        fetchVehicleCounts();
        fetchDriverCounts();

        countFuelStates();
        countPrices();
      }, []);

      


    useEffect(() => {
        const labels = months(maxMonth);
        const data = {
            labels: labels,
            datasets: [
                {
                    label: "Total revenue",
                    data: line,
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
        const resizeChart = () => {
            chart.resize();
          };
        
          window.addEventListener("resize", resizeChart);
        
          return () => {
            window.removeEventListener("resize", resizeChart);
            chart.destroy();
          };
    });

    useEffect(() => {
        const data = {
            labels: ["Fuel", "Maintenance", "Others"],
            datasets: [
                {
                    // label: 'My First Dataset',
                    //data: [300, 50, 100],
                    data: doughnut,
                    backgroundColor: ["#B33A89", "#806154", "#FFC35E"],
                    hoverOffset: 4,
                },
            ],
        };

        const chart1 = new Chart(document.getElementById("cost"), {
            type: "doughnut",
            data: data,
        });

        const resizeChart1 = () => {
            chart1.resize();
          };
        
          window.addEventListener("resize", resizeChart1);
        
          return () => {
            window.removeEventListener("resize", resizeChart1);
            chart1.destroy();
          };
    });

    return (
        <div className="home_container">
            <div className="home_container1">
                <div className="container1_box">
                    <div className="box_header">Vehicle</div>
                    <ul className="box_list">
                        <li className="box_item">
                            Available <span className="box_item1"> {vehicleCounts.AVAILABLE} </span>{" "}
                        </li>
                        <li className="box_item">
                            Running <span className="box_item1"> {vehicleCounts.RUNNING} </span>
                        </li>
                        <li className="box_item">
                            On maintenance{" "}
                            <span className="box_item1"> {vehicleCounts['ON MAINTENANCE']} </span>
                        </li>
                    </ul>
                </div>

                <div className="container1_box">
                    <div className="box_header">Driver</div>
                    <ul className="box_list">
                        <li className="box_item">
                            Active <span className="box_item1"> {driverCounts.ACTIVE} </span>{" "}
                        </li>
                        <li className="box_item">
                            Inactive <span className="box_item1"> {driverCounts.INACTIVE} </span>
                        </li>
                    </ul>
                </div>

                <div className="container1_box">
                    <div className="box_header">Trip</div>
                    <ul className="box_list">
                        <li className="box_item">
                            Available <span className="box_item1"> {tripCounts.AVAILABLE} </span>{" "}
                        </li>
                        <li className="box_item">
                            In process <span className="box_item1"> {tripCounts['IN PROCESS']} </span>
                        </li>
                        <li className="box_item">
                            Done <span className="box_item1"> {tripCounts.DONE} </span>
                        </li>
                    </ul>
                </div>

                <div
                    className={`container1_income ${
                        income ? "incomeUp" : "incomeDown"
                    }`}
                >
                    <div className="box_header">
                        Income <span className="box_header_item">3000</span>
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
