

function ConfirmationModal({modaldata}){
    return(
        <div  className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
             <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
            <p  className="text-2xl font-semibold text-richblack-5">{modaldata.text1}</p>
            <p className="mt-3 mb-5 leading-6 text-richblack-200">{modaldata.text2}</p>
            <div  className="flex items-center gap-x-4">
                <button
                onClick={modaldata.btn1handler}
                className="px-2 py-1 bg-yellow-50">{modaldata.btn1text}</button>
                <button
                onClick={modaldata.btn2handler}
                className="px-2 py-1 bg-yellow-50">{modaldata.btn2text}</button>
            </div>
        </div>
        </div>
       
    )
}

export default ConfirmationModal;