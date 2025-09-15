import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../tuSanatorio-front/src/rutas/RuteoApp";

export default function Layout() {
  const location = useLocation();
  const hiddenRoutes = ["/", "/login", "/registro"];

  return (
    <>
      {!hiddenRoutes.includes(location.pathname) && <Navbar />}
      <Outlet />
    </>
  );
}
