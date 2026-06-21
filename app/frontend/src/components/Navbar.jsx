import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>🌶️ SpiceBay</Link>
      <div style={styles.links}>
        <Link to="/products" style={styles.link}>Products</Link>
        {user ? (
          <>
            <span style={styles.welcome}>Hi, {user.full_name}</span>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", background: "#b5451b", color: "white" },
  brand: { color: "white", textDecoration: "none", fontSize: "1.5rem", fontWeight: "bold" },
  links: { display: "flex", alignItems: "center", gap: "1.5rem" },
  link: { color: "white", textDecoration: "none", fontSize: "1rem" },
  welcome: { color: "#ffd700", fontSize: "0.9rem" },
  button: { background: "white", color: "#b5451b", border: "none", padding: "0.4rem 1rem", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" },
};