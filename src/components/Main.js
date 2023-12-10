import React from "react";
import {
    Route,
    Routes,
    redirect
  } from "react-router-dom";
import Home from "../UI-Pages/Home";
import Login from "../UI-Pages/Login";
import Signup from "../UI-Pages/Signup";
import Forgotpass from "../UI-Pages/Forgotpass";
import { useState,useEffect } from "react";
import { firebaseAuth } from "../firebase";
import { useNavigate } from "react-router-dom";


function Main(){
    const navigate = useNavigate();
   const [logged,isloggedin]=useState(null);

    useEffect(()=>{
            firebaseAuth.onAuthStateChanged((user)=>{
                if(user){
                    isloggedin(true);
                    console.log(user);
                    navigate("/");
                }else{
                    isloggedin(false);
                    console.log("going to login page")
                    navigate("/login");
                }
            })
    },[logged]);

    if(logged===null)return <h1 style={{marginTop:"50px"}}>loading...</h1>
    return (
        <div>
            <Routes>
            <Route  path="/" element={<Home/>} />

            <Route  path="/login" element={<Login loginsuccess={()=>{
                console.log("going to home");
                isloggedin(true);
                navigate("/");
            }}/>} />

            <Route  path="/signup" element={<Signup loginsuccess={()=>{
                console.log("going to home");
                isloggedin(true);
                navigate("/");
            }}/>} />

            <Route  path="/forgotpassword" element={<Forgotpass/>} />

            </Routes>
        </div>        
    );
}

export default Main;