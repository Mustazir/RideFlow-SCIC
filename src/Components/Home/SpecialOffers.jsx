import { motion } from "framer-motion";
import Swal from "sweetalert2";

const SpecialOffers = () => {
    const offers = [
        {
            title: "Get 15% off for weekend rentals!",
            description: "Enjoy exclusive discounts for your weekend getaways.",
            buttonText: "Book Now",
        },
        {
            title: "Luxury cars at $99/day this holiday season!",
            description: "Ride in style this holiday with unbeatable prices.",
            buttonText: "Learn More",
        },
    ];

    // Function to generate a 5-digit random code and copy to clipboard
    const handleCopyCode = () => {
        const randomCode = Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit number
        navigator.clipboard.writeText(randomCode.toString())
            .then(() => {
                Swal.fire({
                    title: "🎉 Congrats!",
                    text: `You get a special discount coupon. Coupon Code: ${randomCode}`,
                    icon: "success",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#ff9800",
                    timer: 4000,
                });
            })
            .catch(err => console.error("Failed to copy:", err));
    };

    return (
        <section className="my-7 text-gray-500 py-16">
            <div className="max-w-screen-2xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-black text-center mb-8">
                    Special Offers
                </h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {offers.map((offer, index) => (
                        <motion.div
                            key={index}
                            className="bg-orange-700 rounded-lg shadow-lg p-6 w-full md:w-96"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            whileHover={{
                                scale: 1.05,
                                transition: { type: "spring", stiffness: 300 },
                            }}
                        >
                            <h3 className="text-2xl font-semibold text-white mb-3">
                                {offer.title}
                            </h3>
                            <p className="text-gray-400 mb-4">{offer.description}</p>
                            <button
                                className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-600 transition"
                                onClick={handleCopyCode} // Attach function to button
                            >
                                {offer.buttonText}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SpecialOffers;
