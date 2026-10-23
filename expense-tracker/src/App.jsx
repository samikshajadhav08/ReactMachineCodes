import { useState } from "react";
import "./App.css";

const initialExpenses = [
  { id: 1, title: "Groceries", amount: 850, category: "Food" },
  { id: 2, title: "Bus pass", amount: 500, category: "Travel" },
  { id: 3, title: "Movie Ticket", amount: 300, category: "Entertainment" },
];
function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");

  const addExpense = (e) => {
    e.preventDefault();
    const numericAmount = Number(amount);
    if (
      !title.trim() ||
      !amount.trim() ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      setError("Enter a title and a valid positive amount");
      return;
    }
    const newExpense = {
      id: crypto.randomUUID(),
      title: title.trim(),
      amount: numericAmount,
      category,
    };
    setExpenses((prev) => [newExpense, ...prev]);
    setTitle("");
    setAmount("");
    setCategory("Food");
    setError("");
  };
  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const filteredExpenses = expenses.filter(
    (expense) => filter === "All" || expense.category === filter,
  );

  return (
    <>
      <div className="container">
        <h1>Expense Tracker</h1>
        <div className="summary">
          <p>Total Expenses</p>
          <h2>{total.toLocaleString("en-IN")}</h2>
          <p>{expenses.length} transactions</p>
        </div>
        <form onSubmit={addExpense}>
          <h2>Add Expense</h2>
          <label htmlFor="title">Expense Name</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Lunch"
          />
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            min="0.01"
            step="0.1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
          />
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
          {error && <p className="error">{error}</p>}

          <button type="submit">Add Expense</button>
        </form>
        <section>
          <h2>Transactions</h2>
          <label htmlFor="filter">Filter by category</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
          {filteredExpenses.length === 0 ? (
            <p>No Expenses found.</p>
          ) : (
            <div className="expense-list">
              {filteredExpenses.map((expense) => (
                <div className="expense-card" key={expense.id}>
                  <div>
                    <h3>{expense.title}</h3>
                    <p>{expense.category}</p>
                  </div>
                  <strong>₹{expense.amount.toLocaleString("en-IN")}</strong>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => deleteExpense(expense.id)}
                    aria-label={`Delete ${expense.title}`}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default App;
