import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

const LIMIT = 10;
const API_URL = "https://dummyjson.com/products";

function App() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);
  const loadingRef = useRef(false);

  const loadProducts = useCallback(async () => {
    // Prevent overlapping requests
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}?limit=${LIMIT}&skip=${skip}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }

      const data = await response.json();

      setProducts((previousProducts) => [
        ...previousProducts,
        ...data.products,
      ]);

      setSkip((previousSkip) => previousSkip + data.products.length);

      setHasMore(
        skip + data.products.length < data.total
      );
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [skip, hasMore]);

  // Fetch the first batch and subsequent batches
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Observe the last product
  const lastProductRef = useCallback(
    (node) => {
      if (loading || !hasMore || error) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadProducts();
          }
        },
        {
          root: null,
          rootMargin: "200px",
          threshold: 0,
        }
      );

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [loading, hasMore, error, loadProducts]
  );

  // Clean up the observer when the component unmounts
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="container">
      <h1>Infinite Scroll Products</h1>

      <p className="subtitle">
        Scroll down to automatically load more products.
      </p>

      <div className="product-grid">
        {products.map((product, index) => {
          const isLastProduct = index === products.length - 1;

          return (
            <div
              className="product-card"
              key={product.id}
              ref={isLastProduct ? lastProductRef : null}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                loading="lazy"
              />

              <div className="product-info">
                <h2>{product.title}</h2>

                <p className="category">
                  {product.category}
                </p>

                <p className="price">
                  ${product.price.toFixed(2)}
                </p>

                <p className="rating">
                  ⭐ {product.rating}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {loading && (
        <p className="status" role="status">
          Loading more products...
        </p>
      )}

      {error && (
        <div className="status">
          <p>{error}</p>
          <button onClick={loadProducts}>
            Try Again
          </button>
        </div>
      )}

      {!hasMore && !error && products.length > 0 && (
        <p className="status">
          🎉 You've reached the end!
        </p>
      )}
    </div>
  );
}

export default App;