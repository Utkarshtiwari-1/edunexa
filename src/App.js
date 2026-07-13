import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from "./Components/common/Navbar";
import Forgotpassword from "./Pages/Forgotpassword";
import Updatepassword from "./Pages/Updatepassword";
import Otpverification from "./Pages/Otpverification";
import Aboutus from "./Pages/Aboutus";
import Contactuspage from "./Pages/Contactuspage";
import Dashboard from "./Pages/Dashboard";
import Profilepage from "./Pages/Profilepage";
import Settingpage from "./Pages/Settingpage";
import Enrolledcourses from "./Pages/Enrollerdcourses";
import Createcourse from "./Pages/Createcourse";
import { useSelector } from "react-redux";
import InstructorCourse from "./Pages/InstructorCourse";
import EditCourse from "./Components/Coursecreationcomonents/EditCourse";
import Catalogpage from "./Pages/Catalogpage";
import CourseDetails from "./Pages/CourseDetails";
import Mycart from "./Pages/Mycart";
//import Coursevideo from "./Components/videolecturesviewer";
import Instuctordashboard from "./Components/dashborad/Instuctordashboard";
import Viewcourse from "./Pages/Viewcourse";
import VideoDetails from "./Components/videolecturesviewer/VideoDetails";
//import Videodetails from "./Components/videolecturesviewer/Videodetails";

function App() {

  const {user} = useSelector((state)=>state.profile);

  return (
    <div>
        <div className="w-screen min-h-screen bg-richblack-900 font-inter ">

          <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/forgotpassword" element={<Forgotpassword></Forgotpassword>}></Route>
        <Route path="/update-password/:id" element={<Updatepassword></Updatepassword>}></Route>
        <Route path="/signup/otpverification" element={<Otpverification></Otpverification>}></Route>
        <Route path="/about" element={<Aboutus></Aboutus>}></Route>
        <Route path="/contact" element={<Contactuspage></Contactuspage>}></Route>
        <Route 
        element={<Dashboard></Dashboard>}>
          <Route path="/dashboard/my-profile" element={<Profilepage></Profilepage>}></Route>
          <Route path="/dashboard/settings" element={<Settingpage></Settingpage>}></Route>
          <Route path="/dashboard/enrolled-courses" element={<Enrolledcourses></Enrolledcourses>}></Route>
          {
             user && user.accountType==="Instructor" && 
             <Route path="/dashboard/add-course" element={<Createcourse></Createcourse>}></Route>
          }
          {
             user && user.accountType==="Instructor" && 
             <Route path="/dashboard/my-courses" element={<InstructorCourse></InstructorCourse>}></Route>
          }
          {
             user && user.accountType==="Instructor" && 
             <Route path="/dashboard/edit-course/:courseid" element={<EditCourse></EditCourse>}></Route>
          }
          {
             user && user.accountType==="Instructor" && 
             <Route path="/dashboard/instructor" element={<Instuctordashboard></Instuctordashboard>}></Route>
          }
        </Route>
        <Route path="/catalog/:categoryid" element={<Catalogpage></Catalogpage>}></Route>
        <Route path="/courses/:courseid" element={<CourseDetails></CourseDetails>}></Route>
        {
             user && user.accountType==="Student" && 
             <Route path="/dashboard/cart" element={<Mycart></Mycart>}></Route>
        }
        {
          user && user.accountType==="Student" &&
          <Route path="/dashboard/course/:courseid/section/:sectionid/sub-section/:subsectionid" element={<Viewcourse></Viewcourse>}>
             <Route path="/dashboard/course/:courseid/section/:sectionid/sub-section/:subsectionid" element={<VideoDetails></VideoDetails>}></Route>
          </Route>
        }
        
      </Routes>
    </div>
    </div>
    
  );
}

export default App;
