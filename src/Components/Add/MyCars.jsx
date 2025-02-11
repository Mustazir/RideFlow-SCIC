import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import Button from "../Shared/Button";
import axios from "axios";

const MyCars = () => {
    const [datas, setDatas] = useState([]);
    const [dataloading, setDataloading] = useState(true);
    const { user, loading } = useContext(AuthContext);
    const [myData, setMyData] = useState([]);
    const [fetchError, setFetchError] = useState(false);
    const [sortOption, setSortOption] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.email) return;
        // axios.get('https://rentcar-seven.vercel.app/watchlist', { withCredentials: true })
        //     .then(res => {
        //         const data = res.data
        //         setDatas(data);
        //         const filteredData = data.filter((car) => car.userDetails.email === user.email);
        //         setMyData(filteredData);
        //         setDataloading(false);
        //     })
        //     .catch(() => {
        //         setFetchError(true);
        //         setDataloading(false);
        //     });
        fetch("https://rentcar-seven.vercel.app/allcars")
            .then((res) => res.json())
            .then((data) => {
                setDatas(data);
                const filteredData = data.filter((car) => car.userDetails.email === user.email);
                setMyData(filteredData);
                setDataloading(false);
            })
            .catch(() => {
                setFetchError(true);
                setDataloading(false);
            });
    }, [user]);

    if (loading || dataloading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    if (fetchError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-3xl font-bold">Failed to load data. Please try again later.</h1>
            </div>
        );
    }

    if (myData.length === 0) {
        return (
            <div className="h-[calc(100vh-64px)] font-title flex-col flex justify-center items-center">
                <h1 className="text-4xl">You Didn't Add Any Cars</h1>
                <h1 className="text-lg text-zinc-500 mt-9 mb-9">
                    - Please go to Add Cars page and add your Car -
                </h1>
                <Link to={"/addcar"}>
                    <Button text={"Add Cars"}></Button>
                </Link>
            </div>
        );
    }


    const handleSort = (option) => {
        setSortOption(option);
        let sortedData = [...myData];
        if (option === "date-newest") {
            sortedData.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        } else if (option === "date-oldest") {
            sortedData.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
        } else if (option === "price-lowest") {
            sortedData.sort((a, b) => a.dailyRentalPrice - b.dailyRentalPrice);
        } else if (option === "price-highest") {
            sortedData.sort((a, b) => b.dailyRentalPrice - a.dailyRentalPrice);
        }
        setMyData(sortedData);
    };

    const handleDelete = (data) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://rentcar-seven.vercel.app/car/${data._id}`, { method: "DELETE" })
                    .then((res) => res.json())
                    .then(() => {
                        const updatedData = myData.filter((item) => item._id !== data._id);
                        setMyData(updatedData);
                        Swal.fire("Deleted!", "Your car has been deleted.", "success");
                    });
            }
        });
    };

    return (
        <div className="min-h-screen px-[10vw] text-black p-8 pt-24">

            <div className="mb-8 flex justify-end">
                <select
                    value={sortOption}
                    onChange={(e) => handleSort(e.target.value)}
                    className="px-4 py-2 border rounded"
                >
                    <option value="">Sort By</option>
                    <option value="date-newest">Date Added (Newest First)</option>
                    <option value="date-oldest">Date Added (Oldest First)</option>
                    <option value="price-lowest">Price (Lowest First)</option>
                    <option value="price-highest">Price (Highest First)</option>
                </select>
            </div>

            {myData.map((data) => (
                <div
                    key={data._id}
                    className="mx-auto border-t p-5 gap-9 pb-9 border-white flex flex-col xl:flex-row items-start space-y-10"
                >
                    <div className="w-full lg:min-w-[700px] flex-1">
                        <img
                            src={data.imageUrl}
                            alt={data.carModel}
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="w-full flex-1 space-y-4">
                        <h1 className="text-3xl font-bold">{data.carModel}</h1>
                        <p className="text-gray-400 text-sm">
                            Added by: {data.userDetails.email}
                        </p>
                        <p>{data.description}</p>
                        <p>
                            <strong>Daily Rental Price:</strong> ${data.dailyRentalPrice}
                        </p>
                        <p>
                            <strong>Location:</strong> {data.location}
                        </p>

                        {data.availability && (
                            <div className="mt-2 px-3 py-1 bg-green-500 text-black rounded">
                                ✅ Available
                            </div>
                        )}
                        <div className="gap-5 flex">
                            <button
                                onClick={() => handleDelete(data)}
                                className="mt-4 border-2 border-primary hover:bg-transparent w-40 px-5 py-3 bg-primary duration-200"
                            >
                                Delete
                            </button>
                            <Link to={`/update/${data._id}`}>
                                <button className="mt-4 border-2 border-primary px-5 py-3 w-40 hover:bg-primary duration-200">
                                    Update
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};


export default MyCars;
