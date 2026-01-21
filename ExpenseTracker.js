import React, { useEffect, useState } from "react";
import { fetchExpenses, addExpense } from "./api";

const ExpenseTracker = () => {
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  // Load expenses
  useEffect(() => {
    fetchExpenses()
      .then((data) => {
        setExpenses(data);
        calculateTotal(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const calculateTotal = (list) => {
    const sum = list.reduce(
      (acc, item) => acc + Number(item.amount),
      0
    );
    setTotal(sum);
  };

  const handleAdd = async () => {
    if (!amount) return;

    const newExpense = { amount };

    try {
      const savedExpense = await addExpense(newExpense);
      const updatedList = [...expenses, savedExpense];
      setExpenses(updatedList);
      calculateTotal(updatedList);
      setAmount("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Expense Tracker</h1>

      <input
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleAdd}>Add</button>

      <h3>Total: {total}</h3>

      <ul role="list">
        {expenses.map((item) => (
          <li key={item.id}>{item.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
