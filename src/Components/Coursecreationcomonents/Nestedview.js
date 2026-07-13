import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { setLoading } from "../../slices/authslice";
import { setCourse } from "../../slices/courseSlice";
import toast from "react-hot-toast";
import { Deletesection } from "../../service/operations";
import ConfirmationModal from "../dashborad/ConfirmationModal";
import { IoIosAddCircleOutline } from "react-icons/io";
import SubsectionModal from "./SubsectionModal";
import { Deletesubsection } from "../../service/operations";



function Nestedview({handleChangeEditSectionName}){

    const {course} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const [confirmationModal,setconfirmationModal]  = useState(null);
    const [addsubsection,setaddsubsection] = useState(null);
    const [viewsubsection,setviewsubsection] = useState(null);
    const [editsubsection,seteditsubsection]  = useState(null);

    //console.log("Course in nested ",course)

    async function handledeletesection(sectionid){
        const formData = new FormData();
        formData.append("sectionid",sectionid);
        formData.append("courseid",course._id);
        setLoading(true);
        const result = await Deletesection(formData,token);
        if(result)
        {
            dispatch(setCourse(result));
            setconfirmationModal(null);
        }
        else
        {
            toast.error("Failed to delete section");
        }

    }

    async function handledeletesubsec(subsectionid,sectionid)
    {
        const formData = new FormData();
        formData.append("sectionid",sectionid);
        formData.append("subsectionid",subsectionid);
        formData.append("courseid",course._id);
        setLoading(true);
        const result = await Deletesubsection(formData,token);
        if(result)
        {
            dispatch(setCourse(result));
            setconfirmationModal(null);
        }
        else
        {
            toast.error("Failed to delete section");
        }
    }

    return (<div className='rounded-lg bg-richblack-600 p-5 px-8 mt-7'>

            {
                course?.courseContent?.map((section)=>{
                    return(
                        <details key={section._id} open={true}>
                            <summary className='flex items-center justify-between gap-x-3 border-b-2 border-richblack-400'>
                                <div className="flex gap-x-3 items-center">
                                    <RxDropdownMenu className="text-richblack-200"></RxDropdownMenu>
                                    <p className=" text-richblack-50 font-semibold">{section.sectionName}</p>
                                </div>
                                <div className="flex gap--x-3 items-center ">

                                    <button onClick={()=>handleChangeEditSectionName(section._id,section.sectionName)}>
                                        <MdEdit className="text-richblack-100"></MdEdit>
                                    </button>
                                    <button onClick={()=>
                                    setconfirmationModal(
                                        {
                                            text1:"Delete this Section",
                                            text2:"All the sections and subsections will be deleted",
                                            btn1text:"Delete",
                                            btn2text:"Cancel",
                                            btn1handler:()=>handledeletesection(section._id),
                                            btn2handler:()=>setconfirmationModal(null)
                                        }
                                    )}>
                                        <MdDelete className="text-richblack-100"></MdDelete>
                                    </button>
                                    <span className="text-richblack-400">|</span>

                                    <IoIosArrowDropdownCircle className={`text-xl text-richblack-300`}></IoIosArrowDropdownCircle>
                                </div>
                            </summary>
                            <div>
                                {
                                    section?.subsection?.map((subsec)=>{
                                        //console.log(subsec.title);
                                        return(
                                            <div  className="flex justify-between items-center pl-3 border-b border-richblack-400">
                                                <div className="flex items-center gap-x-3 cursor-pointer" onClick={()=>setviewsubsection(subsec)}>
                                                    <RxDropdownMenu className="text-richblack-400"></RxDropdownMenu>
                                                    <p className="text-white">{subsec.title}</p>
                                                    
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <button className="text-richblack-400"
                                                    onClick={()=>seteditsubsection({...subsec,sectionid:section._id})}>
                                                        <MdEdit></MdEdit>
                                                    </button>
                                                    <button className="text-richblack-400"
                                                    onClick={()=>setconfirmationModal(
                                                        {
                                                            text1:"Delete Lecture",
                                                            text2:"your lecture will be deleted sucsessfully",
                                                            btn1text:"Delete",
                                                            btn2text:"Cancel",
                                                            btn1handler:()=>handledeletesubsec(subsec._id,section._id),
                                                            btn2handler:()=>setconfirmationModal(null)


                                                        }
                                                    )}>
                                                        <MdDelete></MdDelete>
                                                    </button>
                                                </div>
                                                
                                            </div>
                                        )
                                    })
                                }

                                <button className="flex items-center gap-x-2 text-yellow-50 text-sm pt-2 pb-2 ml-3"
                                onClick={()=>setaddsubsection(section._id)}>
                                    <IoIosAddCircleOutline></IoIosAddCircleOutline>
                                    <p>Add lecture</p>
                                </button>
                            </div>
                        </details>
                    )
                })
            }

            {
                addsubsection!==null ?(<SubsectionModal
                modaldata={addsubsection}
                setmodaldata={setaddsubsection}
                add={true}></SubsectionModal>)
                :viewsubsection!==null ?(<SubsectionModal
                modaldata={viewsubsection}
                setmodaldata={setviewsubsection}
                view={true}></SubsectionModal>)
                :editsubsection!==null?(<SubsectionModal
                modaldata={editsubsection}
                setmodaldata={seteditsubsection}
                edit={true}></SubsectionModal>)
                :(<div></div>)
            }

            {
            confirmationModal!==null && (<ConfirmationModal modaldata={confirmationModal}></ConfirmationModal>)
            }
    </div>)
}

export default Nestedview;