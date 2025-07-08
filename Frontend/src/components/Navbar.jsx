import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { auth, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <div className="flex space-x-4">
                <Link to="/" className="text-white hover:underline font-bold text-lg">
                    School Management
                </Link>
            </div>

            <div className="flex items-center space-x-4">
                {auth ? (
                    // Authenticated user UI
                    <>
                        <span className="text-white">
                            Welcome, {auth.user.email}
                        </span>
                        <Link to="/users" className="text-white hover:underline">
                            Users
                        </Link>
                        <Link to="/dashboard" className="text-white hover:underline">
                            Dashboard
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    // Non-authenticated user UI
                    <>
                        <Link 
                            to="/login" 
                            className="text-white hover:underline"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/register" 
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
