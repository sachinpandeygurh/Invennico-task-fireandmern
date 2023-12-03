import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import Image from "../src/img/cart/Mobile 1.png";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Cart21Login = ({ handleLogin }) => {
  const [number, setNumber] = useState("+91");
  const [otp, setOtp] = useState("");
  const [toggle, setToggle] = useState(false);
  const [userData, setUserData] = useState([]);
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");

  const HandleChange = (e) => {
    const inputValue = e.target.value;

    if (!inputValue.startsWith("+91")) {
      setNumber("+91");
    } else {
      setNumber(inputValue);
    }
  };

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
          localStorage.setItem("user", JSON.stringify(userData));
          handleLogin(true);
        })
        .catch((error) => {
          alert("Invalid code ");
        });
    }
  };

  const goForOTP = () => {
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, number, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log(error);
      });
    setToggle(true);
  };

  const verifyMobile = async () => {
    if (!number) {
      console.log("Please enter the number first");
    } else {
      await axios
        .post(
          "https://invennicotask.onrender.com//login",
          {
            mobile: number,
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
            setUserData(data.data.user);
            setToggle(true);
            goForOTP();
            console.log(data);
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Error: " + err.response.data.message);
        });
    }
  };

  const submit = (e) => {
    e.preventDefault();
    verifyMobile();
  };

  useEffect(() => {
  
  }, []);

  const handleClick = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);

      if (!user) {
        alert("User not authorized");
        return;
      }
      const userData = {
        email: user.email,
        photo: user.photoURL,
        name: user.displayName,
        mobile: user.phoneNumber || "+91 8319697083",
        DoB: "12-03-1999",
      };
      console.log("userData",userData);

      const response = await axios.put(
        "https://invennicotask.onrender.com/update",
        {
          email: userData.email,
          mobile: userData.mobile,
          DoB: userData.DoB,
          name: userData.name,
          photo: userData.photo,
          },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "access-control-allow-origin",
          },
        }
        );
        console.log("userData", userData);

      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(userData));
        handleLogin(true);
      }
    } catch (error) {
      console.error(error);
      alert("Error: " + error.response?.data?.message || "An error occurred");
    }
    // console.log("userData", userData);
    console.log("JSON.stringify(userData)", JSON.stringify(userData));
   
  };
  return (
    <>
      <div className="container-fluid bgc">
        <div className="">
          <div className="container">
            <div className="login-main">
              <div className="col">
                <div className="row">
                  <div className="login-img">
                    {/* <img src={Image} alt="loginimage" /> */}
                  </div>
                </div>
                <div className="container login-flex shadow-sm">
                  <h2 className="text-center " style={{ color: "#70442A" }}>
                    Login
                  </h2>
                  <div className="row login-input">
                    <div className="row">
                      <form>
                        <div className="mobileInputContainer">
                          <div className="form-group ">
                            <input
                              id=""
                              type="tel"
                              className="form-control mobileNumberInput form-contact-input "
                              maxLength="13"
                              value={number}
                              onChange={HandleChange}
                            />
                            <span className="placeholderAlternative mobileNumber">
                              IN
                              <span
                                style={{
                                  padding: "0px 10px",
                                  position: "relative",
                                  bottom: "1px",
                                }}
                              >
                                |
                              </span>
                            </span>
                          </div>
                          {/* <div className="midLinks">
                            By continuing i agree to the Term Of use & privacy
                            policy
                          </div> */}
                          <div className="midLinks">
                            <span className="text-dark mx-2 fw-bold">
                              Do not have account
                            </span>
                            <Link
                              className="text-muted text-decoration-none"
                              to="/register"
                            >
                              Register
                            </Link>
                          </div>
                        </div>
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
                          <div className="d-grid gap-2">
                            <button
                              className="btn btn-success custom-btn"
                              onClick={submit}
                            >
                              Login
                            </button>
                          </div>
                        )}
                      </form>
                    </div>
                    <div className="text-center">
                      <br />
                      <span className="text-muted">or</span>
                      <br />
                      <br />
                      <Button
                        color="white"
                        className="p-0 border-1"
                        outline
                        onClick={handleClick}
                      >
                        <span className="d-flex align-items-center ">
                          <span className="fa fa-google text-danger fa-2x bg-white p-2 rounded"></span>
                          <span className="text-white p-2">
                            {email
                              ? "Continue with Google"
                              : "Login with Google"}
                          </span>
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="recaptcha"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart21Login;