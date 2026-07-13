import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { NavLink, matchPath, useLocation, useNavigate } from "react-router-dom";

function Sidebarlinks({element,iconname}){

    const Icon = Icons[iconname];
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

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