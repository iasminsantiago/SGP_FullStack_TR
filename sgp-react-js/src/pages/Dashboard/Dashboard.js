import React from "react";
import { Bar, Pie, Line, Radar } from "react-chartjs-2";
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    RadialLinearScale,
    Title,
    Tooltip,
} from "chart.js";

import "./Dashboard.css";

import MenuTopo from "../../components/MenuTopo";

ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    RadialLinearScale,
    Title,
    Tooltip
);

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        };
    }


    render() {
        return (
            <>
                <MenuTopo />
                <section className="dashboard_section">
                    <div className="d-flex">
                        <div className="row">
                            <div className="card col-md-4 dashboard_card">
                                <h2>Gráfico de Barras</h2>
                                <Bar
                                    data={{
                                        labels: [
                                            "Janeiro",
                                            "Fevereiro",
                                            "Março",
                                        ],
                                        datasets: [
                                            {
                                                label: "Vendas",
                                                data: [12, 19, 3],
                                                backgroundColor:
                                                    "rgba(75,192,192,0.4)",
                                            },
                                        ],
                                    }}
                                    options={{ responsive: true }}
                                />
                                <Bar data={{ labels: ['primeiro'], datasets: [{}]} } />
                            </div>
                            <div className="card col-md-4 dashboard_card">
                                <h2>Gráfico de Pizza</h2>
                                <Pie
                                    data={{
                                        labels: ["Red", "Blue", "Yellow"],
                                        datasets: [
                                            {
                                                data: [300, 50, 100],
                                                backgroundColor: [
                                                    "#FF6384",
                                                    "#36A2EB",
                                                    "#FFCE56",
                                                ],
                                            },
                                        ],
                                    }}
                                    options={{ responsive: true }}
                                />
                            </div>
                            <div className="card col-md-4 dashboard_card">
                                <h2>Gráfico de Linhas</h2>
                                <Line
                                    data={{
                                        labels: [
                                            "Janeiro",
                                            "Fevereiro",
                                            "Março",
                                            "Abril",
                                        ],
                                        datasets: [
                                            {
                                                label: "Temperatura",
                                                data: [30, 25, 28, 31],
                                                fill: true,
                                                backgroundColor:
                                                    "rgba(53,2,85,0.4)",
                                                borderColor: "#4BC9C9",
                                            },
                                        ],
                                    }}
                                    options={{ responsive: true }}
                                />
                            </div>
                            <div className="card col-md-4 dashboard_card">
                                <h2>Gráfico de Radar</h2>
                                <Radar
                                    data={{
                                        labels: [
                                            "Thing 1",
                                            "Thing 2",
                                            "Thing 3",
                                            "Thing 4",
                                            "Thing 5",
                                            "Thing 6",
                                        ],
                                        datasets: [
                                            {
                                                label: "# of Votes",
                                                data: [7, 9, 3, 5, 7, 4],
                                                fill: true,
                                                backgroundColor:
                                                    "rgba(255,99,132,0.5)",
                                                borderColor: "#4BC0C0",
                                                borderWidth: 1,
                                            },
                                        ],
                                    }}
                                    options={{ responsive: true }}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default Dashboard;
