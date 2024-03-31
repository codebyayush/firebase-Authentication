import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useContext } from "react";
import AuthCtx from "./Store/AuthCtx";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const ctx = useContext(AuthCtx);

  return (
    <Layout>
    <Switch>
      <Route path="/" exact component={HomePage} />
        {ctx.isLoggedIn ? (
          <Route path="/profile" exact component={UserProfile} />
        ) : (
          <Route path="/auth" exact component={AuthPage} />
        )}
      <Route path="*" component={Redirect}/>
      
    </Switch>
    </Layout>
  );
}

export default App;