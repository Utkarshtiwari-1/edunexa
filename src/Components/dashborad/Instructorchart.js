import { useState } from "react";
import { Chart,registerables } from "chart.js";
import { Pie } from 'react-chartjs-2';




function Instructorchart({courses})
{
    const [currentchart,setcurrentchart] = useState("students");

    const getrandmcolors = (numcolors)=>{
        const colors = [];

        for(let i =0;i<numcolors;i++)
        {
            const color =  `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
            colors.push(color);
        }

        return colors;
    }

    Chart.register(...registerables);

    const chartdataforstudents = {
        labels:courses.map((course)=>course.courseName),
        datasets:[
            {
                data:courses.map((course)=>course.totalstudentsenrolled),
                backgroundColor:getrandmcolors(courses.length)
            }
        ]
    }

    const chartdataforincome = {
        labels:courses.map((course)=>course.courseName),
        datasets:[
            {
                data:courses.map((course)=>course.totalamount),
                backgroundColor:getrandmcolors(courses.length)
            }
        ]
    }

    const options = {

    };


    return(
        <div className="text-white w-full">
            <p className="font-semibold">Visulize</p>
            <div className="flex gap-6 pt-3">
                <button onClick={()=>setcurrentchart("students")}
                className={`text-yellow-50 ${currentchart==="students"?"px-2 py-1 bg-richblack-400 rounded-md ":""}`}>Students</button>
                <button onClick={()=>setcurrentchart("income")}
                className={`text-yellow-50 ${currentchart!=="students"?"px-2 py-1 bg-richblack-400 rounded-md":""}`}>Income</button>
            </div>
            <div className="flex justify-center w-full">
                <div className="flex justify-center w-[50%]">
                    <Pie
                    data={currentchart==="students"?chartdataforstudents:chartdataforincome}
                    options={options}
                    ></Pie>
                </div>
            </div>
            
        </div>
    )
}

export default Instructorchart;