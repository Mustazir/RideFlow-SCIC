import  { useState, useContext } from "react";
import { AuthContext } from "../AuthProvider";
import Swal from "sweetalert2";

const AddCar = () => {
    const { user } = useContext(AuthContext);
   
    
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
    const defaultUser = {
        userId: user?.uid || "defaultUserId",
        name: user?.displayName || "Default User",
        email: user?.email || "default@example.com",
    };

    const [car, setCar] = useState({
        carModel: "",
        dailyRentalPrice: "",
        availability: true,
        vehicleRegistrationNumber: "",
        features: "",
        description: "",
        bookingCount: 0,
        imageUrl: "",
        location: "",
        userDetails: {
            userId: user?.uid || "defaultUserId",
            name: user?.displayName || "Default User",
            email: user.email || "default@example.com",
        }, 
        dateAdded: new Date().toISOString(),
        bookingStatus: "available",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar((prev) => ({
            ...prev,
            [name]: name === "availability" ? value === "true" : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("https://rentcar-seven.vercel.app/addcars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(car),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Car added:", data);
                Toast.fire({
                    icon: "success",
                    title: "Car added successfully!"
                  });
                
                setCar({
                    carModel: "",
                    dailyRentalPrice: "",
                    availability: true,
                    vehicleRegistrationNumber: "",
                    features: "",
                    description: "",
                    bookingCount: 0,
                    imageUrl: "",
                    location: "",
                    userDetails: defaultUser,
                    dateAdded: new Date().toISOString(),
                    bookingStatus: "available",
                });
            })
            .catch((err) => {
                console.error("Error adding car:", err);
                alert("Failed to add car.");
            });
    };

    return (
        <div className="md:px-28 px-4 rounded-lg pt-24 shadow-md max-w-screen-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add Car</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-bold">Car Model</label>
                    <input
                        type="text"
                        name="carModel"
                        value={car.carModel}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-bold">Daily Rental Price</label>
                    <input
                        type="number"
                        name="dailyRentalPrice"
                        value={car.dailyRentalPrice}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-bold">Availability</label>
                    <select
                        name="availability"
                        value={car.availability}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="true">Available</option>
                        <option value="false">Not Available</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-bold">Vehicle Registration Number</label>
                    <input
                        type="text"
                        name="vehicleRegistrationNumber"
                        value={car.vehicleRegistrationNumber}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-bold">Features</label>
                    <input
                        type="text"
                        name="features"
                        value={car.features}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Separate features with commas"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-bold">Description</label>
                    <textarea
                        name="description"
                        value={car.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    ></textarea>
                </div>
                <div>
                    <label className="block mb-1 font-bold">Image URL</label>
                    <input
                        type="url"
                        name="imageUrl"
                        value={car.imageUrl}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-bold">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={car.location}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded "
                    >
                        Add Car
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCar;
