import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const ResetPassword = () => {

    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");

    const setVal = (e) => {
        setEmail(e.target.value)
    }

    const sendLink = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.error("email is required!", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!", {
                position: "top-center"
            });
        } else {
            const res = await fetch("https://password-reset-dlwi.onrender.com/sendpasswordlink", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json();
            console.log("user validation check", data)

            if (data.status == 201) {
                setEmail("");
                setMessage(true)
            } else if(data.status == 401){
                toast.error("Mail not send-Connection Error",{
                    position: "top-center"
                })
            }else {
              toast.error("Invalid User",{
                  position: "top-center"
              })
          }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Reset Password Form</h1>
                    </div>

                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>pasword reset link send Succsfully in Your Email</p> : ""}
                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>

                        <button className='btn' onClick={sendLink}>Send</button>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default ResetPassword