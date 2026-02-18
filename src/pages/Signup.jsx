import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi";
import { FiTrendingUp } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const { signup, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password || !confirm) {
            toast.error("Please fill in all fields");
            return;
        }
        if (password !== confirm) {
            toast.error("Passwords do not match");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        try {
            setLoading(true);
            await signup(email, password);
            toast.success("Account created!");
            navigate("/");
        } catch (err) {
            toast.error(err.message || "Failed to create account");
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogleSignup() {
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
                <h2>Create Account</h2>
                <p className="auth-subtitle">Start tracking your finances today</p>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <HiOutlineMail className="input-icon" />
                        <input
                            id="signup-email"
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
                            id="signup-password"
                            type="password"
                            placeholder="Password (min 6 chars)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                    </div>
                    <div className="input-group">
                        <HiOutlineLockClosed className="input-icon" />
                        <input
                            id="signup-confirm"
                            type="password"
                            placeholder="Confirm password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            autoComplete="new-password"
                        />
                    </div>
                    <button
                        id="signup-submit"
                        type="submit"
                        className="auth-btn"
                        disabled={loading}
                    >
                        {loading ? "Creating…" : "Create Account"}
                    </button>
                </form>
                <div className="auth-divider" style={{ display: "flex", justifyContent: "center" }}>
                    <span>or</span>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                        id="google-signup"
                        className="google-btn"
                        onClick={handleGoogleSignup}
                        disabled={loading}
                        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                    >
                        <FcGoogle className="google-icon" />
                        Sign up with Google
                    </button>
                </div>
                <p className="auth-footer">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </div>
        </div>
    );
}
