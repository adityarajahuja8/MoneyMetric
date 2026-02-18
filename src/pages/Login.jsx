import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FiTrendingUp } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }
        try {
            setLoading(true);
            await login(email, password);
            toast.success("Welcome back!");
            navigate("/");
        } catch (err) {
            toast.error(err.message || "Failed to log in");
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogleLogin() {
        try {
            setLoading(true);
            await loginWithGoogle();
            toast.success("Welcome!");
            navigate("/");
        } catch (err) {
            toast.error(err.message || "Google sign-in failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-bg-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>
            <div className="auth-card">
                <div className="auth-logo">
                    <FiTrendingUp />
                    <span>Money Metric</span>
                </div>
                <h2>Welcome Back</h2>
                <p className="auth-subtitle">Sign in to manage your finances</p>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <HiOutlineMail className="input-icon" />
                        <input
                            id="login-email"
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                    </div>
                    <div className="input-group">
                        <HiOutlineLockClosed className="input-icon" />
                        <input
                            id="login-password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>
                    <button
                        id="login-submit"
                        type="submit"
                        className="auth-btn"
                        disabled={loading}
                    >
                        {loading ? "Signing in…" : "Sign In"}
                    </button>
                </form>
                <div className="auth-divider" style={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
                    <span>or</span>
                </div >
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                        id="google-login"
                        className="google-btn"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                    >
                        <FcGoogle className="google-icon" />
                        Sign in with Google
                    </button>
                </div>
                <p className="auth-footer">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}
