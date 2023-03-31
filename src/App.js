import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import Verification from "./components/Auth/Verification";
import Reset from "./components/Auth/ResetPassword";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/forget" element={<Reset />} />
        {isLoggedIn && (
          <>
            <Route path="/verification" element={<Verification />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
        {!isLoggedIn && <Route path="/auth" element={<AuthForm />} />}
      </Routes>
    </Fragment>
  );
}
export default App;
