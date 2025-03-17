// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function ExpenseDetails({ projectId }) {
//   const [expenses, setExpenses] = useState(null);
//   const [extraExpenses, setExtraExpenses] = useState([]);

//   useEffect(() => {
//     setExtraExpenses([]);
//     if (projectId) {
//       axios
//         .get(`/api/expenses/${projectId}`)
//         .then((res) => {
//           const expenseData = res.data;

//           // Compute total expenses
//           const totalExpense = expenseData.reduce(
//             (sum, exp) => sum + parseFloat(exp.Amount),
//             0
//           );

//           // Update state with the processed data
//           setExpenses({ totalExpense });
//         })
//         .catch((err) => console.error("Error fetching expenses:", err));
//     } else {
//       setExpenses(null);
//     }
//   }, [projectId]);

//   const handleAddExtraExpense = () =>
//     setExtraExpenses([...extraExpenses, { title: "", amount: 0 }]);

//   const handleExtraExpenseChange = (index, field, value) => {
//     setExtraExpenses(
//       extraExpenses.map((expense, i) =>
//         i === index ? { ...expense, [field]: value } : expense
//       )
//     );
//   };

//   const handleRemoveExtraExpense = (index) =>
//     setExtraExpenses(extraExpenses.filter((_, i) => i !== index));

//   const getTotalExtraExpense = () =>
//     extraExpenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

//   const grandTotal = (expenses?.totalExpense || 0) + getTotalExtraExpense();

//   if (!projectId) return <p>Please select a project to see expenses.</p>;

//   return (
//     <div>
//       <h1 className="text-lg font-medium mb-2">Expense Details</h1>
//       {expenses ? (
//         <div>
//           <p className="font-bold">Total Expense: ₹{expenses.totalExpense}</p>

//           {extraExpenses.map((expense, index) => (
//             <div
//               key={index}
//               className="flex gap-2 mb-2 items-center border p-2 rounded"
//             >
//               <input
//                 type="text"
//                 placeholder="Expense Title"
//                 value={expense.title}
//                 onChange={(e) =>
//                   handleExtraExpenseChange(index, "title", e.target.value)
//                 }
//                 className="p-2 border rounded flex-1"
//               />
//               <input
//                 type="number"
//                 placeholder="Amount"
//                 value={expense.amount}
//                 onChange={(e) =>
//                   handleExtraExpenseChange(index, "amount", e.target.value)
//                 }
//                 className="p-2 border rounded w-24"
//               />
//               <button
//                 onClick={() => handleRemoveExtraExpense(index)}
//                 className="border p-2 rounded"
//               >
//                 ➖
//               </button>
//             </div>
//           ))}

//           <button
//             onClick={handleAddExtraExpense}
//             className="bg-blue-600 text-white p-2 rounded"
//           >
//             ➕ Add Extra Expense
//           </button>
//           <p className="text-lg font-medium">
//             <strong>Grand Total Expense: ₹{grandTotal}</strong>
//           </p>
//         </div>
//       ) : (
//         <p>Loading expenses...</p>
//       )}
//     </div>
//   );
// }



"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ExpenseDetails({ projectId }) {
  const [expenses, setExpenses] = useState(null);
  const [extraExpenses, setExtraExpenses] = useState([]);

  useEffect(() => {
    setExtraExpenses([]);
    if (projectId) {
      axios
        .get(`/api/expenses/${projectId}`)
        .then((res) => {
          const expenseData = res.data;

          // Compute total expenses
          const totalExpense = expenseData.reduce(
            (sum, exp) => sum + parseFloat(exp.Amount),
            0
          );

          // Update state with the processed data
          setExpenses({ totalExpense });
        })
        .catch((err) => console.error("Error fetching expenses:", err));
    } else {
      setExpenses(null);
    }
  }, [projectId]);

  const handleAddExtraExpense = () =>
    setExtraExpenses([...extraExpenses, { title: "", amount: 0 }]);

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
    extraExpenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

  const grandTotal = (expenses?.totalExpense || 0) + getTotalExtraExpense();

  if (!projectId) return <p>Please select a project to see expenses.</p>;

  return (
    <div>
      <h1 className="text-lg font-medium mb-2">Expense Details</h1>
      {expenses ? (
        <div>
          <p className="font-bold">Total Expense: ₹{expenses.totalExpense}</p>

          {extraExpenses.map((expense, index) => (
            <div
              key={index}
              className="flex gap-2 mb-2 items-center border p-2 rounded"
            >
              <input
                type="text"
                placeholder="Expense Title"
                value={expense.title}
                onChange={(e) =>
                  handleExtraExpenseChange(index, "title", e.target.value)
                }
                className="p-2 border rounded flex-1"
              />
              <input
                type="number"
                placeholder="Amount"
                value={expense.amount}
                onChange={(e) =>
                  handleExtraExpenseChange(index, "amount", e.target.value)
                }
                className="p-2 border rounded w-24"
              />
              <button
                onClick={() => handleRemoveExtraExpense(index)}
                className="border p-2 rounded"
              >
                ➖
              </button>
            </div>
          ))}

          <button
            onClick={handleAddExtraExpense}
            className="bg-blue-600 text-white p-2 rounded"
          >
            ➕ Add Extra Expense
          </button>
          <p className="text-lg font-medium">
            <strong>Grand Total Expense: ₹{grandTotal}</strong>
          </p>
        </div>
      ) : (
        <p>Loading expenses...</p>
      )}
    </div>
  );
}
