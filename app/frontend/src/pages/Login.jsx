import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", form);
      login(res.data.user, res.data.access_token);
      toast.success("Welcome back to SpiceBay");
      navigate("/products");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🌶️ Login to SpiceBay</h2>
        <input style={styles.input} placeholder="Email" type="email"
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input style={styles.input} placeholder="Password" type="password"
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button style={styles.button} onClick={handleSubmit} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p style={styles.link}>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", background: "#f9f9f9" },
  card: { background: "white", padding: "2.5rem", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px" },
  title: { textAlign: "center", color: "#b5451b", marginBottom: "1.5rem" },
  input: { display: "block", width: "100%", padding: "0.8rem", marginBottom: "1rem", borderRadius: "6px", border: "1px solid #ddd", fontSize: "1rem", boxSizing: "border-box" },
  button: { width: "100%", padding: "0.9rem", background: "#b5451b", color: "white", border: "none", borderRadius: "6px", fontSize: "1rem", cursor: "pointer", fontWeight: "bold" },
  link: { textAlign: "center", marginTop: "1rem", fontSize: "0.9rem" },
};