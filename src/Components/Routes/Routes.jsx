import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Roots from "../Roots/Roots";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Login/Register";
import Available from "../available/Available";
import Details from "../available/Details";
import Mybooking from "../available/Mybooking";
import AddCar from "../Add/AddCar";
import MyCars from "../Add/MyCars";
import Update from "../Add/Update";
import Errorpage from "../Errorpage";
import PrivateRoute from "./PrivateRoute";


const Routes = createBrowserRouter([
    {
        path:'/',
        element:<Roots></Roots>,
        errorElement:<Errorpage></Errorpage>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/availablecars',
                element:<Available></Available>
            },
            {
                path:'/car/:id',
                element:<PrivateRoute><Details></Details></PrivateRoute>
            },
            {
                path:'/mybooking',
                element:<PrivateRoute><Mybooking></Mybooking></PrivateRoute>
            },
            {
                path:'/addcar',
                element:<PrivateRoute><AddCar></AddCar></PrivateRoute>
            },
            {
                path:'/mycars',
                element:<PrivateRoute><MyCars></MyCars></PrivateRoute>
            },
            {
                path:'/update/:id',
                element:<PrivateRoute><Update></Update></PrivateRoute>
            }
        ]
    }
])

export default Routes;