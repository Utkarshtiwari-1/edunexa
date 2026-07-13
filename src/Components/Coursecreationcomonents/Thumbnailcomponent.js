import { useState } from "react";


function Thumbnailcomponent({type}){

    const[image,setimage] = useState(null);

    function changehandler(e){
       if(e.target.files && e.target.files[0])
        {
            setimage(URL.createObjectURLE.target.files[0]);
        }
    }


    return(
        <div>
            <label htmlFor="thumbnail">file upload</label>
            <input type="file" name="thumbanil" onChange={changehandler} className="filetype" />
           
        </div>
    )
}

export default Thumbnailcomponent;