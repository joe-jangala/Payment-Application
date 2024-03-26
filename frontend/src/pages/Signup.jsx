import {Heading} from "../components/Heading"
import {Button} from "../components/Button"
import {SubHeading} from "../components/SubHeading"
import {InputBox} from "../components/InputBox"
import {BottomWarning} from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signup=()=>{
    const [firstName,setFirstName]=useState("");
    const [lastName,setLasttName]=useState(""); 
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();


    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"}></Heading>
        <SubHeading label={"Enter your information to create the account"}></SubHeading>
        <InputBox onChange={(e)=>{
            setFirstName(e.target.value);
        }} label={"First Name"} placeholder={"John"}></InputBox>
        <InputBox onChange={(e)=>{
            setLasttName(e.target.value);
        }} label={"Last Name"} placeholder={"Daniel"}></InputBox>
        <InputBox onChange={(e)=>{
            setUsername(e.target.value);
        }} label={"Email"} placeholder={"johndaniel@gmail.com"}></InputBox>
        <InputBox onChange={(e)=>{
            setPassword(e.target.value);
        }} label={"Password"} placeholder={"12345678"}></InputBox>
        <div className="pt-4">
        <Button onClick={async ()=>{
           const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                username,
                firstName,
                lastName,
                password
            })
            localStorage.setItem("token",response.data.token) 
            navigate("/dashboard");
        }} label={"Signup"}></Button>
        </div>
        <BottomWarning label={"Already Have an Account?"} buttontext={"Signin"} to={"/signin"}></BottomWarning>
        </div>
        </div>
    </div>
}