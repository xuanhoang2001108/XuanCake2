import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { ToastContainer, toast } from "react-toastify";
function SignIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpMode, setSignUpMode] = useState(false);

  const swapToSignUpHandle = () => {
    setSignUpMode(true);
  };
  const swapToSignInHandle = () => {
    setSignUpMode(false);
  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        toast.success("Registration successful!", { autoClose: 1000 });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage);
        toast.error(errorMessage);
      });
  };

  const handleLogin = () => {
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setIsLoggedIn(true);
        toast.success("Registration successful!", { autoClose: 1000 });
        navigate(user.email === "admin@gmail.com" ? "/CakeManagement" : "/");
        localStorage.setItem("email", user.email);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.error(errorMessage);
      });
  };
  useEffect(() => {
    const handleBackButton = (event) => {
      if (!isLoggedIn) {
        event.preventDefault();
        navigate("/Login");
      }
    };
  
    window.addEventListener("popstate", handleBackButton);
  
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [isLoggedIn, navigate]);
  return (
    <div
      className={
        signUpMode ? "login_container" : "login_container sign-up-mode"
      }
    >
      {" "}
      
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username or email"
                name="login_email"
                id="login_email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="login_password"
                placeholder="Password"
                id="login_password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input
              type="button"
              className="login-btn"
              value="Sign in"
              id="login"
              name="login"
              onClick={handleLogin}
            />

            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
          <form action="#" className="sign-up-form">
            <h2 className="title">Sign up</h2>

            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input
              type="button"
              className="login-btn"
              value="Sign up"
              id="register"
              name="register"
              onClick={handleRegister}
            />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>Register now, you can join the colorful cakes world!</p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={swapToSignInHandle}
            >
              Sign up
            </button>
          </div>
          <img src="images/log2.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>Cake make you happier than normal.</p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={swapToSignUpHandle}
            >
              Sign in
            </button>
          </div>
          <img src="images/register3.svg" className="image" alt="" />
        </div>
      </div><ToastContainer />
    </div>
  );
}

export default SignIn;
