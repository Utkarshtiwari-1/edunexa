import * as Icons from "react-icons/vsc";
import { NavLink, matchPath, useLocation } from "react-router-dom";

function Sidebarlinks({element,iconname}){

    const Icon = Icons[iconname];
    const location = useLocation();

    function MatchRoute(route){
        return matchPath({path:route},location.pathname);
    }

    return(
        <div>
            <NavLink to={element.path} 
            className={`${MatchRoute(element.path)?"text-black":"text-white"}
            text-sm font-medium `}>
                <div className={`${MatchRoute(element.path)?" bg-brown-100":"text-white"} flex flex-row
                 items-center gap-2 px-8 py-2`}>
                    <Icon className="text-lg"></Icon>
                    <span>{element.name}</span>
                </div>
            </NavLink>
        </div>
    )

}

export default Sidebarlinks;