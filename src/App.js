import { Fragment, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import AuthForm from "./components/Auth/AuthForm";
import AuthContext from "./components/Store/AuthContext";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        {authCtx.isLoggedIn && <Route path="/home" element={<Home />} />}
        {!authCtx.isLoggedIn && <Route path="/auth" element={<AuthForm />} />}
      </Routes>
    </Fragment>
  );
}
export default App;
