import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "", full_name: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/auth/register", form);
      const res = await api.post("/api/auth/login", { email: form.email, password: form.password });
      login(res.data.user, res.data.access_token);
      toast.success("Welcome to SpiceBay");
      navigate("/products");
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🌶️ Join SpiceBay</h2>
        <input style={styles.input} placeholder="Full Name"
          value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
        <input style={styles.input} placeholder="Email" type="email"
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input style={styles.input} placeholder="Password" type="password"
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button style={styles.button} onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>
        <p style={styles.link}>Already have an account? <Link to="/login">Login</Link></p>
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