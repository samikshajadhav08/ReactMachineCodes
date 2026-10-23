
import { useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Headphones", price: 120 },
  { id: 2, name: "Keyboard", price: 80 },
  { id: 3, name: "Wireless Mouse", price: 35 },
  { id: 4, name: "Laptop Stand", price: 50 },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );
  };

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <h1>Mini Store</h1>
      <p>Cart items: {totalItems}</p>

      <h2>Products</h2>

      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p>
                  ${item.price.toFixed(2)} × {item.quantity}
                </p>
                <p>
                  Subtotal: $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2>Total: ${totalPrice.toFixed(2)}</h2>

          <button onClick={() => setCart([])}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default App;
