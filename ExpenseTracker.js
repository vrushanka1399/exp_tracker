import { useState } from "react";

function ExpenseTracker() {

  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Food");

  const [expenses, setExpenses] = useState([]);

  const addExpenseHandler = (e) => {
    e.preventDefault();

    if (!amount || !desc || !category) {
      alert("Fill all fields");
      return;
    }

    const newExpense = {
      id: Math.random(),
      amount,
      desc,
      category
    };

    setExpenses([...expenses, newExpense]);

    // clear inputs
    setAmount("");
    setDesc("");
    setCategory("Food");
  };

  return (
    <div style={{maxWidth:"400px", margin:"auto"}}>

      <h2>Add Expense</h2>

      <form onSubmit={addExpenseHandler}>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e)=>setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e)=>setDesc(e.target.value)}
        />

        <select
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Petrol</option>
          <option>Salary</option>
          <option>Shopping</option>
        </select>

        <button>Add Expense</button>
      </form>

      {/* LIST */}
      <h3>Expenses</h3>

      {expenses.map((e)=>(
        <div key={e.id} style={{
          border:"1px solid",
          padding:"5px",
          margin:"5px"
        }}>
          ₹{e.amount} - {e.desc} ({e.category})
        </div>
      ))}

    </div>
  );
}

export default ExpenseTracker;