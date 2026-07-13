import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';  // Import toastify CSS
import './SignupForm.css';  // Import the CSS file for styling
import { useDispatch } from 'react-redux';
import { setformdata } from '../../slices/Profileslice';
import { Otpsender } from '../../service/operations';


export default function SignupForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [accountType, setAccountType] = useState("Student");
   
   

    const [formData, setFormData] = useState({
        FirstName: "",
        LastName: "",
        email: "",
        password: "",
        confirmpassword: "",
       
    });

    function changeHandler(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }
    
    const{FirstName,LastName,email,password,confirmpassword} = formData;

    function submitHandler(event) {
        event.preventDefault();
        if (formData.password !== formData.confirmpassword) {
            toast.error("Passwords do not match");
            return;
        }

        
        dispatch(setformdata({FirstName,LastName,email,password,confirmpassword,accountType}));
        dispatch(Otpsender(email,navigate));
    }

    return (
        <div className='signup-container'>
            <div className='account-type-selector'>
                <button
                    className={`${accountType === "Student" ? "active" : ""}`}
                    onClick={() => setAccountType("Student")}
                >
                    Student
                </button>
                <button
                    className={`${accountType === "Instructor" ? "active" : ""}`}
                    onClick={() => setAccountType("Instructor")}
                >
                    Instructor
                </button>
            </div>
            <form onSubmit={submitHandler}>
                <div className='form-row flex flex-row gap-2'>
                    <label>
                        <p>Firstname <sup className='text-brown-800'>*</sup></p>
                        <input
                            name='FirstName'
                            value={formData.FirstName}
                            type='text'
                            required
                            onChange={changeHandler}
                            className='form-input'
                        />
                    </label>
                    <label>
                        <p>Lastname <sup className='text-brown-800'>*</sup></p>
                        <input
                            name='LastName'
                            value={formData.LastName}
                            type='text'
                            required
                            onChange={changeHandler}
                            className='form-input'
                        />
                    </label>
                </div>
                <label>
                    <p>Email Address <sup className='text-brown-800'>*</sup></p>
                    <input
                        name='email'
                        value={formData.email}
                        type='text'
                        required
                        onChange={changeHandler}
                        className='form-input'
                    />
                </label>
                <div className='form-row'>
                    <label className='relative form-input-container'>
                        <p>Password <sup className='text-brown-800'>*</sup></p>
                        <input
                            value={formData.password}
                            name='password'
                            type={showPassword1 ? "text" : "password"}
                            onChange={changeHandler}
                            className='form-input'
                        />
                        <span
                            onClick={() => setShowPassword1((prev) => !prev)}
                            className='password-toggle-icon'
                        >
                            {showPassword1 ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </label>
                    <label className='relative form-input-container'>
                        <p>Confirm Password <sup className='text-brown-800'>*</sup></p>
                        <input
                            value={formData.confirmpassword}
                            name='confirmpassword'
                            type={showPassword2 ? "text" : "password"}
                            onChange={changeHandler}
                            className='form-input'
                        />
                        <span
                            onClick={() => setShowPassword2((prev) => !prev)}
                            className='password-toggle-icon'
                        >
                            {showPassword2 ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </label>
                </div>
                <button
                    className='submit-button'
                >
                    Create Account
                </button>
            </form>
        </div>
    );
}
