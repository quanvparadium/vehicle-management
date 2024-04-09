
import HomePage from '../pages/Home/home'
import LoginPage from '../pages/Login/login'
import VehiclePage from '../pages/Vehicle/vehicle'
import DriverPage from '../pages/Driver/driver';
import TripPage from '../pages/Trip/trip'


//không cần đăng nhập vẫn xem được
const publicRoutes = [
    {path:"/", component: HomePage},
    {path:"/login", component: LoginPage},
    {path:"/vehicle", component: VehiclePage},
    {path:"/driver", component: DriverPage},
    {path:"/trip", component: TripPage}
]

//phải đăng nhập
const privateRoutes = [
]

export {publicRoutes, privateRoutes} 