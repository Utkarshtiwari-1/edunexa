
import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
    loading:false,
};

const authslice = createSlice({
    name:"auth",
    initialState:initialstate,
    reducers:{
        setToken(state,value){
            state.token = value.payload;
        },
        setLoading(state,value){
            state.loading = value.payload;
        }
    }

})

export const {setToken,setLoading} = authslice.actions;
export default authslice.reducer;