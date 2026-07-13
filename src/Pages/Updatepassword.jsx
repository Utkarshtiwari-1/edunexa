import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { resetpassword } from "../service/operations";

function Updatepassword(){

    const[formdata,setformdata] = useState({
        password:"",
        confirmpassword:"",
    });

    const location = useLocation();

    function changehandler(event){
        setformdata((prevdata)=>{
           return {
                ...prevdata,
                [event.target.name]:event.target.value,

            }

        })
    }

    const {loading} = useSelector((state)=>state.auth);
    const[passwordreset,setpasswordreset] = useState(false);
    
    const dispatch = useDispatch();
    const{password,confirmpassword} = formdata;
    function submithandler(event){
        event.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetpassword(password,confirmpassword,token,setpasswordreset));
    }
    
   

    return(
        <div className="text-white grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {
                loading?(<div className="spinner flex justify-center items-center"></div>):
                (<div>
                    {
                        !passwordreset?(
                            <div className="max-w-[500px] p-4 lg:p-8">
                                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">choose new password</h1>
                                <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">Almost done. Enter your new password and youre all set.</p>
                                <form onSubmit={submithandler}>
                                    <label className="relative">
                                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password <sup className="text-pink-200">*</sup></p>
                                        <input required type="text" value={formdata.password} name="password"
                                         onChange={changehandler} className="bg-richblack-600"></input>
                                    </label>
                                    <label className="relative mt-3 block">
                                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">confirm New Password <sup  className="text-pink-200">*</sup></p>
                                        <input required type="text" value={formdata.confirmpassword} name="confirmpassword"
                                         onChange={changehandler} className="bg-richblack-600"></input>
                                    </label>
                                    <button type="submit"
                                    className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">Reset Password</button>
                                </form>
                                <div className="mt-6 flex items-center justify-between">
                                  <Link to="/login">
                                      <p className="flex items-center gap-x-2 text-richblack-5">Back to login</p>
                                  </Link>
                                </div>
                            </div>
                        ):(<div>
                            <h1>Reset Complete</h1>
                            <p>All done! We have sent an email to m***********@gmail.com to confirm</p>
                            <Link to="/login">
                                <div>Return to login</div>
                            </Link>
                        </div>)
                    }
                </div>)
            }
        </div>
    )
}

export default Updatepassword;