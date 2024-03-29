import { useState, useRef, useContext } from "react";
import classes from "./AuthForm.module.css";
import AuthCtx from "../../Store/AuthCtx";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const ctx = useContext(AuthCtx);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setisLoading(true);

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      //login to the existing
      const resp = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVJECc_XtkM-R9D52Lrqc7aKZD7jzRZt0",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (resp.ok) {
        const respData = await resp.json();
        ctx.login(respData.idToken) 
        ctx.isLoggedIn = true;
      } else {
        const errorData = await resp.json();
        console.error("Failed to Login:", errorData.error.message);
        alert(errorData.error.message);
      }
    } else {
      //create new account
      const resp = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVJECc_XtkM-R9D52Lrqc7aKZD7jzRZt0",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (resp.ok) {
        console.log("user added");
      } else {
        const errorData = await resp.json();
        console.error("Failed to add user:", errorData.error.message);
        alert(errorData.error.message);
      }
    }
    setisLoading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {isLoading ? (
            <p style={{ color: "white" }}>Sending request...</p>
          ) : (
            <button type="submit">
              {isLogin ? "Login" : "Create Account"}
            </button>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;