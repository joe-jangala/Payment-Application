import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"



export const Dashboard = ()=>{
    const [balance,setBalance]= useState(0);
    
    useEffect(()=>{
        const getBalance = async ()=>{
       const response = await axios.get("http://localhost:3000/api/v1/account/balance",
        
        {
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        })
        let amnt = response.data.balance;
        setBalance(amnt.toFixed(2));
    }
    getBalance();
    },[balance]);
    
    return <div>
        <Appbar></Appbar>
        <div className="m-8">
        <Balance value={balance}></Balance>
        <Users/>
        </div>
    </div>
}