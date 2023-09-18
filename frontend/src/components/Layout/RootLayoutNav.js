import React, {useState} from "react";
import { Outlet } from "react-router-dom";
import Nav from "../Nav/Nav";
import AdminModal from "../Admin/AdminLoginModal";
import AuthContext from "../../util/auth-context";


function RootLayoutNav() {

    const [isAdminLoggedin, setIsAdminLoggedin] = useState(false)
    
    console.log(`isadminloggedin:` + isAdminLoggedin)

    return (
        <>
            <AuthContext.Provider value={{isAdminLoggedin: isAdminLoggedin,}}>
                <Nav />
                <Outlet />
                <AdminModal setIsAdminLoggedin={setIsAdminLoggedin}/>
            </AuthContext.Provider>
        </>
    )
}

export default RootLayoutNav