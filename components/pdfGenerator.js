import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default async function generatePDF(expenseData) {
  try {
    // Step 1: Send Expense Data to API & Get Invoice ID
    const response = await fetch("/api/invoices/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    });

    if (!response.ok) {
      throw new Error("Failed to save invoice");
    }

    const { invoice_id } = await response.json();

    // Step 2: Generate the PDF with the received invoice_id
    const doc = new jsPDF();

    // Header Section (Company Name, Address, Contact)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Ukshati Technologies Pvt Ltd.", 14, 15);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("2nd floor, Pramod Automobiles Bldg.", 14, 22);
    doc.text("Karangalpady, Mangalore - 575003", 14, 27);
    doc.text("Karnataka", 14, 32);
    doc.text("Phone: +91 8861567365", 14, 37);
    doc.setTextColor(0, 0, 255);
    doc.textWithLink("www.ukshati.com", 14, 42, { url: "http://www.ukshati.com" });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text("Bill Generation", 80, 50);
    doc.setFontSize(12);
    doc.text(`Invoice ID: ${invoice_id}`, 14, 57); // Add Invoice ID to PDF

    let finalY = 65; // Adjusted to start after invoice ID

    // Main Expenses Table
    if (expenseData.expenses.length > 0) {
      doc.text("Main Expenses", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Date", "Category", "Description", "Amount"]],
        body: expenseData.expenses.map((exp) => [
          exp.Date,
          exp.Category,
          exp.Comments,
          `₹${exp.Amount}`,
        ]),
      });
      finalY = doc.lastAutoTable.finalY + 10;
    }

    // Extra Expenses Table
    if (expenseData.extraExpenses.length > 0) {
      doc.text("Extra Expenses", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Item", "Quantity", "Unit Price", "Total"]],
        body: expenseData.extraExpenses.map((exp) => [
          exp.item,
          exp.quantity,
          `₹${exp.unitPrice}`,
          `₹${exp.quantity * exp.unitPrice}`,
        ]),
      });
      finalY = doc.lastAutoTable.finalY + 10;
    }

    // Inventory Cost Table
    if (expenseData.inventory.length > 0) {
      doc.text("Inventory Costs", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Item", "Quantity", "Unit Price", "Total Cost"]],
        body: expenseData.inventory.map((item) => [
          item.item_name,
          item.quantity_used,
          `₹${item.price_pu}`,
          `₹${item.total_cost}`,
        ]),
      });
      finalY = doc.lastAutoTable.finalY + 10;
    }

    // Grand Total
    doc.setFont("helvetica", "bold");
    doc.text(`Grand Total Expense: ₹${expenseData.grandTotal}`, 14, finalY + 10);

    // Save the PDF
    doc.save(`Invoice_${invoice_id}.pdf`);
  } catch (error) {
    console.error("Error generating invoice:", error);
    alert("Failed to generate invoice. Please try again.");
  }
}
