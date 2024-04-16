import { Navigate } from "react-router-dom";
import LoginForm from "../../Components/LoginForm";
import { verifyUserJWT } from "../../Utils/verifyUserJWT";

function LoginPage() {
  const userLogged = verifyUserJWT();

  return userLogged ? <Navigate to="/user/home" /> : <LoginForm />;
}

export default LoginPage;
