
import { useEffect, useState } from "react";
import "./App.css";

const productsData = [
  { id: 1, title: "iPhone 15", price: 799 },
  { id: 2, title: "Samsung Galaxy S24", price: 699 },
  { id: 3, title: "MacBook Air", price: 1099 },
  { id: 4, title: "Sony Headphones", price: 199 },
  { id: 5, title: "iPad Air", price: 599 },
  { id: 6, title: "Dell Laptop", price: 899 },
];

function App() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const filteredProducts = productsData.filter((product) =>
    product.title
      .toLowerCase()
      .includes(debouncedSearch.trim().toLowerCase())
  );

  return (
    <div className="container">
      <h1>Debounced Product Search</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>
        Results: {filteredProducts.length}
      </p>

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
