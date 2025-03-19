import { useState, useEffect } from "react";
import axios from "axios";

export default function ExpenseDetails({ projectId, setExpenseData }) {
  const [expenses, setExpenses] = useState([]);
  const [extraExpenses, setExtraExpenses] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    setExtraExpenses([]);
    if (projectId) {
      axios.get(`/api/expenses/${projectId}`).then((res) => setExpenses(res.data));
      axios.get(`/api/inventory/${projectId}`).then((res) => setInventory(res.data));
    } else {
      setExpenses([]);
      setInventory([]);
    }
  }, [projectId]);

  const handleAddExtraExpense = () =>
    setExtraExpenses([...extraExpenses, { item: "", quantity: 1, unitPrice: 0 }]);

  const handleExtraExpenseChange = (index, field, value) => {
    setExtraExpenses(
      extraExpenses.map((expense, i) =>
        i === index ? { ...expense, [field]: value } : expense
      )
    );
  };

  const handleRemoveExtraExpense = (index) =>
    setExtraExpenses(extraExpenses.filter((_, i) => i !== index));

  const getTotalExtraExpense = () =>
    extraExpenses.reduce((sum, expense) => sum + (expense.quantity * expense.unitPrice || 0), 0);

  const getTotalInventoryCost = () =>
    inventory.reduce((sum, item) => sum + Number(item.total_cost || 0), 0);

  const totalExpense = expenses.reduce((sum, exp) => sum + parseFloat(exp.Amount), 0);
  const grandTotal = totalExpense + getTotalExtraExpense() + getTotalInventoryCost();

  useEffect(() => {
    setExpenseData({ expenses, extraExpenses, inventory, totalExpense, grandTotal });
  }, [expenses, extraExpenses, inventory]);

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h1 className="text-lg font-medium mb-2">Expense Details</h1>
      <p className="font-bold text-red-600">Total Expense: ₹{totalExpense}</p>
      <p className="font-bold text-green-600">Total Inventory Cost: ₹{getTotalInventoryCost()}</p>

      <button
        onClick={handleAddExtraExpense}
        className="bg-blue-600 text-white p-2 rounded my-2"
      >
        ➕ Add Extra Expense
      </button>

      {extraExpenses.length > 0 && (
        <div className="mt-4">
          <h2 className="text-md font-medium">Extra Expenses</h2>
          {extraExpenses.map((expense, index) => (
            <div key={index} className="flex space-x-2 items-center mb-2">
              <input
                type="text"
                placeholder="Item Name"
                value={expense.item}
                onChange={(e) => handleExtraExpenseChange(index, "item", e.target.value)}
                className="border p-1"
              />
              <input
                type="number"
                placeholder="Qty"
                value={expense.quantity}
                onChange={(e) => handleExtraExpenseChange(index, "quantity", Number(e.target.value))}
                className="border p-1 w-16"
              />
              <input
                type="number"
                placeholder="Unit Price"
                value={expense.unitPrice}
                onChange={(e) => handleExtraExpenseChange(index, "unitPrice", Number(e.target.value))}
                className="border p-1 w-20"
              />
              <button
                onClick={() => handleRemoveExtraExpense(index)}
                className="bg-red-500 text-white p-1 rounded"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-lg font-medium mt-4">
        <strong>Grand Total Expense: ₹{grandTotal}</strong>
      </p>
    </div>
  );
}
