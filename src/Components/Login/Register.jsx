import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { updateProfile } from 'firebase/auth';
import { AuthContext } from '../AuthProvider';
import { auth } from '../Firebase.config';
import axios from 'axios';
const Register = () => {
    const { handelSignup } = useContext(AuthContext)
    const navg = useNavigate()
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    const handelRegister = e => {
        e.preventDefault();
        const username = e.target.username.value
        const email = e.target.email.value
        const url = e.target.url.value
        const password = e.target.password.value
        console.log(username, email, url, password)
        if (username === '' || email === '' || url === '' || password === '') {
            Toast.fire({
                icon: "error",
                title: 'All fields must be filled out.'
            });
            return
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            Toast.fire({
                icon: "error",
                title: ' Must be One UpperCase , One LowerCase & 6 Chareacter'
            });
        } else {
            handelSignup(email, password)
                .then(user => {
                    updateProfile(auth.currentUser, {
                        displayName: username, photoURL: url
                    })
                        .then(() => {

                            Toast.fire({
                                icon: "success",
                                title: `WelCome ${auth.currentUser.displayName} `
                            });
                            // const user = { email: auth.currentUser.email }
                            // console.log(user)
                            // axios.post('https://rentcar-seven.vercel.app/jwt', user, { withCredentials: true })
                            //     .then(data => {
                            //         console.log(data.data)
                            //     })
                            
                            navg('/')
                        }).catch((erro) => {
                            console.log(erro)
                        });

                })
                .catch(error => {
                    Toast.fire({
                        icon: "error",
                        title: error
                    });
                })
        }
    }
    return (
        <div
            className="h-[calc(100vh-64px)] flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: "url('/b-1.jpg')",
            }}
        >
            <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-md  p-8 shadow-lg">
                <div className="text-center mb-6">

                    <h2 className="text-3xl font-title text-gray-800 font-semibold">
                        Register
                    </h2>
                </div>
                <form onSubmit={handelRegister}>

                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-sm text-gray-800 mb-2"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            className="w-full px-4 py-2  bg-gray-400 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>


                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm text-gray-800 mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2  bg-gray-400 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>


                    <div className="mb-4">
                        <label
                            htmlFor="photoURL"
                            className="block text-sm text-gray-800 mb-2"
                        >
                            Photo URL
                        </label>
                        <input
                            type="text"
                            name="url"
                            placeholder="Enter your photo URL"
                            className="w-full px-4 py-2  bg-gray-400 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>


                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm text-gray-800 mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2  bg-gray-400 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>


                    <button
                        type="submit"
                        className="w-full py-2 bg-primary hover:bg-opacity-80 text-white  font-semibold transition duration-300"
                    >
                        Submit
                    </button>
                </form>
                <p className="text-center text-gray-500 mt-6 text-sm">
                    Already have a Account <Link to={'/login'} className='hover:text-primary duration-200 underline pl-1'>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;