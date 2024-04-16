import { Navigate } from 'react-router-dom';
import AdminLoginForm from '../../Components/AdminLoginForm'
import { verifyAdminJWT } from '../../Utils/verifyAdminJWT';

function AdminLoginPage() {

  const adminLogged = verifyAdminJWT();

  return adminLogged ? <Navigate to="/admin/dashboard" /> : <AdminLoginForm />;
}

export default AdminLoginPage
