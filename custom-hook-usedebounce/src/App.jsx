import { useMemo, useState } from "react";
import useDebounce from "./hooks/useDebounce";
import "./App.css";

const products = [
  { id: 1, name: "iPhone 16", category: "Mobile" },
  { id: 2, name: "Samsung Galaxy S25", category: "Mobile" },
  { id: 3, name: "MacBook Air", category: "Laptop" },
  { id: 4, name: "Dell XPS 15", category: "Laptop" },
  { id: 5, name: "iPad Air", category: "Tablet" },
  { id: 6, name: "Sony Headphones", category: "Accessories" },
  { id: 7, name: "Apple Watch", category: "Accessories" },
  { id: 8, name: "Lenovo ThinkPad", category: "Laptop" },
];

function App() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const filteredProducts = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    return products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }, [debouncedSearch]);

  const handleClear = () => {
    setSearch("");
  };

  return (
    <div className="container">
      <h1>Product Search</h1>

      <p className="subtitle">
        Search products with a 500 ms debounce.
      </p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search products"
        />

        {search && (
          <button
            className="clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>

      <p className="search-info">
        {search !== debouncedSearch
          ? "Waiting for you to stop typing..."
          : `${filteredProducts.length} product(s) found`}
      </p>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.category}</p>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="empty-message">No products found.</p>
      )}
    </div>
  );
}

export default App;