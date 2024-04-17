
import HomePage from '../pages/Home/home'
import LoginPage from '../pages/Login/login'
import VehiclePage from '../pages/Vehicle/vehicle'
import DriverPage from '../pages/Driver/driver';
import TripPage from '../pages/Trip/trip'
import DefaultLayout from '../Layout/DefaultLayout';


//không cần đăng nhập vẫn xem được
const publicRoutes = [
    {path:"/", component: HomePage, DefaultLayout},
    {path:"/login", component: LoginPage, DefaultLayout},
    {path:"/vehicle", component: VehiclePage, DefaultLayout},
    {path:"/driver", component: DriverPage, DefaultLayout},
    {path:"/trip", component: TripPage, DefaultLayout}
]

//phải đăng nhập
const privateRoutes = [
]

export {publicRoutes, privateRoutes} 
