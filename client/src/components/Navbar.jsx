import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BrainCircuit, LogOut, Users, PlusCircle } from 'lucide-react';
import clsx from 'clsx';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-white to-green-50/30 backdrop-blur-md sticky top-0 z-50 border-b-2 border-green-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-2 rounded-lg group-hover:shadow-lg group-hover:shadow-green-300 transition-all">
                <BrainCircuit size={24} />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">AI<span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">HR</span></span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors font-medium">
                  <Users size={18} />
                  Employees
                </Link>
                <Link to="/add" className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors font-medium">
                  <PlusCircle size={18} />
                  Add Employee
                </Link>
                <Link to="/recommend" className="flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors font-medium">
                  <BrainCircuit size={18} />
                  AI Insights
                </Link>
                <div className="h-6 w-px bg-green-200 mx-2"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-slate-500 hover:text-rose-500 transition-colors font-medium"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-green-600 font-medium transition-colors">Login</Link>
                <Link to="/signup" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-green-300 transition-all">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
