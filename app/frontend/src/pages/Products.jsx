import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (searchTerm = "") => {
    try {
      const res = await api.get(`/api/products/${searchTerm ? `?search=${searchTerm}` : ""}`);
      setProducts(res.data.products);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchProducts(e.target.value);
  };

  if (loading) return <div style={styles.center}>Loading spices... 🌶️</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Our Spices</h1>
      <input
        style={styles.search}
        placeholder="Search spices..."
        value={search}
        onChange={handleSearch}
      />
      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p.id} style={styles.card}>
            <div style={styles.emoji}>🌿</div>
            <h3 style={styles.name}>{p.name}</h3>
            <p style={styles.origin}>📍 {p.origin}</p>
            <p style={styles.description}>{p.description}</p>
            <div style={styles.footer}>
              <span style={styles.price}>${p.price}</span>
              <span style={styles.stock}>{p.stock} in stock</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "2rem", maxWidth: "1200px", margin: "0 auto" },
  title: { textAlign: "center", color: "#b5451b", fontSize: "2rem", marginBottom: "1.5rem" },
  search: { display: "block", margin: "0 auto 2rem", padding: "0.7rem 1.5rem", width: "100%", maxWidth: "400px", borderRadius: "30px", border: "2px solid #b5451b", fontSize: "1rem", outline: "none" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.5rem" },
  card: { border: "1px solid #eee", borderRadius: "8px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", transition: "transform 0.2s" },
  emoji: { fontSize: "2.5rem", textAlign: "center", marginBottom: "0.5rem" },
  name: { color: "#b5451b", marginBottom: "0.3rem" },
  origin: { color: "#888", fontSize: "0.85rem", marginBottom: "0.5rem" },
  description: { fontSize: "0.9rem", color: "#555", marginBottom: "1rem" },
  footer: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  price: { fontWeight: "bold", color: "#b5451b", fontSize: "1.2rem" },
  stock: { fontSize: "0.8rem", color: "#888" },
  center: { textAlign: "center", padding: "4rem", fontSize: "1.2rem" },
};