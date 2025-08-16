import { Outlet } from 'react-router';
import Logo from '/Logo.png'


export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-base-200/60 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <img src={Logo} alt="" />
          <p className="text-sm">Your Building, Your Control</p>
        </div>

        {/* Outlet renders Login, Register, etc. */}
        <Outlet />
      </div>
    </div>
  );
}
