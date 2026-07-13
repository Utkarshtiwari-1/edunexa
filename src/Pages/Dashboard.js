import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Sidebar from "../Components/dashborad/Sidebar";

function Dashboard(){

    const{loading:authloading} = useSelector((state)=>state.auth);
    const{loading:profileloading} = useSelector((state)=>state.profile);

    if(profileloading || authloading)
    {
        return(
            <div className="spinner"></div>
        )
    }

    return(
        <div className="relative flex min-h-[calc(100vh-3rem)]">
            <Sidebar></Sidebar>
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;