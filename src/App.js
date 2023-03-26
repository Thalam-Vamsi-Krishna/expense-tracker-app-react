import { Fragment, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import AuthContext from "./components/Store/AuthContext";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";
import Verification from "./components/Auth/Verification";
import Reset from "./components/Auth/ResetPassword";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        {authCtx.isLoggedIn && (
          <>
            <Route path="/verification" element={<Verification />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
        {!authCtx.isLoggedIn && (
          <>
            <Route path="/auth" element={<AuthForm />} />
            <Route path="/forget" element={<Reset />} />
          </>
        )}
      </Routes>
    </Fragment>
  );
}
export default App;
