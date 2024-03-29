import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import AuthCtx from "../../Store/AuthCtx";

const MainNavigation = () => {
  const ctx = useContext(AuthCtx);

  const logoutHandler = () => {
    ctx.logout();
    console.log("token deleted.");
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        {ctx.isLoggedIn ? (
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/auth">Login</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default MainNavigation;
