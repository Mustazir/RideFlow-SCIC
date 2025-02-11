import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion

const ReviewSection = () => {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      review: "This car maintenance guide is incredibly helpful! I feel confident in taking care of my car now.",
      rating: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      review: "A must-read for every car owner. The tips on tire care were particularly useful for me.",
      rating: 4,
    },
    {
      id: 3,
      name: "Mark Johnson",
      review: "I appreciate the detailed information about brake maintenance. Highly recommend this guide!",
      rating: 5,
    },
    {
      id: 4,
      name: "Emily Davis",
      review: "Great resource! I never knew how important it was to clean my engine regularly. Thanks for the tips!",
      rating: 4,
    },
  ];

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 2000); // Changed to 2 seconds for faster transition

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [reviews.length]);

  const getNextIndex = (index) => {
    return (index + 1) % reviews.length;
  };

  return (
    <motion.div
      className=" text-white my-7 flex flex-col items-center py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        className="text-3xl font-bold text-black"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        User Reviews
      </motion.h2>
      <motion.p
        className="mt-2 text-sm text-black"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        See what our users are saying about the car maintenance tips!
      </motion.p>

      {/* Review Slider with Fade Transition */}
      <motion.div
        className="flex justify-center gap-6 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        {reviews.slice(currentReviewIndex, getNextIndex(currentReviewIndex)).map((review) => (
          <motion.div
            key={review.id}
            className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center w-80"
            initial={{ opacity: 0 }} // Start with 0 opacity (fade out)
            animate={{
              opacity: 1, // Fade in
            }}
            exit={{ opacity: 0 }} // Fade out when leaving
            transition={{
              type: "tween",
              duration: 1, // Duration of the fade
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-xl font-semibold text-orange-400">{review.name}</div>
            <p className="mt-2 text-sm text-center">{review.review}</p>
            <div className="mt-4 text-yellow-400">
              {Array.from({ length: review.rating }, (_, index) => (
                <span key={index}>★</span>
              ))}
              {Array.from({ length: 5 - review.rating }, (_, index) => (
                <span key={index}>☆</span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ReviewSection;
