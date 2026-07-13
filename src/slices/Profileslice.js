
import { createSlice } from "@reduxjs/toolkit";
import { setLoading } from "./authslice";

const initialstate = {
    user: localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
    image:null,
    formdata:null,
    loading:null,
};

const Profileslice = createSlice({
    name:"profile",
    initialState:initialstate,
    reducers:{
        setUser(state,value){
            state.user = value.payload;
        },
        setImage(state,value){
            state.image = value.payload;
        },
        setformdata(state,value){
            state.formdata = value.payload;
        },
        setLoading(state,value){
            state.loading = value.payload;
        }
       
    }

})

export const {setUser,setImage,setformdata} = Profileslice.actions;
export default Profileslice.reducer;