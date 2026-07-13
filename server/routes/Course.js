const express  = require("express");

const router = express.Router();

const {createCourse,updateCourse,showallcourses,getCourseDetails,DeleteCourse,markleccompleted} = require("../controller/Course");
const {auth,isStudent,isInstructor,isAdmin} = require("../middleware/Auth");
const { ownsCourse } = require("../middleware/CourseOwner");

const {createSection,updateSection,deleteSection} = require("../controller/Section");
const {createSubsection,updatesubsection,deletesubsection} = require("../controller/SubSection");

const {createRating,getAverageRating,getAllRating} = require("../controller/RatingandReview");
const {createCategory,getallcategory,categorypageDetails}  = require("../controller/CreateCategory");


//course creation router
router.post("/createCourse",auth,isInstructor,createCourse);
router.post("/deletecourse",auth,isInstructor,ownsCourse,DeleteCourse)
router.post("/addsection",auth,isInstructor,ownsCourse,createSection);
router.post("/addsubsection",auth,isInstructor,ownsCourse,createSubsection);
router.post("/updateSection",auth,isInstructor,ownsCourse,updateSection);
router.post("/updateSubsection",auth,isInstructor,ownsCourse,updatesubsection);
router.post("/deleteSection",auth,isInstructor,ownsCourse,deleteSection);
router.post("/deleteSubsection",auth,isInstructor,ownsCourse,deletesubsection);
router.post("/updateCourse",auth,isInstructor,ownsCourse,updateCourse);
router.post("/markleccompleted",auth,isStudent,markleccompleted);
//get all courses
router.get("/getallcourses",showallcourses);

//get a singlecourse
router.post("/getcourseDetails",getCourseDetails);

//category creation
router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showallcategory",getallcategory);


router.post("/getCategoryPageDetails",categorypageDetails);

//rating
router.post("/Createrating",auth,isStudent,createRating);
router.post("/getaveragerating",getAverageRating);
router.get("/getallratings",getAllRating);

module.exports = router;

