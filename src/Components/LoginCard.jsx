import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginCard = ({setIsLoggedIn}) => {
  const navigate = useNavigate();
  const [email, setEmail] =useState ()
  const [password, setPassword] =useState ()
  const [userData, setUserData] = useState()
  const [errorMsg, setErrorMsg] = useState()
  console.log("userData", userData)
  useEffect( () => {
    if(localStorage.getItem('Users')){
      setUserData(JSON.parse( localStorage.getItem('Users')))
    }
  },[])

  function checkValidation() {
    console.log("email", email, 'password', password)
    let status = false;
    let regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
   
    if (email === "" || regex.test(email) === false)
       {
        setErrorMsg("Please Enter Valid Email!")
        return status;
       }else if (password === "") {
        setErrorMsg("Please Enter Password")
        return status;
       }else if (!userData){
        setErrorMsg("User not found. Please register.")
        return status;
       }else if(userData.some((e) => e.email == email) == false){
        setErrorMsg("Email or Password is wrong!")
        return status;
       }
       else if (userData.some((e) => e.password == password) ==false) {
        setErrorMsg("Email or Password is wrong!")
        return status;
       }
       else {
         setErrorMsg()
        status = true
        return status}
    }
  
    const handleSubmit = () => {
      let UserDetails = userData.filter((e) => e.email === email)
      console.log("userDetail", UserDetails)
      localStorage.setItem("isLoggedIn", true)
      localStorage.setItem("userData", JSON.stringify(UserDetails))
      setIsLoggedIn(true)
      navigate("/home")
    }

  return (
    <section className="vh-100 gradient-custom">
      <div className="container  h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-3">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-3">
                    Please enter your email and password!
                  </p>

                  <div className="form-outline form-white mb-2">
                    <label className="form-label" for="email">
                      Email
                    </label>

                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-lg"
                      onChange={(e) => {setEmail(e.target.value)}}
                    />
                  </div>

                  <div className="form-outline form-white mb-2">
                    <label
                      className="form-label text-right"
                      for="password"
                     
                    >
                      Password
                    </label>

                    <input
                      type="password"
                      id="password"
                      className="form-control form-control-lg"
                      onChange={(e) => {setPassword(e.target.value)}}
                    />
                  </div>

                  <p className="small mb-5 pb-lg-2">
                    <a className="text-white-50" href="#!">
                      Forgot password?
                    </a>
                  </p>
                  <p className="text-danger">{errorMsg}</p>
                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={() => {checkValidation()=== true ? handleSubmit() : console.log("invalid Data")}}
                  >
                    Login
                  </button>
                </div>

                <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <a
                      href="#!"
                      className="text-white-50 fw-bold"
                      onClick={() => navigate("/register")}
                    >
                      Sign Up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LoginCard;
