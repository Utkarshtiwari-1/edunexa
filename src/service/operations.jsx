import toast from "react-hot-toast";
import {setLoading,setToken} from "../slices/authslice";
import { apiconnector } from "./apiconnector";
import {catalogData, courseEndpoints, endpoints, profileEndpoints, studentEndpoints} from "./apis";
import {setUser,setImage} from "../slices/Profileslice";
import { settingsEndpoints } from "./apis";
import rzplogo from "../assets/Logo/Logo-Small-Dark.png";
import { resetcart } from "../slices/cartslice";

const {
    SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

const {CATALOGPAGEDATA_API} = catalogData;

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    DELETE_PROFILE_API
} = settingsEndpoints;

const {CREATE_COURSE_API,EDIT_COURSE_API,
    CREATE_SECTION_API,
    UPDATE_SECTION_API,
    DELETE_SECTION_API,
    CREATE_SUBSECTION_API,
    DELETE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_COURSE_API,
    COURSE_DETAILS_API,
    CREATE_RATING_API,
    MARK_LEC_COMP_API
}  = courseEndpoints;

const {GET_USER_ENROLLED_COURSES_API,GET_INSTRUCTOR_STAS} = profileEndpoints;

const {COURSE_PAYMENT_API,COURSE_VERIFY_API} = studentEndpoints;



export function Getpasswordresettoken(email,setemailsent){
    return async(dispatch) => {
        dispatch(setLoading(true));

        try {

            const response = await apiconnector("POST",RESETPASSTOKEN_API,{email,});
            
            console.log("token response",response);

            if(!response.data.sucsess)
            {
                throw new Error(response.data.message);
            }

            

            toast.success("token email sent sucsessfully");
            setemailsent(true);
            
        } catch (error) {
            console.log(error);
        }

        dispatch(setLoading(false));
    }
}

export function resetpassword(password,confirmpassword,token,setpasswordreset){
    return async(dispatch)=>{
        dispatch(setLoading(true));

        try {
            
            const response = await apiconnector("POST",RESETPASSWORD_API,{password,confirmpassword,token});

            console.log("reset password response",response);

            if(!response.data.sucsees)
            {
                throw new Error(response.data.message);
            }

            toast.success("password changed sucsessfully");
            setpasswordreset(true);

        } catch (error) {
            console.log(error);
        }

        dispatch(setLoading(false));
    }
}

export function Signupuser(FirstName,LastName,email,password,confirmpassword,accountType,otp,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try {
            
            console.log(FirstName,LastName,email,password,confirmpassword,accountType,otp);

            const response = await apiconnector("POST",SIGNUP_API,{
                FirstName,
                LastName,
                email,
                password,
                confirmpassword,
                accountType,
                otp,
            });

            console.log("signup response",response);

            if(!response.data.sucsess)
            {
                throw new Error(response.data.message);
            }

            toast.success("Account created sucsessfully");
            navigate("/login");

        } catch (error) {
            console.log(error);
            if(error.response.data.message==="user already exist")
            {
                toast.error("User already exist");
            }
        }

        dispatch(setLoading(false));
    }
}


export function loginuser(email,password,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));

        try {

            const response = await apiconnector("POST",LOGIN_API,{email,password});

            console.log("login response",response);

            if(!response.data.succsess)
            {
                throw new Error(response.data.message);
            }

            const token = response.data.token;

            dispatch(setToken(token));
            dispatch(setUser(response.data.userexist));
            const image = response.data.userexist.image;
            dispatch(setImage(image));
            toast.success("Logged in sucsessfully");
            localStorage.setItem("user",JSON.stringify(response.data.userexist));
            localStorage.setItem("token", JSON.stringify(response.data.token))
            navigate("/");
            
        } catch (error) {

            console.log(error.response.data.message);

            if(error.response.data.message==="password does not match")
            {
                toast.error("incorrect password")
            }
            else if(error.response.data.message==="user does not exist first signup")
            {
                toast.error("Sign up first")
            }
            else
            {
                toast.error("Login failed");
            }
            
            navigate("/login");
        }

        dispatch(setLoading(false));
    }
}

export function Logoutuser(navigate){
    return (dispatch)=>{
        localStorage.removeItem("token");
        dispatch(setToken(null));
        dispatch(setUser(null));
        toast.success("logout sucsessfully");
        navigate("/")
    }
    

}

export function Otpsender(email,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));

        try {
            
            const response = await apiconnector("POST",SENDOTP_API,{email});
           // console.log("otp sending response",response);
            if(!response.data.succsess)
            {
                throw new Error(response.data.message);
            }

            navigate("/signup/otpverification");
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message ||
                "Unable to send the verification email. Please try again."
            );
        }

        dispatch(setLoading(false));
    }
}

export function updateDisplayPicture(token,formdata){
   return async(dispatch)=>{
       // dispatch(setLoading(true));
       const toastId = toast.loading("Loading...")
        try {

            const response  = await apiconnector("PUT",UPDATE_DISPLAY_PICTURE_API,formdata,
               {
                  "Content-Type": "multipart/form-data",
                   Authorization: `Bearer ${token}`,
                });

            console.log(response);
            toast.success("image updated sucsessfully");
            dispatch(setUser(response.data.data));
            localStorage.setItem("user",JSON.stringify(response.data.data));

        } catch (error) {
            console.log(error);
            toast.error("issue in uploading");
        }

        //dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}


export function Updateprofile(formdata,token){
    console.log("aa gye update karne")
    return async(dispatch) =>{
        const toastId = toast.loading("updating...");
        try {

            const response = await apiconnector("PUT",UPDATE_PROFILE_API,formdata,
                {
                    "Content-Type": "multipart/form-data",
                     Authorization: `Bearer ${token}`,
                }
            )

            console.log(response);
            dispatch(setUser(response.data.data));
            //localStorage.setItem("user",JSON.stringify())
            toast.success("profile updated sucsessfully");

        } catch (error) {
            console.log(error);
            toast.error("issue with profile update")
        }
        toast.dismiss(toastId);
    }
}

export function Deleteaccount(token,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("deleting...");
        try {
            
            const response = apiconnector("DELETE",DELETE_PROFILE_API,null, {
                "Content-Type": "multipart/form-data",
                 Authorization: `Bearer ${token}`,
            });

            console.log(response);
            dispatch(setUser(null));
            dispatch(setToken(null));
            // localStorage.removeItem("user");
            // localitem.removeItem("token");
            toast.success("Account deleted sucsessfully");
            navigate("/");

        } catch (error) {
            console.log(error);
            toast.error("Issue with account deletion");
        }

        toast.dismiss(toastId);
    }
}

export const addCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiconnector("POST", CREATE_COURSE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE COURSE API RESPONSE............", response)
      if (!response?.data?.sucsess) {
        throw new Error("Could Not Add Course Details")
      }
      toast.success("Course Details Added Successfully")
      result = response?.data?.data
    } catch (error) {
      console.log("CREATE COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }


  export const editCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiconnector("POST", EDIT_COURSE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE COURSE API RESPONSE............", response)
      if (!response?.data?.sucsess) {
        throw new Error("Could Not Add Course Details")
      }
      toast.success("Course Details updated Successfully")
      result = response?.data?.data
    } catch (error) {
      console.log("CREATE COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  export const Createsection = async(formData,token) =>{

    let result = null;
    const toastId = toast.loading("Loading...");
    try {

        const response = await apiconnector("POST",CREATE_SECTION_API,formData,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        )

        console.log("section res",response);
        if(!response.data.sucsess)
        {
            throw new Error(response.data.message);
        }

        result = response.data.data;
        toast.success("Section created sucsessfully");
    } catch (error) {
        
        console.log(error);
        toast.error("Failed to create section");
    }

    toast.dismiss(toastId);
    return result;
}

export const Updatesection = async(formData,token)=>{
    let result = null;
    let toastId = toast.loading("Loading...");
    try {

        const response = await apiconnector("POST",UPDATE_SECTION_API,formData,
            {
                
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
                
            }
        )

        if(!response.data.sucsess)
        {
            throw new Error(response.data.message);
        }
        console.log("response of updation",response.data.data);

        result = response.data.data;
        console.log("operation me" , result);
        
        toast.success("Section Name updated sucsessfully");

        
    } catch (error) {
        console.log(error);
        toast.error("Failed in updation");
    }

    toast.dismiss(toastId);
    return result;
}

export const Deletesection = async(formdata,token) =>{
    let toastId = toast.loading("Losding...");
    let result = null;
    try {

        const response = await apiconnector("POST",DELETE_SECTION_API,formdata,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        )

        console.log("delete response",response);

        if(!response.data.sucses)
        {
            throw new Error(response.data.message);
        }

        result = response.data.data;
        toast.success("Section Deleted sucsessfully");
        
    } catch (error) {
        console.log(error);
        toast.error("Failed to delete section")
    }

    toast.dismiss(toastId);
    return result;
}

 export const CreateSubsection = async(formData,token)=>{
    const toastid = toast.loading("Loading...");
    let result = null;
    try {

        const response = await apiconnector("POST",CREATE_SUBSECTION_API,formData,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        )

        if(!response.data.sucsess)
        {
            throw new Error(response.data.message);
        }

        console.log("subsection res",response);
        result  = response.data.data;
        toast.success("Lecture created sucsessfully");

        
    } catch (error) {
        console.log(error);
        toast.error("Failed to create Lecture");
    }

    toast.dismiss(toastid);
    return result;
 }

 export const Deletesubsection = async(formData,token) =>{
    let toastId = toast.loading("Loading...");
    let result = null;
    try {

        const response = await apiconnector("POST",DELETE_SUBSECTION_API,formData,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        )

        console.log("delete response",response);

        if(!response.data.sucsess)
        {
            throw new Error(response.data.message);
        }

        result = response.data.data;
        toast.success("Lecture Deleted sucsessfully");
        
    } catch (error) {
        console.log(error);
        toast.error("Failed to delete Lecture")
    }

    toast.dismiss(toastId);
    return result;
 }


 export const Updatesubsection = async(formData,token)=>{
    let toastId = toast.loading("Loading...");
    let result = null;
    try {

        const response = await apiconnector("POST",UPDATE_SUBSECTION_API,formData,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        )

        console.log("update response",response);

        if(!response.data.sucsess)
        {
            throw new Error(response.data.message);
        }

        result = response.data.data;
        toast.success("Lecture Updated sucsessfully");
        
    } catch (error) {
        console.log(error);
        toast.error("Failed to update Lecture")
    }

    toast.dismiss(toastId);
    return result;
 }


 export const getallcourses = async(token) =>{
    const toastid = toast.loading("Loading...");
    let result = null;

    try {

        const response = await apiconnector("GET",GET_USER_ENROLLED_COURSES_API,null,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        )

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        console.log(response);
        result = response.data.data;
        toast.success("Courses fetched sucsessfully");
        
    } catch (error) {
        
        console.log(error);
        toast.error("Something went wrong");
    }

    toast.dismiss(toastid);
    return result;
 }


 export const deletecourse = async(courseid,token) =>{
    const toastId  =toast.loading("Loading...");
    let result = null;
    try {

        const response = await apiconnector("POST",DELETE_COURSE_API,{courseid:courseid},
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        )
        
        if(!response.data.sucsess)
        {
            throw new Error(response.data.message);
        }

        result = response.data.message;
        toast.success("Course deleted sucsessfully");

    } catch (error) {
        console.log(error);
        toast.error(error);
    }

    toast.dismiss(toastId);
    return result;

 }


 export const getCatalogdata = async(categoryid) =>{
   const toastid =   toast.loading("loading...");
   let result = null;

   try {

    const response = await apiconnector("POST",CATALOGPAGEDATA_API,{categoryid});
    if(!response.data.sucsess)
    {
        throw new Error(response.data.message);
    }

    result = response.data.data;
    toast.success("Catalog data fetched sucsessfully");
    
   } catch (error) {
        console.log(error);
        toast.error(error);
   }

   toast.dismiss(toastid);
   return result;
 }


 function loadscript(src){
    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src = src;
        script.onload = ()=>{
            resolve(true);
        }
        script.onerror = ()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
 }

export const  buycourse = async(token,courses,userdetails,navigate,dispatch,setcourses = null)=>{

    const toastId = toast.loading("Loading...");
    try {
        
        const res = await loadscript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
            toast.error("Razorpay sdk failed to load");
        }

        //initiate the order
        const orderRes = await apiconnector("POST",COURSE_PAYMENT_API,{courses},
            {
                Authorization: `Bearer ${token}`
            }
        )

        console.log("payment order res",orderRes);
        if(!orderRes.data.succsess)
        {
            throw new Error(orderRes.data.message);

        }

        //options create

        const options = {
            key:"rzp_test_XK9BW3p4nez9eI",
            currency:orderRes.data.message.currency,
            amount:orderRes.data.message.amount,
            order_id:orderRes.data.message.id,
            name:"Study notion",
            description:"Thankyou for purchasing",
            image:rzplogo,
            prefill:{
                name:userdetails.FirstName,
                email:userdetails.email
            },
            handler:function(response){
                verifypayment({...response,courses},token,navigate,dispatch);
            }
        }

        const paymentobj = new window.Razorpay(options);
        paymentobj.open();
        paymentobj.on("payment.failed",function(response){
            toast.error("payment failed");
        })


    } catch (error) {
        
        console.log(error);
        toast.error("payment error");
    }

    toast.dismiss(toastId);
    if(setcourses!==null)
    {
        setcourses([]);
    }
}


async function verifypayment(bodydata,token,navigate,dispatch)
{
    const toastId = toast.loading("loading....");
    try {

        console.log("bodydata while verifying", bodydata);
        const response = await apiconnector("POST",COURSE_VERIFY_API,bodydata,
            {
                Authorization: `Bearer ${token}`
            }
        )

        if(!response.data.succsess)
        {
            throw new Error(response.data);
        }

        toast.success("payment succsessfull");
        navigate("/dashboard/enrolled-courses");
        
    } catch (error) {
        console.log(error,"error in verifying sign");
        toast.error("COuld not verify payment");
    }
    dispatch(resetcart());
    toast.dismiss(toastId);
}


export const getfullcoursedetais = async(courseid)=>{
    const toastId = toast.loading("Loading...");
    let result = null;
    try {

        const response = await apiconnector("POST",COURSE_DETAILS_API,{courseid:courseid});
        if(!response.data.sucsess)
        {
            throw new Error(response.data.message);
        }
        console.log(response);

        result = response.data.data;
        //ltoast.success("Course fetched sucsessfully");

        
    } catch (error) {
        console.log(error);
        toast.error("Course not found, Something went wrong");
    }
    toast.dismiss(toastId);
    
    return result;
}



export const getinstructordata = async(token) =>{
    const toastid = toast.loading("Loading...");
    let result = null;

    try {

        const response = await apiconnector("GET",GET_INSTRUCTOR_STAS,null,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        )

        if(!response.data.succsess)
        {
            throw new Error(response.data.message);
        }

        console.log("stats response",response);
        result = response.data.courses;
        toast.success("Courses fetched sucsessfully");
        
    } catch (error) {
        
        console.log(error);
        toast.error("Something went wrong");
    }

    toast.dismiss(toastid);
    return result;
 }

export const addreview = async(formData,token)=>{
    const toastid = toast.loading("Loading...");

    try {
        
        const response = await apiconnector("POST",CREATE_RATING_API,formData,{
            Authorization: `Bearer ${token}`
        });

        if(!response.data.sucsess)
        {
            throw new Error(response.data.message);
        }
        console.log("res",response);

        toast.success("Your review added succsessfully");

    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }

    toast.dismiss(toastid);
}



export const markleccompleted = async(courseid,subsectionid,token)=>{
    const toastid = toast.loading("Loading...");

    try {
        
        console.log(courseid,subsectionid)
        const response = await apiconnector("POST",MARK_LEC_COMP_API,{courseid,subsectionid},{
            Authorization: `Bearer ${token}`
        });

        if(!response.data.succsess)
        {
            throw new Error(response.data.message);
        }
        console.log("res",response);

        toast.success("marked watched succsessfully");

    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }

    toast.dismiss(toastid);
}
