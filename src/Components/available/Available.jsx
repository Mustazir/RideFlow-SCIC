import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { Link } from "react-router-dom";
import Button from "../Shared/Button";

const Available = () => {
  const { datas, dataloading } = useContext(AuthContext);
  const cars = datas;

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("dateNewest");

  if (dataloading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  const filteredCars = cars.filter((car) => {
    const model = car.carModel || "";
    return model.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortOption === "dateNewest")
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    if (sortOption === "dateOldest")
      return new Date(a.dateAdded) - new Date(b.dateAdded);
    if (sortOption === "priceLowest")
      return a.dailyRentalPrice - b.dailyRentalPrice;
    if (sortOption === "priceHighest")
      return b.dailyRentalPrice - a.dailyRentalPrice;
    return 0;
  });

  return (
    <div className="  dark:text-white  dark:bg-black py-7">
      <div className="available-cars max-w-screen-2xl mx-auto pt-24  dark:text-white  dark:bg-black ">
        <div className="controls flex md:flex-row flex-col justify-between items-center mb-20">
          <input
            type="text"
            placeholder="Search by car model"
            className="p-2 border rounded dark:text-white  dark:bg-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex items-center gap-4">
            <select
              className="p-2 border rounded dark:text-white  dark:bg-black"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="dateNewest">Date Added: Newest First</option>
              <option value="dateOldest">Date Added: Oldest First</option>
              <option value="priceLowest">Price: Lowest First</option>
              <option value="priceHighest">Price: Highest First</option>
            </select>
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="p-2 border rounded"
            >
              Toggle View: {viewMode === "grid" ? "List" : "Grid"}
            </button>
          </div>
        </div>

        <div
          className={
            viewMode === "grid"
              ? "grid md:grid-cols-3 gap-4"
              : "list-view flex flex-col gap-4"
          }
        >
          {sortedCars.map((car) => (
            <div
              key={car._id}
              className={`car-card ${
                viewMode === "grid" ? "" : "max-w-screen-xl w-full mx-auto"
              } border rounded p-4 shadow hover:shadow-lg transition`}
            >
              <img
                src={car.imageUrl}
                alt={car.carModel}
                className={`w-full ${
                  viewMode === "grid" ? "" : "h-96"
                } h-48  object-cover rounded object-center`}
              />
              <h3 className="text-xl font-bold mt-2">{car.carModel}</h3>
              <p className="text-gray-500 dark:text-white ">
                {car.vehicleRegistrationNumber}
              </p>
              <p className="text-gray-600 dark:text-white">
                Location: {car.location}
              </p>
              <p className="text-gray-600 dark:text-white">
                Price: ${car.dailyRentalPrice}/day
              </p>
              <p className="text-gray-600 dark:text-white">
                Booking Count: {car.bookingCount}
              </p>
              <p className="text-gray-500 text-sm dark:text-white">
                Added: {car.dateAdded}
              </p>
              <button className="mt-4">
                <Link to={`/car/${car._id}`}>
                  <Button text={"Book Now"}></Button>
                </Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Available;
