import React from 'react';
import { Link } from 'react-router-dom';

const Cars = ({ cars }) => {

  return (
    <div className="px-4 py-8 my-7 ">
      <h2 className="text-4xl font-bold mb-8  text-center">Recent Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-2xl mx-auto">
        {cars.slice(0, 6).map((car) => (
          <div
            key={car.vehicleRegistrationNumber}
            className="border   hover:shadow-lg hover:scale-105 transform transition duration-300 overflow-hidden"
          >
            <img
              src={car.imageUrl}
              alt={car.carModel}
              className="h-52 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{car.carModel}</h3>
              <p className="text-sm text-gray-500">
                Added {car.dateAdded}
              </p>
              <div className="mt-3">
                <p className="font-medium">Price: ${car.dailyRentalPrice}/day</p>
                <p
                  className={`font-medium ${car.availability ? "text-green-500" : "text-red-500"
                    }`}
                >
                  {car.availability ? "Available" : "Unavailable"}
                </p>
                <p className="text-gray-600">Bookings: {car.bookingCount}</p>
              </div>
              <Link to={`/car/${car._id}`}
                className="mt-4 w-full bg-primary text-white p-2 transition"
                disabled={!car.availability}
              >
                {car.availability ? "Book Now" : "Unavailable"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;