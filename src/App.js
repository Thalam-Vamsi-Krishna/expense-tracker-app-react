import { Fragment, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import AuthContext from "./components/Store/AuthContext";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        {authCtx.isLoggedIn && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
        {!authCtx.isLoggedIn && <Route path="/auth" element={<AuthForm />} />}
      </Routes>
    </Fragment>
  );
}
export default App;
