import { Navigate, Outlet } from "react-router-dom"
import { isAuthenticated } from "./authenticate";

const PriavteRoute = () => {
    const auth = isAuthenticated();
    return auth?<Outlet/>:<Navigate to="/signin" replace={true} />
}

export default PriavteRoute;