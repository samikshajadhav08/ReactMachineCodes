import React from 'react'
import './App.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />

      <h2>{product.title}</h2>
      <p>{product.category}</p>
      <p className="price">${product.price}</p>

      <button>View Product</button>
    </div>
  );
}

export default ProductCard;
