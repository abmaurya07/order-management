import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterCard = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [userData, setUserData] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("Users")) {
      setUserData(JSON.parse(localStorage.getItem("Users")));
    }
  }, []);

  function checkValidation() {
    let status = false;
    let regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (fullName === "") {
      setErrorMsg("Please Enter Full Name!");
      return status;
    } else if (email === "" || regex.test(email) === false) {
      setErrorMsg("Please Enter Valid Email!");
      return status;
    } else if (userData.some((e) => e.email == email) == true) {
      setErrorMsg("Email already exists");
      return status;
    } else if (password === "") {
      setErrorMsg("Please Enter Password");
      return status;
    } else if (confirmPass === "") {
      setErrorMsg("Please Enter the confirm password!");
      return status;
    } else if (password !== confirmPass) {
      setErrorMsg("Passowrd & Confirm password does not match!");
      return status;
    } else if (password.length < 8) {
      setErrorMsg("Password Length is too short! Minimum character - 8");
      return status;
    } else {
      setErrorMsg();
      status = true;
      return status;
    }
  }

  const handleSubmit = () => {
    let users;
    if (localStorage.getItem("Users") == undefined) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("Users"));
    }
    let payload = {
      fullName: fullName,
      email: email,
      password: password,
    };

    users.push(payload);

    let tet = payload;

    localStorage.setItem("Users", JSON.stringify(users));
    navigate("/login");
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container  h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 ">
                <div className="mb-md-3 mt-md-4 pb-3">
                  <h2 className="fw-bold pb-2 ">SIGN UP</h2>
                  <p className="text-white-50 mb-3">
                    Please enter your details!
                  </p>
                  <div className="form-outline form-white mb-2">
                    <label className="form-label" for="fullName">
                      Full Name
                    </label>

                    <input
                      type="text"
                      id="fullName"
                      className="form-control form-control-lg"
                      onChange={(e) => {
                        setFullName(e.target.value);
                      }}
                    />
                  </div>{" "}
                  <div className="form-outline form-white mb-2">
                    <label className="form-label" for="email">
                      Email Address
                    </label>

                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-lg"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>{" "}
                  <div className="form-outline form-white mb-2">
                    <label className="form-label" for="password">
                      Password
                    </label>

                    <input
                      type="password"
                      id="password"
                      className="form-control form-control-lg"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-outline form-white mb-2">
                    <label className="form-label text-right" for="confirmPass">
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      id="confirmPass"
                      className="form-control form-control-lg"
                      onChange={(e) => {
                        setConfirmPass(e.target.value);
                      }}
                    />
                  </div>
                  <p className="text-danger">{errorMsg}</p>
                  <button
                    className="btn btn-outline-light btn-lg mt-3"
                    type="submit"
                    onClick={() => {
                      checkValidation() === true
                        ? handleSubmit()
                        : console.log("Invalid Data");
                    }}
                  >
                    Sign Up
                  </button>
                </div>

                <div>
                  <p className="mb-0">
                    Already have and account?{" "}
                    <a
                      href="#!"
                      className="text-white-50 fw-bold"
                      onClick={() => navigate("/login")}
                    >
                      Login
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
export default RegisterCard;
