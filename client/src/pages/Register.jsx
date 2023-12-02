import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import axios from "axios";

const Register = () => {
  // Create state variables for input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("+91");
  const [toggle, setToggle] = useState(false);
  const [otp, setOtp] = useState("");

  const dob = "24-11-1952";

  const navigate = useNavigate();
  const generateRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha",
        {
          size: "invisible",
          callback: (response) => {},
        },
        auth
      );
    }
  };
  const HandleChange = (e) => {
    const inputValue = e.target.value;

    if (!inputValue.startsWith("+91")) {
      setMobileNo("+91");
    } else {
      setMobileNo(inputValue);
    }
  };

  // Function to handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !mobileNo) {
      console.log("fil all the fields");
    } else {
      await axios
        .post(
          "http://localhost:8000/login",
          {
            mobile: mobileNo,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "access-control-allow-origin",
            },
          }
        )
        .then((data) => {
          if (data.status === 200) {
            console.log(data);
          }
        })
        .catch((err) => {
          console.log("Error: " + err.response.data.message); //handle user if it is not registered
          setToggle(true);
            generateRecaptcha();
            let appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(auth, mobileNo, appVerifier)
              .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
              })
              .catch((error) => {
                console.log(error.response.data.message);
              });
        });
    }
  };

  const onOtpChange = (event) => {
    let otp = event.target.value;
    setOtp(otp);
  };
  const verifyOTP = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          console.log(result);
          //  if(result){
          axios
            .post(
              "http://localhost:8000/register",
              {
                name: name,
                mobile: mobileNo,
                email: email,
                DoB: dob,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Headers": "access-control-allow-origin",
                },
              }
            )
            .then((data) => {
              if (data.status === 201) {
                navigate('/dashboard')
                console.log(data);
                alert(data.data.message);
              }
            })
            .catch((error) => {
              console.log(error);
            });
          //  }
        })
        .catch((error) => {
          alert("Invalid code ");
        });
    }
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#fffbef" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="container my-4 card text-black border-none py-2 shadow-sm">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>
                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          {/* <i className="fas fa-user fa-lg me-3 fa-fw"></i> */}
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="formName"
                              className="form-control"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                            <label className="form-label" htmlFor="formName">
                              Your Name
                            </label>
                          </div>
                        </div>
                       
                        <div className="d-flex flex-row align-items-center mb-4">
                          {/* <i className="fas fa-envelope fa-lg me-3 fa-fw"></i> */}
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="formEmail"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="form-label" htmlFor="formEmail">
                              Your Email
                            </label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          {/* <i className="fas fa-user fa-lg me-3 fa-fw"></i> */}
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="formMobileNo"
                              className="form-control"
                              value={mobileNo}
                              onChange={HandleChange}
                            />
                            <label
                              className="form-label"
                              htmlFor="formMobileNo"
                            >
                              Mobile No
                            </label>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          {toggle ? (
                            <div className="text-center">
                              <h3>Enter OTP here -</h3>
                              <input
                                type="text"
                                value={otp}
                                onChange={onOtpChange}
                                id=""
                              />
                              <button
                                className="btn btn-success custom-btn"
                                onClick={verifyOTP}
                              >
                                Submit OTP
                              </button>
                            </div>
                          ) : (
                            <div className="text-center justify-content-center mx-4 mb-3 mb-lg-4">
                              <label
                                className="form-check-label"
                                htmlFor="form2Example3"
                              >
                                already have account{" "}
                                <Link
                                  className="text-muted text-decoration-none"
                                  to="/"
                                >
                                  Login
                                </Link>
                              </label>
                              <br />

                              {/* <button
                              type="submit"
                              className="btn btn-primary btn-lg"
                            >
                              Register
                            </button> */}
                              <div className="d-grid gap-2">
                                <button
                                  className="btn btn-success custom-btn"
                                  // type="button"
                                  onClick={handleRegister}
                                >
                                  Register
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="recaptcha"></div>
      </section>
    </>
  );
};

export default Register;
