import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import Swal from "sweetalert2";

const Details = () => {
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [car, setCar] = useState(null);
    const [error, setError] = useState(null);

    const { pathname } = useLocation();
    const id = pathname.replace("/car/", ""); 

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://rentcar-seven.vercel.app/car/${id}`); 
                if (!response.ok) {
                    throw new Error("Car not found");
                }
                const data = await response.json();

               
                data.features = Array.isArray(data.features) ? data.features : [];
                setCar(data);
            } catch (error) {
                setError(error.message); 
            } finally {
                setLoading(false); 
            }
        };

        fetchCarData();
    }, [id]);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>; 
    }

    if (!car) {
        return <div className="text-center">Car not found!</div>; 
    }

    const {
        carModel,
        dailyRentalPrice,
        availability,
        vehicleRegistrationNumber,
        features,
        imageUrl,
        description,
    } = car;

    const handleAddToWatchlist = (data) => {
        if (!user) {
            Toast.fire({
                icon: "error",
                title: "Please log in to add cars to your watchlist.",
            });
            return;
        }

        const updatedData = { ...data, addedUser: user.email };
        delete updatedData._id;

        fetch("https://rentcar-seven.vercel.app/watchlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        })
            .then((res) => res.json())
            .then(() => {
                Toast.fire({
                    icon: "success",
                    title: "Added to your watchlist.",
                });
            })
            .catch((error) => console.log(error));
    };

    const handleBookNow = () => {
        setShowModal(true); 
    };

    return (
        <div className="car-details max-w-4xl mx-auto p-6 pt-24 rounded">
            
            <img
                src={imageUrl}
                alt={carModel}
                className="w-full h-96 object-cover rounded mb-4"
            />

           
            <h1 className="text-2xl font-bold mb-2">{carModel}</h1>
            <p className="text-gray-600 text-lg mb-2">
                Price Per Day: <span className="font-bold">${dailyRentalPrice}</span>
            </p>
            <p
                className={`text-lg font-bold mb-2 ${
                    availability ? "text-green-500" : "text-red-500"
                }`}
            >
                {availability ? "Available" : "Unavailable"}
            </p>
            <p className="text-gray-600">
                Registration Number: {vehicleRegistrationNumber}
            </p>

            <h2 className="text-xl font-bold mt-4 mb-2">Features:</h2>
            {features && features.length > 0 ? (
                <ul className="list-disc list-inside mb-4">
                    {features.map((feature, index) => (
                        <li key={index} className="text-gray-700">
                            {feature}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No features available.</p>
            )}

            <h2 className="text-xl font-bold mt-4 mb-2">Description:</h2>
            <p className="text-gray-700 mb-4">{description}</p>

            
            <button
                onClick={handleBookNow}
                className="bg-primary text-white px-4 py-2 rounded 00"
            >
                Book Now
            </button>

           
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className=" bg-zinc-700 rounded-lg shadow-lg p-6 max-w-md">
                        <h2 className="text-xl font-bold mb-4">Confirm Your Booking</h2>
                        <p>
                            <strong>Model:</strong> {carModel}
                        </p>
                        <p>
                            <strong>Price Per Day:</strong> ${dailyRentalPrice}
                        </p>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                onClick={() => {
                                    setShowModal(false);
                                    handleAddToWatchlist(car);
                                }}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Details;
