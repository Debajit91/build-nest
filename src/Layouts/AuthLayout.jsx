import { Link, Outlet } from 'react-router';
import Logo from '/Logo.png'


export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-base-200/60 login rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <Link to="/">
          <img src={Logo} alt="" /></Link>
          <p className="text-sm text-black">Your Building, Your Control</p>
        </div>

        {/* Outlet renders Login, Register, etc. */}
        <Outlet />
      </div>
    </div>
  );
}
