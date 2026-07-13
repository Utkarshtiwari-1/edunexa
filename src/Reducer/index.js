import { combineReducers } from "@reduxjs/toolkit";
import authslice from "../slices/authslice";
import Profileslice from "../slices/Profileslice";
import cartslice from "../slices/cartslice";
import courseSlice from "../slices/courseSlice";
import viewCourseSlice from "../slices/viewCourseSlice";

 export const rootreducer = combineReducers({
    auth:authslice,
    profile:Profileslice,
    cart:cartslice,
    course:courseSlice,
    viewCourse:viewCourseSlice,
})

