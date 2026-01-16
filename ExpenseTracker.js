import React, { useState, useEffect } from "react";
import { auth, database } from "./firebase";
import { ref, push, set, onValue, remove, update } from "firebase/database";

function ExpenseTracker() {

  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);

  const userId = auth.currentUser?.uid;

  // GET expenses
  useEffect(() => {
    if (!userId) return;

    const expensesRef = ref(database, `expenses/${userId}`);
    onValue(expensesRef, (snapshot) => {
      const data = snapshot.val() || {};
      const arr = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      setExpenses(arr);
    });
  }, [userId]);

  // ADD / UPDATE
  const submitHandler = (e) => {
    e.preventDefault();

    if (!amount || !desc) {
      alert("Fill all fields");
      return;
    }

    const expenseData = { amount, desc, category };

    // UPDATE
    if (editId) {
      const expRef = ref(database, `expenses/${userId}/${editId}`);

      update(expRef, expenseData)
        .then(() => {
          console.log("Expense successfully updated");
          setEditId(null);
        });

    } 
    // ADD
    else {
      const expensesRef = ref(database, `expenses/${userId}`);
      const newExpRef = push(expensesRef);

      set(newExpRef, expenseData)
        .then(() => console.log("Expense added"));
    }

    setAmount("");
    setDesc("");
    setCategory("Food");
  };

  // DELETE
  const deleteHandler = (id) => {
    const expRef = ref(database, `expenses/${userId}/${id}`);

    remove(expRef)
      .then(() => {
        console.log("Expense successfully deleted");
      });
  };

  // EDIT
  const editHandler = (exp) => {
    setAmount(exp.amount);
    setDesc(exp.desc);
    setCategory(exp.category);
    setEditId(exp.id);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", marginTop: "30px" }}>

      <h2>{editId ? "Edit Expense" : "Add Expense"}</h2>

      <form onSubmit={submitHandler}>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Petrol</option>
          <option>Salary</option>
          <option>Shopping</option>
        </select>

        <button>
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <h3>Saved Expenses</h3>

      {expenses.map((e) => (
        <div
          key={e.id}
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            margin: "8px 0"
          }}
        >
          ₹{e.amount} - {e.desc} ({e.category})

          <div style={{ marginTop: "5px" }}>
            <button onClick={() => editHandler(e)}>
              Edit
            </button>

            <button
              onClick={() => deleteHandler(e.id)}
              style={{ marginLeft: "5px" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

    </div>
  );
}

export default ExpenseTracker;