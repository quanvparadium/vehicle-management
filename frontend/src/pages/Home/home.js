import { useState, useEffect } from "react";
import './styles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp, faArrowTrendDown  } from '@fortawesome/free-solid-svg-icons'
import Chart from "chart.js/auto";
import tripApi from '../../api/tripApi'

function Home() {
    const MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    function months(current) {
        var index = MONTHS.indexOf(current); 
        if (index === -1) return []; 
        return MONTHS.slice(0, index + 1); 
    }

    const [income, setIncome] = useState(true);

    const [doughnut, setDoughnut] = useState();
    useEffect(() => {
        const temp = tripApi.getAll();

    },[])

    useEffect(() => {
        const labels = months('July');
        console.log(labels);
        const data = {
            labels: labels,
            datasets: [{
                label: 'Total revenue',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: true,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                backgroundColor: '#265073bc',
                borderColor: 'black',
            }]
        };
        
        new Chart(
            document.getElementById('revenue'),
            {
                type: 'line',
                data: data,
                options: {
                    scales: {
                        x: {
                            lineWidth: 10,
                            grid: {
                                display: false // Ẩn lưới của trục x
                            },
                            ticks: {
                                font: {
                                    size: "14", // Kích thước chữ của trục y
                                    weight: "bold",
                                }
                            }
                        },
                        y: {

                            grid: {
                                display: false // Ẩn lưới của trục x
                            },
                            ticks: {
                                font: {
                                    size: "14", // Kích thước chữ của trục y
                                    weight: "bold",
                                }
                            },
                        }
                    }
                }
            }
        );
    },[])

    useEffect(() => {
        const data = {
            labels: [
                'Fuel',
                'Maintenance',
                'Others'
            ],
            datasets: [{
                // label: 'My First Dataset',
                data: [300, 50, 100],
                backgroundColor: [
                    '#E14D2A',
                    '#004225',
                    '#1B1A55'
                ],
                hoverOffset: 4
            }]
        };
        
        new Chart(
            document.getElementById('cost'),
            {
                type: 'doughnut',
                data: data
            }
        );
    },[])
    
    return ( 
        <div className="home_container">
            <div className="home_container1">
                <div className="container1_box">
                    <div className="box_header">Vehicle</div>
                    <ul>
                        <li style={{fontWeight: '555'}}>Available <span style={{float: 'right', marginRight: '25px'}}>3000</span> </li>
                        <li style={{fontWeight: '555'}}>Running <span style={{float: 'right', marginRight: '25px'}}>3000</span></li>
                        <li style={{fontWeight: '555'}}>On mainenance <span style={{float: 'right', marginRight: '25px'}}>3000</span></li>
                    </ul>
                </div>

                <div className="container1_box">
                    <div className="box_header">Driver</div>
                    <ul>
                        <li style={{fontWeight: '555'}}>Active <span style={{float: 'right', marginRight: '25px'}}>3000</span> </li>
                        <li style={{fontWeight: '555'}}>Inactive <span style={{float: 'right', marginRight: '25px'}}>3000</span></li>
                    </ul>
                </div>

                <div className="container1_box">
                    <div className="box_header">Trip</div>
                    <ul>
                        <li style={{fontWeight: '555'}}>Pending <span style={{float: 'right', marginRight: '25px'}}>3000</span> </li>
                        <li style={{fontWeight: '555'}}>In progress <span style={{float: 'right', marginRight: '25px'}}>3000</span></li>
                        <li style={{fontWeight: '555'}}>Completed <span style={{float: 'right', marginRight: '25px'}}>3000</span></li>
                        <li style={{fontWeight: '555'}}>Cancelled <span style={{float: 'right', marginRight: '25px'}}>3000</span></li>
                    </ul>
                </div>

                <div className={`container1_box ${ income ? "incomeUp" : "incomeDown" }`}>
                    <div className="box_header">Income <span style={{float: 'right', marginRight: '25px'}}>3000</span></div>
                    {income ? ( 
                    <div style={{display: "inline-block", textAlign: "center"}}>
                        <FontAwesomeIcon icon={faArrowTrendUp} style={{width: '40%', height: '30%', color: 'rgb(19, 69, 19)'}}/>
                    </div>
                    ) : (
                    <div style={{display: "inline-block", textAlign: "center"}}>
                        <FontAwesomeIcon icon={faArrowTrendDown} style={{width: '40%', height: '30%', color: 'rgb(108, 22, 22)'}}/>
                    </div>)}
                </div>
            </div>

            <div className="home_container2">
                <div className="container2_doughnutChart">
                    <canvas id="cost"></canvas>
                    <div style={{width: '100%', fontWeight: 'bold', marginTop: '10px'}}>Expense summary</div>
                </div>

                <div className="container2_barChart">
                    <canvas id="revenue"></canvas>
                </div>
            </div>
            
        </div>
     );
}

export default Home;
