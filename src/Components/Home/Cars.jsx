import React from "react";
import { Link } from "react-router-dom";
import Button from "../Shared/Button";

const Cars = ({ cars }) => {
  return (
    <div className="px-4 py-8 my-7 dark:text-white dark:bg-gray-900 dark:border-white flex flex-col items-center gap-3">
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
              <p className="text-sm text-gray-500">Added {car.dateAdded}</p>
              <div className="mt-3">
                <p className="font-medium">
                  Price: ${car.dailyRentalPrice}/day
                </p>
                <p
                  className={`font-medium ${
                    car.availability ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {car.availability ? "Available" : "Unavailable"}
                </p>
                <h2 className=" font-medium pt-3">Description:</h2>
                <p className="text-gray-700 mb-4 dark:text-white">
                  {car.description}
                </p>
              </div>
              <Link
                to={`/car/${car._id}`}
                className=""
                disabled={!car.availability}
              >
                <Button
                  text={car.availability ? "Book Now" : "Unavailable"}
                ></Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Link to={"/availablecars"} className="mt-2">
        <Button text={"View Available Cars  →"}></Button>
      </Link>
    </div>
  );
};

export default Cars;
