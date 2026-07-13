
import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    totalItems:localStorage.getItem("totalItems")?JSON.parse(localStorage.getItem("totalItems")):0,
    cartitems:localStorage.getItem("cartitems")
    ? JSON.parse(localStorage.getItem("cartitems"))
    : [],
    loading:false,
    totalPrice:localStorage.getItem("totalPrice")
    ? JSON.parse(localStorage.getItem("totalPrice"))
    : 0,
};

const cartslice = createSlice({
    name:"cart",
    initialState:initialstate,
    reducers:{
        settotalItems(state){
            state.totalItems = state.cartitems.length;
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

        },
        addtocart(state,value){
            state.cartitems.push(value.payload);
            state.totalPrice += value.payload.Price;
            localStorage.setItem("cartitems", JSON.stringify(state.cartitems))
            localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
        },
        removefromcart(state,value){
           
            const courseId = value.payload
            const index = state.cartitems.findIndex((item) => item._id === courseId)
      
            if (index >= 0) {
              // If the course is found in the cart, remove it
              state.totalItems--
              state.totalPrice -= state.cartitems[index].Price
              state.cartitems.splice(index, 1)
              // Update to localstorage
              localStorage.setItem("cartitems", JSON.stringify(state.cartitems))
              localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice))
              localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            }
            
        },
        resetcart(state){
            state.cartitems = [];
            state.totalItems = 0;
            state.totalPrice = 0;
            localStorage.removeItem("cartitems");
            localStorage.removeItem("totalItems");
            localStorage.removeItem("totalPrice");
        },
        setLoading(state,value){
            state.loading = value.payload;
        }
    }

})

export const {settotalItems,addtocart,removefromcart,resetcart} = cartslice.actions;
export default cartslice.reducer;