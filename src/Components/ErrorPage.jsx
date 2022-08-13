import { useEffect } from "react";
import ErrorImage from "../assets/images/errImg.gif"
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
const navigate= useNavigate()
    useEffect( () => {
        setTimeout(() => {
            navigate("/login")
           }, 5000)
    }, [])

return  (
    <div >
      <img src={ErrorImage} height="600"
            width="100%" />


    </div>

)
}
export default ErrorPage;