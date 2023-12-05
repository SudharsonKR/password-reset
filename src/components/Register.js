import React, { useState } from 'react'
import './mix.css'
import { NavLink } from 'react-router-dom';

const Register = () => {
    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    });
    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const addUserdata= async (e)=>{
        e.preventDefault();
        const {fname, email, password, cpassword}=inpval;

        // const email_pattern=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        const password_pattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

        if(fname === ''){
            alert("Please enter your name")
        }else if(email === ''){
            alert("Please enter your email")
        }else if(!email.includes("@")){
            alert("Please enter valid email")
        }else if(password === ''){
            alert("Please enter your password")
        }else if(!password_pattern.test(inpval.password)){
            alert("Password must 8 char - One number, one Caps letter and One Special Char must in password")
        }else if(cpassword === ''){
            alert("Please enter your confirm password")
        }else if(cpassword.length<8){
            alert("Password must be 8 char")
        }else if(password !== cpassword){
            alert("Password and confirm password not match")
        }else{
            // console.log("user registration successfully done")
            // console.log(inpval)
            const data = await fetch("https://password-reset-dlwi.onrender.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, password, cpassword
                })
            });

            const res = await data.json();
            // console.log(res.status);

            if(res.status === 201){
                alert("User Registraion Successfull")
                setInpval({ ...inpval, fname: "", email: "", password: "", cpassword: "" });
            }
            // if (res.status === 201) {
            //     toast.success("Registration Successfully done 😃!", {
            //         position: "top-center"
            //     });
            //     setInpval({ ...inpval, fname: "", email: "", password: "", cpassword: "" });
            // }
        }

    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                        <p>Welcome</p>
                    </div>
                    <form>
                        <div className="form_input">
                            <label htmlFor='fname'>Name</label>
                            <input type='text' onChange={setVal} value={inpval.fname} name='fname' id='fname' placeholder='Enter Your Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor='email'>Email</label>
                            <input type='email' onChange={setVal} value={inpval.email} name='email' id='email' placeholder='Enter Email id' />
                        </div>
                        <div className="form_input">
                            <label htmlFor='password'>Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name='password' id='password' placeholder='Enter Password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <div className="form_input">
                            <label htmlFor='password'>Confirm Password</label>
                            <div className="two">
                                <input type={!cpassShow ? "password" : "text"} onChange={setVal} value={inpval.cpassword} name='cpassword' id='cpassword' placeholder='Enter Confirm Password' />
                                <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                                    {!cpassShow ? "show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={addUserdata}>Sign Up</button>
                        <p>Have a nice day <NavLink></NavLink></p>
                        <p>Already have an Account? <NavLink to="/"> Click - Log In</NavLink></p>

                    </form>
                </div>
            </section>
        </>
    )
}

export default Register