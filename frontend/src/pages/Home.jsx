import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const res = await fetch('/api/products');
  //       const data = await res.json();
  //       setProducts(data.slice(0, 4)); // Featured products
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProducts();
  // }, []);
  useEffect(() => {
  const fetchProducts = async (retry = 0) => {
    try {
      const res = await fetch("/api/products");

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log("Retrying...", retry);

      if (retry < 5) {
        setTimeout(() => fetchProducts(retry + 1), 1000);
      } else {
        setLoading(false);
      }
    }
  };

  fetchProducts();
}, []);

  return (
    <div className="home-container">
      <div className="hero-banner">
        <h1>Welcome to NEXCART</h1>
        <p>Discover the best products at unbeatable prices.</p>
      </div>
      <h2>Featured Products</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
