import { useContext, useRef } from "react";
import classes from "./ProfileForm.module.css";
import AuthCtx from "../../Store/AuthCtx";

const ProfileForm = () => {
  const newPassRef = useRef();
  const ctx = useContext(AuthCtx)

  const passwordHandler = async (event) => {
    event.preventDefault();
    const enteredPass = newPassRef.current.value;

    const resp = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBVJECc_XtkM-R9D52Lrqc7aKZD7jzRZt0",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: ctx.token,
          password: enteredPass,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (resp.ok) {
      alert('New Password Updated')
      console.log(resp);
    } else {
      alert('Failed to Update Password')
      console.log(resp);
    }
  };

  return (
    <form className={classes.form} onSubmit={passwordHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPassRef} />
      </div>
      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
