import {Heading} from "../components/Heading"
import {Button} from "../components/Button"
import {SubHeading} from "../components/SubHeading"
import {InputBox} from "../components/InputBox"
import {BottomWarning} from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signin=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"}></Heading>
        <SubHeading label={"Enter your email and password"}></SubHeading>
        <InputBox onChange={(e)=>{
             setEmail(e.target.value);
        }} label={"Email"} placeholder={"johndaniel@gmail.com"}></InputBox>
        <InputBox onChange={(e)=>{
                setPassword(e.target.value);
        }} label={"Password"} placeholder={"12345678"}></InputBox>
        <div className="pt-4">
        <Button onClick={async ()=>{
            
             await axios.post("http://localhost:3000/api/v1/user/signin",{
                username:email,
                password:password
                

            }).then(response=>{
            
            if(response.data.message === "Login Success"){
                window.alert("Login Success");
            localStorage.setItem("token",response.data.token);
            navigate("/dashboard")
            }
            
            else{
                console.log(response.data.message);
                window.alert("Invalid Credentials");
            }
            })
            .catch((error)=>{
                console.log(error);
                window.alert("Incorrect Inputs");
            })
            
        
        }} label={"Signin"}></Button>
        </div>
        <BottomWarning label={"Doesn't Have an Account?"} buttontext={"Sign up"} to={"/signup"}></BottomWarning>
        </div>
        </div>
    </div>
}