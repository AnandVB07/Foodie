import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css';
import StoreContext from '../../contexts/StoreContext';
import axios from 'axios';
const LoginPopup = ({ setShowLogin }) => {
    const{url,setToken}=useContext(StoreContext)
    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name:"",
        email:"",
        password:""
    });

    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}));
    }

    const onLogin=async(event)=>{
        event.preventDefault()
        let newUrl=url;
        if(currState==="Login")
        {
            newUrl+="/api/user/login";
        }
        else
        {
            newUrl+="/api/user/register";
        }

        const response = await axios.post(newUrl,data);

        if(response.data.success)
        {
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false);
        }

        else{
            alert(response.data.message);
        }

    }

    useEffect(()=>
    {
        console.log(data);

    },[data])

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYPu9jbcJSZCLr052gw48anJLRWXVrUwmCgA&s' alt='exit' />
                </div>
                <div className="login-popup-elements">
                    {currState === "Login" ? <></> : <input type='text'name='name' onChange={onChangeHandler} value={data.name} placeholder='Your Name:' required />}

                    <input type='email' name='email' onChange={onChangeHandler} value={data.email} placeholder='Your Email:' required />
                    <input type='password' name='password' onChange={onChangeHandler} value={data.password} placeholder='Password:' required />
                    <button type='submit'>{currState === "Sign up" ? "Create an account" : "Login"}</button>
                </div>

                <div className="login-popup-conditions">
                    <input type='checkbox' required />
                    <p>By continuing, I agree to the terms and conditions</p>
                </div>
                <div className='login-popup-change'>
                    {currState === "Login" ? <p>New to Foodie? <span style={{ color: "red" }} onClick={() => setCurrState("Sign up")}>Click here</span></p>
                        : <p>Aldready have an account?<span onClick={() => setCurrState("Login")}>Login here</span></p>}
                </div>

            </form>



        </div>
    )
}

export default LoginPopup