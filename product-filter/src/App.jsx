import { useState } from 'react'

import './App.css'

const products=[
   { id: 1, name: "iPhone 15", category: "Electronics", price: 799 },
  { id: 2, name: "Samsung Galaxy", category: "Electronics", price: 650 },
  { id: 3, name: "T-shirt", category: "Clothing", price: 25 },
  { id: 4, name: "Jeans", category: "Clothing", price: 50 },
  { id: 5, name: "Headphones", category: "Accessories", price: 120 },
  { id: 6, name: "Backpack", category: "Accessories", price: 45 },
  { id: 7, name: "MacBook Air", category: "Electronics", price: 1099 },
  { id: 8, name: "Jacket", category: "Clothing", price: 90 },
];
function App() {
  const [category,setCategory]=useState("ALL");
  const [maxPrice,setMaxPrice]=useState("ALL");
  const filteredProducts=products.filter((product)=>{
    const matchCategory=
    category==="ALL"||product.category===category;
    const matchMaxPrice=
    maxPrice==="ALL"||product.price<=Number(maxPrice);
    return matchCategory && matchMaxPrice;
  });
  const resetFilters=()=>{
    setCategory("ALL");
    setMaxPrice("ALL");
  };
  return (
    <>
      <div className="container">
        <h1>Product Store</h1>
        <div className='filters'>
          <div>
            <label htmlFor='category'>Category</label>
            <select id="category" value={category} onChange={(e)=>setCategory(e.target.value)}>
              <option value="ALL">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          <div>
            <label htmlFor='price'>Maximum Price</label>
            <select id="price" value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)}>
              <option value="ALL">All Price</option>
              <option value="50">Up to $50</option>
            <option value="100">Up to $100</option>
            <option value="500">Up to $500</option>
            <option value="1000">Up to $1,000</option>
            </select>
          </div>
        </div>
        <p>Products found: {filteredProducts.length}</p>
        <div className='product-list'>
           {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      <button onClick={resetFilters}>Reset Filters</button>
    </div>
    </div>
    </>
  );
}

export default App;
