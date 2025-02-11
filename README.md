# RideFlow 🚗🚀

RideFlow is an advanced vehicle rental platform designed for ease of use and enhanced functionality. This project leverages modern web technologies to provide a seamless car rental experience. From secure authentication to data visualization, RideFlow is a complete solution for renting vehicles with style and performance.

---

## 🔥 Key Features

### 🚀 Seamless User Experience
- **JWT Authentication**: Secure and efficient user login and session handling using JSON Web Tokens (JWT).
- **Firebase Integration**: Streamlined user authentication and data storage.

### 📊 Data Insights
- **Interactive Charts**: Dynamic data visualization powered by `chart.js` and `react-chartjs-2`. View daily rental prices and other insights effortlessly.

### 🌟 Stunning Design
- **Responsive UI**: Built with Tailwind CSS and DaisyUI for a modern and mobile-friendly design.
- **Interactive Alerts**: Elegant notifications using SweetAlert2.

### 🛠️ Comprehensive Functionality
- **Role-Based Access**: Different features for admin and customers.
- **Real-Time Updates**: React-powered UI for instant updates and smooth user interaction.
- **Routing Made Easy**: React Router ensures seamless navigation across pages.

### 🔒 Security Features
- JWT-based token storage for secure and scalable authentication.
- Integration of Firebase for real-time data and secure backend handling.

---

## 📖 Long Description

RideFlow is your ultimate destination for renting vehicles hassle-free. With a sleek interface and robust backend powered by JWT and Firebase, RideFlow redefines car rentals by combining ease, security, and performance. 

Whether you're a user looking for affordable daily rentals or an admin managing bookings, RideFlow has everything you need. Users can visualize daily rental prices using engaging charts, ensuring informed decisions. The platform is fully responsive and mobile-ready, making it accessible from anywhere.

RideFlow is not just a rental platform—it's a complete ecosystem tailored to simplify and enhance the vehicle rental process.

---

## 🛠️ Technologies Used

### Frontend
- **React.js**: Dynamic and fast UI.
- **Tailwind CSS**: Modern, utility-first styling framework.
- **React Router**: Smooth navigation and routing between pages.
- **React Icons**: Adds stylish icons for a better user experience.

### Backend & Authentication
- **JWT (JSON Web Tokens)**: Secure user authentication and session management.
- **Firebase**: Real-time backend for authentication and data handling.

### Visualization
- **Chart.js & React-Chartjs-2**: Powerful libraries for data visualization.

### Alerts and Feedback
- **SweetAlert2**: Customizable popups for notifications and alerts.

---

## 📊 Data Visualization with Charts

RideFlow includes advanced data visualization features:
- Displays **Daily Rental Prices** for booked cars.
- Dynamic bar charts created with `chart.js` to help users make informed decisions.
- Real-time updates ensure the charts always reflect the latest booking data.

---

## 📦 Dependencies

Here is the list of all major dependencies used in the project:

| Dependency           | Version  | Purpose                                   |
|----------------------|----------|-------------------------------------------|
| `react`              | ^18.3.1 | Core library for building UI              |
| `chart.js`           | ^4.4.7  | For creating interactive charts           |
| `react-chartjs-2`    | ^5.3.0  | Chart.js wrapper for React                |
| `firebase`           | ^11.1.0 | Authentication and real-time database     |
| `react-router-dom`   | ^7.1.0  | Navigation and routing                    |
| `sweetalert2`        | ^11.15.3| For user-friendly alert popups            |
| `axios`              | ^1.7.9  | HTTP client for API requests              |
| `motion`             | ^11.15.0| Adds animations to the UI                 |
| `tailwindcss`        | ^3.4.17 | For responsive and utility-first styling  |

---

## 🚀 Cool Features

- **JWT Integration**: Secure login and session storage using JWT.
- **Firebase Authentication**: Fast and secure user onboarding.
- **Role-Based Access**: Separate access controls for admin and users.
- **Interactive Visualizations**: Display car rental prices with beautiful charts.
- **Elegant UI Design**: Fully responsive and built for all screen sizes.
- **Real-Time Data**: Firebase ensures instant data sync and real-time updates.

---

## 📝 Usage Instructions

1. **Login/Signup**: Users can log in securely using their credentials. JWT ensures token-based session handling.
2. **Browse Cars**: View a catalog of available vehicles.
3. **Data Visualization**: Check daily rental prices using engaging bar charts.
4. **Book a Car**: Rent your desired car in a few clicks.
5. **Admin Features**: Admins can manage bookings and monitor data in real time.

---

## 📂 Folder Structure

```plaintext
RideFlow/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable React components
│   ├── pages/         # Pages like Login, Dashboard, Booking
│   ├── context/       # AuthContext and global states
│   ├── firebase.js    # Firebase configuration
│   ├── App.jsx        # Main App component
│   ├── main.jsx       # React entry point
│   └── styles/        # Custom styles and Tailwind config
├── .env               # Environment variables for Firebase and JWT
├── package.json       # Project metadata and dependencies
├── README.md          # Project documentation
└── LICENSE            # License file (if any)
