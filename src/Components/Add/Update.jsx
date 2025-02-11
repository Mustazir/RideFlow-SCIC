import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider";

const Update = () => {
    const { user, datas, dataloading } = useContext(AuthContext);
    const { pathname } = useLocation();
    const id = pathname.replace('/update/', '');
    const navigate = useNavigate();

  
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (!dataloading && datas) {
            const data = datas.find((data) => data._id === id);
            if (data) {
                setFormData({
                    ...data,
                    features: Array.isArray(data.features) ? data.features.join(', ') : data.features || '',
                });
            }
            setLoading(false);
        }
    }, [dataloading, datas, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedData = {
            ...formData,
            features: formData.features.split(',').map((f) => f.trim()), // Convert string to array
            userDetails: {
                ...formData.userDetails,
                email: user.email,
                name: user.displayName,
                userId: user.uid,
            },
        };

        fetch(`https://rentcar-seven.vercel.app/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.modifiedCount > 0) {
                    Swal.fire("Success!", "Car updated successfully!", "success");
                    navigate("/mycars");
                } else {
                    Swal.fire("Error", "Failed to update car.", "error");
                }
            })
            .catch((error) => {
                Swal.fire("Error", "Something went wrong.", "error");
                console.error("Error updating car:", error);
            });
    };

    if (loading || !formData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader"></div>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div style={{ backgroundImage: "url('/moto-bg.jpg')" }} className="flex flex-col items-center p-8 pt-24">
            <h1 className="text-3xl font-bold text-center mb-6">Update {formData.carModel}</h1>
            <div className="w-full max-w-2xl bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Car Model:</label>
                        <input
                            type="text"
                            name="carModel"
                            value={formData.carModel}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Vehicle Registration Number:</label>
                        <input
                            type="text"
                            name="vehicleRegistrationNumber"
                            value={formData.vehicleRegistrationNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Daily Rental Price ($):</label>
                        <input
                            type="number"
                            name="dailyRentalPrice"
                            value={formData.dailyRentalPrice}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Features (comma-separated):</label>
                        <input
                            type="text"
                            name="features"
                            value={formData.features}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Image URL:</label>
                        <input
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="mt-4 border-2 border-primary hover:bg-transparent px-5 py-3 bg-primary duration-200 w-full"
                        >
                            Update Car
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Update;
