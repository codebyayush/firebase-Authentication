import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useContext } from "react";
import AuthCtx from "./Store/AuthCtx";

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
    </Switch>
    </Layout>
  );
}

export default App;