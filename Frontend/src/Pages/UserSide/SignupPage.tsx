import { Navigate } from 'react-router-dom';
import SignupLoginForm from '../../Components/SignupLoginForm'
import { verifyUserJWT } from '../../Utils/verifyUserJWT';

function SignupPage() {

  const userLogged = verifyUserJWT();

  return userLogged ? <Navigate to="/user/home" /> : <SignupLoginForm />;
}

export default SignupPage
