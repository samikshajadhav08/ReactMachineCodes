import { createContext, useContext, useState } from "react";
import "./App.css";

// Sample products
const products = [
  { id: 1, name: "Wireless Headphones", price: 1999 },
  { id: 2, name: "Mechanical Keyboard", price: 3499 },
  { id: 3, name: "Wireless Mouse", price: 999 },
  { id: 4, name: "Laptop Stand", price: 1499 },
];

// 1. Create Context
const CartContext = createContext(null);

// 2. Create Provider
function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add product or increase its quantity
  const addToCart = (product) => {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return previousItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousItems, { ...product, quantity: 1 }];
    });
  };

  // Update product quantity
  const updateQuantity = (id, change) => {
    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + change),
            }
          : item
      )
    );
  };

  // Remove a product
  const removeFromCart = (id) => {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.id !== id)
    );
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total quantity
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 3. Custom hook for accessing Context
function useCart() {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}

// 4. Product Card
function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-icon">🛍️</div>

      <h3>{product.name}</h3>

      <p className="price">
        ₹{product.price.toLocaleString("en-IN")}
      </p>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

// 5. Product List
function ProductList() {
  return (
    <section className="products-section">
      <h2>Products</h2>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

// 6. Shopping Cart
function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <section className="cart-section">
      <div className="cart-heading">
        <h2>
          Your Cart <span>({totalItems})</span>
        </h2>

        {cartItems.length > 0 && (
          <button className="clear-btn" onClick={clearCart}>
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>₹{item.price.toLocaleString("en-IN")} each</p>
                </div>

                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity === 1}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>

                <p className="item-total">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </p>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <p>
              Total Products: <strong>{totalItems}</strong>
            </p>

            <h3>
              Total: ₹{totalPrice.toLocaleString("en-IN")}
            </h3>

            <button className="checkout-btn" onClick={() => alert("Checkout demo!")}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
}

// 7. Main App
function App() {
  return (
    <CartProvider>
      <main className="app-container">
        <header className="app-header">
          <h1>ShopEase</h1>
          <p>A React Context API Shopping Cart</p>
        </header>

        <ProductList />
        <Cart />
      </main>
    </CartProvider>
  );
}

export default App;