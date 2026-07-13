import { Link, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/logo1.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { LuShoppingCart } from "react-icons/lu";
import { useCallback, useEffect, useState } from "react";
import { apiconnector } from "../../service/apiconnector";
import { categories } from "../../service/apis";
import {BsChevronDown} from "react-icons/bs";

import Profiledown from "./Profiledown";

function Navbar(){

    const [sublinks,setsublinks] = useState([]);
    const [loading,setLoading]  = useState(false);
   
    const getsublinks = useCallback(async () => {
        setLoading(true);
        try {
            const result = await  apiconnector("get",categories.CATEGORIES_API);
            setsublinks(result.data.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }, []);

    useEffect(()=>{
       getsublinks();
    },[getsublinks]);

    const location = useLocation();

        const matchRoute = (route)=>{
            return matchPath({path:route},location.pathname);
        }

        
        const {token} = useSelector((state)=>state.auth);
        const {user} = useSelector((state)=>state.profile);
       // console.log("user in navbar",user);
        const {totalItems}  = useSelector((state)=>state.cart);

        
        

    return(
        <div className="h-12 flex items-center w-full border-b border-richblack-500">
            <div className="w-10/12 flex justify-between mx-auto items-center ">
                <div>
                <Link to="/">
                <img src={logo} height={42} width={160} alt="StudyNotion" />
                </Link>
                   
                </div>
                <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-500">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] 
                      translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 
                      opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em]
                       group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : sublinks.length ? (
                          <>
                            {sublinks
                              .map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink._id}`}
                                  className="rounded-lg bg-transparent py-2 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p className="text-black">{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
                <div className="flex items-center">
                    {
                        user && user.accountType!=="Instructor" && (
                            <Link to="/dashboard/cart">
                            <div className="relative mr-2">
                            <LuShoppingCart className="text-white text-xl mr-4"></LuShoppingCart>
                            {
                                totalItems>0 && (<p className="text-white absolute -top-2 right-0
                                bg-richblack-700 aspect-square p-[2px] rounded-full">{totalItems}</p>)
                            }
                            </div>
                             
                             </Link>
                        )
                    }
                    {
                        token===null && (
                            <Link to="/login">
                                <button className="text-white px-3 py-1 rounded-md border border-richblack-400">Login</button>
                            </Link>
                        )
                    }
                    {
                        token===null && (
                            <Link to="/signup">
                                <button className="text-white px-3 py-1 mx-3  rounded-md border border-richblack-400">Signup</button>
                            </Link>
                        )
                    }
                    {
                        token!==null && (
                            <Profiledown></Profiledown>
                            
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;
