import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Welcome to SpiceBay 🌶️</h1>
        <p style={styles.subtitle}>
          Premium spices from the spice capital of the world — Kerala, India
        </p>
        <Link to="/products" style={styles.cta}>Shop Now</Link>
      </div>
      <div style={styles.features}>
        <div style={styles.card}>🌿 <h3>100% Natural</h3><p>Directly sourced from Kerala farms</p></div>
        <div style={styles.card}>📦 <h3>Fast Delivery</h3><p>Fresh spices at your doorstep</p></div>
        <div style={styles.card}>⭐ <h3>Premium Quality</h3><p>Hand-picked and sun-dried</p></div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "90vh" },
  hero: { background: "linear-gradient(135deg, #b5451b, #e07b39)", color: "white", textAlign: "center", padding: "5rem 2rem" },
  title: { fontSize: "3rem", marginBottom: "1rem" },
  subtitle: { fontSize: "1.2rem", marginBottom: "2rem", opacity: 0.9 },
  cta: { background: "white", color: "#b5451b", padding: "0.8rem 2rem", borderRadius: "30px", textDecoration: "none", fontWeight: "bold", fontSize: "1.1rem" },
  features: { display: "flex", justifyContent: "center", gap: "2rem", padding: "4rem 2rem", flexWrap: "wrap" },
  card: { textAlign: "center", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", minWidth: "200px" },
};