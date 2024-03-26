import { useNavigate } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import { Button } from "../components/Button"

export const Home = ()=>{
    const navigate = useNavigate();
    return <div>
        <Appbar></Appbar>
        <div className="h-screen flex justify-center">
            <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
            <h1 className="text-4xl">Welcome to Payment Application</h1>
            <h2 className="text-2xl flex justify-center py-10">Payments Made Easy</h2>
            <div>
            <Button label={"Signin"} onClick={()=>{
                navigate("/Signin")
            }}></Button>
            </div>
            </div>
            </div>
            
            
            
        
        </div>
        

    </div>
}