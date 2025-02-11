import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const Chat = ({ tempBooking }) => {
    const chartData = {
        labels: tempBooking.map((booking) => booking.carModel), 
        datasets: [
            {
                label: "Daily Rental Price",
                data: tempBooking.map((booking) => booking.dailyRentalPrice), 
                backgroundColor: "#EC3323",
                borderColor: "#EC3323",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Daily Rental Prices for Booked Cars',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Price (USD)',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Car Models',
                },
            },
        },
    };

    return (
        <div className="p-6 pt-24">
            <h1 className="text-4xl font-bold mb-4 text-center">Rental Price Chart</h1>
            <div className="mb-6">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default Chat;
