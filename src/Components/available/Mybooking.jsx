import React, { useState, useEffect, useContext } from "react";
import { FaTrash, FaCalendarAlt } from "react-icons/fa";
import { AuthContext } from "../AuthProvider";
import Swal from "sweetalert2";
import Chat from "./Chat";
import axios from "axios";




const Mybooking = () => {
    const [tempbokking, setTemp] = useState([]);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    // this is data loading ?
    useEffect(() => {
        setLoading(true);
        // axios.get('https://rentcar-seven.vercel.app/watchlist')
        // .then(res=>{
        //     setTemp(res.data);
        //     console.log(res.data)
        //     setLoading(false);
        // })
        // .catch(error => {
        //     setError(error.message);
        //     setLoading(false);
        // });
        fetch('https://rentcar-seven.vercel.app/watchlist')
            .then(res => res.json())
            .then(data => {
                setTemp(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className='flex justify-center items-center h-screen'>
        <span className="loading loading-bars loading-lg"></span>
    </div>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }




    const temp = tempbokking.filter(data => data.addedUser === user?.email);

    const handleCancelClick = (booking) => {
        setSelectedBooking(booking);
        setShowCancelModal(true);
    };

    const handleModifyClick = (booking) => {
        setSelectedBooking(booking);
        setShowModifyModal(true);
    };

    const handleConfirmCancel = (data) => {
        fetch(`https://rentcar-seven.vercel.app/deletewatch/${data._id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setTemp((prevBookings) =>
                    prevBookings.filter((booking) => booking._id !== data._id)
                );
                setShowCancelModal(false);
            })
            .catch((error) => {
                console.error(error);
            });
        
    };

    const handleConfirmModify = (newDate) => {
        setTemp((prevBookings) =>
            prevBookings.map((booking) =>
                booking._id === selectedBooking._id
                    ? { ...booking, dateAdded: newDate }
                    : booking
            )
        );
        setShowModifyModal(false);
    };

    return (
        <div className="p-6 pt-24">
            <div className="overflow-x-auto mb-40">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-300 text-zinc-800">
                            <th className="p-2 text-left font-bold">Car Image</th>
                            <th className="p-2 text-left font-bold">Car Model</th>
                            <th className="p-2 text-left font-bold">Booking Date</th>
                            <th className="p-2 text-left font-bold">Total Price</th>
                            <th className="p-2 text-left font-bold">Booking Status</th>
                            <th className="p-2 text-left font-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {temp.map((booking) => (
                            <tr
                                key={booking._id}
                                className="border-b hover:bg-gray-500"
                            >
                                <td className="p-2">
                                    <img
                                        src={booking.imageUrl}
                                        alt={booking.carModel}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td className="p-2">{booking.carModel}</td>
                                <td className="p-2">{booking.dateAdded}</td>
                                <td className="p-2">${booking.dailyRentalPrice}</td>
                                <td
                                    className={`p-2 ${
                                        booking.bookingStatus === "Confirmed"
                                            ? "text-green-500"
                                            : booking.bookingStatus === "Pending"
                                            ? "text-yellow-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {booking.bookingStatus}
                                </td>
                                <td className="p-2 flex gap-2">
                                    <button
                                        onClick={() => handleCancelClick(booking)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        <FaTrash className="inline-block mr-1" />
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleModifyClick(booking)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        <FaCalendarAlt className="inline-block mr-1" />
                                        Modify Date
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modify Date Modal */}
            {showModifyModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-black">Modify Booking Date</h2>
                        <input
                            type="datetime-local"
                            className="border p-2 w-full mb-4"
                            onChange={(e) =>
                                setSelectedBooking({
                                    ...selectedBooking,
                                    bookingDate: e.target.value,
                                })
                            }
                            value={selectedBooking?.bookingDate}
                        />
                        <div className="mt-4 flex gap-4 justify-end">
                            <button
                                onClick={() => setShowModifyModal(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() =>
                                    handleConfirmModify(selectedBooking?.bookingDate)
                                }
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cancel Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-black">
                            Are you sure you want to cancel this booking?
                        </h2>
                        <div className="mt-4 flex gap-4 justify-end">
                            <button
                                onClick={() => handleConfirmCancel(selectedBooking)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Yes, cancel
                            </button>
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                No, keep
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Chat tempBooking={temp}></Chat>
        </div>
    );
};

export default Mybooking;
