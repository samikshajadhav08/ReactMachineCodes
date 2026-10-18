import {useState} from "react";
import "./App.css";
const products = [
  { id: 1, name: "iPhone 15", price: 799 },
  { id: 2, name: "Samsung Galaxy", price: 650 },
  { id: 3, name: "MacBook Air", price: 1099 },
  { id: 4, name: "Sony Headphones", price: 199 },
  { id: 5, name: "iPad Air", price: 599 },
  { id: 6, name: "Dell Laptop", price: 899 },
];
function App() {
  const [sortOption, setSortOption] = useState("default");
  const sortedProducts=[...products].sort((a,b)=>{
    switch(sortOption){
      case "price-asc":
        return a.price -b.price;
      case "price-desc":
        return b.price-a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return a.id-b.id;
    }
  });
  return (
    <div>
      <div className="container">
        <h1>Products Store</h1>
        <label htmlFor="sort">Sort By:</label>
        <select id="sort"
        value={sortOption}
        onChange={(e)=>setSortOption(e.target.value)}>
          <option value="default">Default Order</option>
          <option value="price-asc">Price-low to high</option>
          <option value="price-desc">Price-high to low</option>
          <option value="name-asc">name- A-Z</option>
          <option value="name-desc">name- Z-A</option>
        </select>
        <div className="product-list">
          {sortedProducts.map((product)=>(
            <div className="product-card" key={product.id}>
              <h3>{product.name}</h3>
              <p>Price:${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
