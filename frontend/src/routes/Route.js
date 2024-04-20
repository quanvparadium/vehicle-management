import HomePage from "../pages/Home/home";
import LoginPage from "../pages/Login/login";
import VehiclePage from "../pages/Vehicle/vehicle";
import DriverPage from "../pages/Driver/driver";
import TripPage from "../pages/Trip/trip";

//không cần đăng nhập vẫn xem được
const publicRoutes = [{ path: "/", component: LoginPage }];

//phải đăng nhập
const privateRoutes = [
    { path: "/home", component: HomePage },
    { path: "/vehicle", component: VehiclePage },
    { path: "/driver", component: DriverPage },
    { path: "/trip", component: TripPage },
];

export { publicRoutes, privateRoutes };
