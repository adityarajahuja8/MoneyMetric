import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiTrendingUp, FiLogOut } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import toast from "react-hot-toast";

export default function Navbar() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logout();
            toast.success("Logged out");
            navigate("/login");
        } catch {
            toast.error("Failed to log out");
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <FiTrendingUp className="navbar-logo-icon" />
                <span className="navbar-logo-text">Money Metric</span>
            </div>
            <div className="navbar-right">
                <ThemeToggle />
                <div className="navbar-user">
                    <div className="navbar-avatar">
                        {currentUser?.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="navbar-email">{currentUser?.email}</span>
                </div>
                <button id="logout-btn" className="navbar-logout" onClick={handleLogout}>
                    <FiLogOut />
                    <span>Logout</span>
                </button>
            </div>
        </nav>
    );
}
