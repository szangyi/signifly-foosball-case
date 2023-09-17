import { Outlet } from "react-router-dom";
import Nav from "../Nav/Nav";
import AdminModal from "../Admin/AdminLoginModal";


function RootLayoutNav() {
    return (
        <>
            <Nav />
            <Outlet />
            <AdminModal />
        </>
    )
}

export default RootLayoutNav