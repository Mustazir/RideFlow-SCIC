import { Link } from "react-router-dom";

const WhyChoseUs = () => {
    const features = [
        {
            title: "Wide Variety of Cars",
            description: "Experience a vast array of cars tailored to suit every need and budget luxurious rides.",
            icon: "/varity.jpg",
        },
        {
            title: "Affordable Prices",
            description: "Enjoy daily rental rates that are affordable and transparent, with no hidden fees.",
            icon: "/affordable.jpg",
        },
        {
            title: "Easy Booking Process",
            description: "Reserve your dream car in just a few clicks with our user-friendly booking platform.",
            icon: "/priscilla-du-preez-BjhUu6BpUZA-unsplash.jpg",
        },
        {
            title: "24/7 Customer Support",
            description: "Receive 24/7 support from our dedicated team, ready to assist with any  issues.",
            icon: "/seo-galaxy-GQ6bUqDNjZY-unsplash.jpg",
        },
    ];

    return (
        <section className="py-12 ">
            <div className="container mx-auto px-6 lg:px-20">
                <h2 className="text-4xl font-bold text-center text-primary-600 mb-8">
                    Why Choose Us?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="   "
                        >
                            <img src={feature.icon} alt={feature.title} className=" h-56 w-full object-cover" />
                            <div className="flex border-primary flex-col h-36 pt-5  border-b-[1px]  items-center">
                                <h3 className="text-2xl font-funnel  font-bold mb-2">{feature.title}</h3>
                                <p className=" text-gray-500 text-center">{feature.description}</p>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChoseUs;
