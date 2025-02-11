import React, { useState } from "react";
import { FaCar, FaOilCan, FaWrench, FaBatteryFull, FaTachometerAlt } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion

const CarMaintenanceTips = () => {
  const [activeCategory, setActiveCategory] = useState("Engine Maintenance"); // Set default category

  const categories = [
    { id: 1, name: "Engine Maintenance" },
    { id: 2, name: "Tire Care" },
    { id: 3, name: "Brake Maintenance" },
    { id: 4, name: "Battery Care" },
  ];

  const tips = {
    "Engine Maintenance": [
      "Check oil levels regularly to avoid engine damage.",
      "Replace air filters every 6 months for optimal air intake.",
      "Ensure the timing belt is in good condition to avoid engine failure.",
      "Inspect the radiator for leaks or corrosion to prevent overheating.",
      "Check spark plugs for wear to maintain efficient combustion.",
      "Clean the engine bay to remove dirt and debris.",
      "Use high-quality fuel for better engine performance.",
      "Monitor engine noise for any unusual sounds and address them promptly.",
    ],
    "Tire Care": [
      "Maintain proper tire pressure for better fuel efficiency.",
      "Rotate tires every 6,000 miles for even wear.",
      "Inspect tires for cracks, punctures, or bulges regularly.",
      "Check the tread depth to ensure safety during wet conditions.",
      "Ensure tires are balanced and aligned for smooth driving.",
      "Avoid overloading your car to prevent excessive tire wear.",
      "Replace tires that are over 6 years old, even if they appear fine.",
      "Keep your tires clean to prevent rubber degradation.",
    ],
    "Brake Maintenance": [
      "Check brake pads regularly to ensure proper braking.",
      "Inspect brake fluid levels and replace if dirty.",
      "Replace worn brake discs to maintain braking efficiency.",
      "Check the brake lines for leaks or corrosion.",
      "Test emergency brakes to ensure they work correctly.",
      "Listen for squeaking noises, which may indicate worn brake pads.",
      "Flush brake fluid every 2 years for better braking performance.",
      "Inspect ABS (Anti-lock Braking System) for any error signals.",
    ],
    "Battery Care": [
      "Check battery terminals for corrosion and clean them if needed.",
      "Ensure proper voltage levels with a multimeter.",
      "Clean the battery surface regularly to prevent dirt buildup.",
      "Secure the battery tightly to avoid vibrations.",
      "Inspect for any cracks or leaks in the battery case.",
      "Recharge the battery if the voltage drops below 12.4 volts.",
      "Replace old batteries that are over 3-5 years old.",
      "Avoid draining the battery by turning off lights and electronics when not in use.",
    ],
  };

  return (
    <motion.div
      className="bg-neutral text-neutral-content my-7 flex flex-col items-center py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-4xl font-bold text-orange-400"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Car Maintenance Tips
      </motion.h1>
      <motion.p
        className="mt-2 text-sm"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Keep your car in top condition with these easy-to-follow tips
      </motion.p>

      {/* Maintenance Frequency Section */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          Oil Change <br />
          <span className="text-orange-400">Every 6 months</span>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          Tire Check <br />
          <span className="text-orange-400">Every 3 months</span>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          Brake Pads <br />
          <span className="text-orange-400">Every 10,000 miles</span>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          Air Filter <br />
          <span className="text-orange-400">Every 6 months</span>
        </div>
      </motion.div>

      {/* Maintenance Categories Section */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <h2 className="text-xl font-semibold mb-4">Maintenance Categories</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.name)}
              className={`px-4 py-2 rounded-lg ${
                activeCategory === category.name
                  ? "bg-orange-400 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Tips Section */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <h3 className="text-lg font-semibold">{activeCategory || "Select a Category"}</h3>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          {activeCategory &&
            tips[activeCategory].map((tip, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-4 rounded-lg shadow text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tip}
              </motion.div>
            ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CarMaintenanceTips;
