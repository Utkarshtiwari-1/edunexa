import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
  courseSectionData: [],
  courseEntireData: [],
  completedLectures: [],
  totalNoOfLectures: 0,
  currentsection:[],
  currentsubsection:[],
}

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload
    },
    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload
    },
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload
    },
    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload
    },
    updateCompletedLectures: (state, action) => {
      state.completedLectures = [...state.completedLectures, action.payload]
    },
    setcurrentsection:(state,action)=>{
      state.currentsection  = action.payload;
    },
    setcurrentsubsection:(state,action)=>{
      state.currentsubsection = action.payload;
    }
    
  },
})

export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
  setcurrentsection,
  setcurrentsubsection
} = viewCourseSlice.actions

export default viewCourseSlice.reducer