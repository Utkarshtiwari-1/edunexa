import axios from "axios";

export const axiosInstance = axios.create({});

export const apiconnector = (method,url,bodydata,header,params)=>{
   return  axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodydata?bodydata:null,
        headers:header?header:null,
        params:params?params:null,
    })
}