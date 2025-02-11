import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from '../../assets/New folder/icons8-hatchback-100.png'
const Footer = () => {
    return (
        <footer className="border-t-2 text-gray-500 py-16 mt-20">
            <div className="max-w-screen-2xl mx-auto px-4">
                
                <div className="flex flex-wrap justify-between items-start gap-8 mb-16">
                    <div className="w-full md:w-1/3">
                        <div className="flex items-center space-x-3 mb-4">
                            <img
                                src={logo}
                                alt="RideFlow"
                                className="w-12 h-12"
                            />
                            <span className="text-xl font-bold text-black">
                            RideFlow
                            </span>
                        </div>
                        <p className="text-gray-400">
                        RideFlow offers a seamless car rental experience, providing a wide range of vehicles to meet your needs.
                        </p>
                    </div>

                    <div className="w-full md:w-1/4">
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>About Us</li>
                            <li>Services</li>
                            <li>Pricing</li>
                            <li> Contact Us</li>
                        </ul>
                    </div>

                    <div className="w-full md:w-1/4">
                        <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                        <p className="text-gray-400">
                            Savar, Dhaka, Bangladesh
                        </p>
                        <p className="text-gray-400">Phone: +985639481</p>
                        <p className="text-gray-400">Email: RideFlow@gmail.com</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
                    <div className="text-sm">
                        © {new Date().getFullYear()} RideFlow. All rights reserved.
                    </div>

                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white"
                        >
                            <FaFacebook size={20} />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white"
                        >
                            <FaTwitter size={20} />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white"
                        >
                            <FaInstagram size={20} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white"
                        >
                            <FaLinkedin size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


// 