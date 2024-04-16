import { Navigate } from "react-router-dom";
import { verifyUserJWT } from "../Utils/verifyUserJWT";

type Element = {
  children: JSX.Element;
};

function ProtectedUserRoute({ children }: Element) {
  
  const userLogged = verifyUserJWT();

  return userLogged ? <> {children}</> :  <Navigate to="/" /> 
}

export default ProtectedUserRoute;
