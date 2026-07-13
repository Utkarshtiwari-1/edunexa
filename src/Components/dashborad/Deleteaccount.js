import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Deleteaccount } from "../../service/operations";
import { useNavigate } from "react-router-dom";

function Deleteyouraccount(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state)=>state.auth);

    function deletahandler(){
        dispatch(Deleteaccount(token,navigate));
    }
    return(
        <div className="flex  mt-10 items-center pr-7 pl-2 min-h-[100px]
          bg-pink-50  rounded-md border border-pink-800">
            <div>
                <RiDeleteBin6Fill className="text-3xl text-pink-700"></RiDeleteBin6Fill>
            </div>
            <div className="ml-10 p-3 flex flex-col gap-1 text-white">
                <h1 className="text-pink-5 font-semibold font-2xl">Delete Account</h1>
                <p>Would you like to delete your account</p>
                <p>This account contains paid courses. Deleting your account will remove all the courses</p>
                <div onClick={deletahandler} className=" cursor-pointer font-inter text-pink-800">Delete my account</div>
            </div>
         </div>
    )
}

export default Deleteyouraccount;