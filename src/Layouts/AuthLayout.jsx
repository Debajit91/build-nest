import { Outlet } from 'react-router';
import Logo from '/Logo.png'


export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F1C2C] to-[#928DAB] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <img src={Logo} alt="" />
          <p className="text-sm text-gray-500">Your Building, Your Control</p>
        </div>

        {/* Outlet renders Login, Register, etc. */}
        <Outlet />
      </div>
    </div>
  );
}
