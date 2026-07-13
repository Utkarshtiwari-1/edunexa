


const BASE_URL = "https://studynotion-backend-3.onrender.com/api/v1";

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/user/sendotp",
  SIGNUP_API: BASE_URL + "/user/signup",
  LOGIN_API: BASE_URL + "/user/login",
  RESETPASSTOKEN_API: BASE_URL + "/user/resetpassword-token",
  RESETPASSWORD_API: BASE_URL + "/user/resetpassword",
  CONTACTUS_API:BASE_URL+"/profile/contactus",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_STAS:BASE_URL+"/profile/instuctorDashboard",
}

// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payments/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payments/verifySignature",
  //SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/courses/getallcourses",
  COURSE_DETAILS_API: BASE_URL + "/courses/getcourseDetails",
  EDIT_COURSE_API: BASE_URL + "/courses/updateCourse",
  COURSE_CATEGORIES_API: BASE_URL + "/courses/showallcategory",
  CREATE_COURSE_API: BASE_URL + "/courses/createCourse",
  CREATE_SECTION_API: BASE_URL + "/courses/addsection",
  CREATE_SUBSECTION_API: BASE_URL + "/courses/addsubsection",
  UPDATE_SECTION_API: BASE_URL + "/courses/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/courses/updateSubsection",
  //GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/courses/getEnrolledCourses",
  DELETE_SECTION_API: BASE_URL + "/courses/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/courses/deleteSubsection",
  DELETE_COURSE_API: BASE_URL + "/courses/deletecourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/courses/getcourseDetails",
  //LECTURE_COMPLETION_API: BASE_URL + "/courses/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/courses/Createrating",
  MARK_LEC_COMP_API:BASE_URL+"/courses/markleccompleted"
}

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/courses/getallratings",
}

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/courses/showallcategory",
}

// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/courses/getCategoryPageDetails",
}
// CONTACT-US API
// export const contactusEndpoint = {
//   CONTACT_US_API: BASE_URL + "/reach/contact",
// }

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplaypicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/user/changePassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteAccount",
}