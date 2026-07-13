import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Getpasswordresettoken } from '../service/operations';

function Forgotpassword(){
    const dispatch = useDispatch();
    const {loading} = useSelector((state)=>state.auth);
    const[email,setemail] = useState("");
    const[emailsent,setemailsent] = useState(false);

    function submithandler(e){
        e.preventDefault();
        dispatch(Getpasswordresettoken(email,setemailsent));
        

    }

    return(
        <div className="text-whiten grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {
                loading?(<div className="spinner"></div>):(
                    <div className="max-w-[500px] p-4 lg:p-8">
                        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                            {
                                !emailsent?"Reset your password":"check your email"
                            }
                        </h1>
                        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                            {
                                !emailsent?"Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery":
                                `We have sent the reset email to ${email}`
                            }
                        </p>
                        <form onSubmit={submithandler}>
                            {
                                !emailsent && (
                                    <label  className="w-full">
                                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address <sup className="text-pink-200">*</sup></p>
                                        <input required name="email" type="email" value={email} 
                                        onChange={(e)=>setemail(e.target.value)}
                                        className="w-full pl-3 p-3 bg-richblack-700 text-white rounded-md"
                                        ></input>
                                    </label>
                                )
                            }
                            <button type="submit"  className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                                {
                                    !emailsent?"Reset Password":"Resend Email"
                                }
                            </button>
                        </form>
                        <div className="mt-6 flex items-center justify-between">
                            <Link to="/login">
                                <p className="flex items-center gap-x-2 text-richblack-5">Back to login</p>
                            </Link>
                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default Forgotpassword;