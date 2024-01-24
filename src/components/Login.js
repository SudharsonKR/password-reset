import React, { useState } from 'react'
import './mix.css'
import { NavLink ,useNavigate} from "react-router-dom"

export const Login = () => {
  const [passShow, setPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    email: "",
    password: ""
   });

   const history = useNavigate();

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

const loginuser= async(e)=>{
  console.log("Login onclick working fine")
  e.preventDefault();

const{email, password}=inpval;

const email_pattern=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const password_pattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
if(email === ''){
  alert("Please enter your email")
}else if(!email_pattern.test(inpval.email)){
  alert("Please enter valid email")
}else if(password === ''){
  alert("Please enter your password")
}else if(!password_pattern.test(inpval.password)){
  alert("Password must 8 char - One number, one Caps letter and One Special Char must in password")
}else{
  // console.log("Login Successfull done")
  const data = await fetch("https://password-reset-dlwi.onrender.com/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email, password
    })
});
console.log(data)
const res = await data.json();
console.log(res);

if(res.status === 201){
  
  localStorage.setItem("usersdatatoken", res.result.token);
  history("/dash")
    setInpval({ ...inpval, email: "", password: ""});
}
}
}
  return (
    <>
    <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Login Form</h1>
            <p>Welcome</p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor='email'>Email</label>
              <input type='email' value={inpval.email} onChange={setVal} name='email' id='email' placeholder='Enter Email'/>
              </div>
              <div className="form_input">
              <label htmlFor='password'>Password</label>
              <div className="two">
              <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={setVal} name='password' id='password' placeholder='Enter Password'/>
              <div className="showpass" onClick={()=>setPassShow(!passShow)}>
                                   {!passShow ? "show" : "Hide"} 
                                </div>
              </div>
            </div>
            <button className='btn' onClick={loginuser}>Login</button>
            <p>Don't have an Account? <NavLink to = "/register" style={{color:"blue",fontWeight:"bold"}}> Click - Sign Up</NavLink></p>
            <p><NavLink to = "/reset-password" style={{color:"blue",fontWeight:"bold"}}> Forgot Password?</NavLink></p>
          </form>
        </div>
    </section>
    </>
  )
}

