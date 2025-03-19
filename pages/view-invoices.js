'use client';
import { useState, useEffect } from 'react';
import generatePDF from '../components/pdfGenerator';

export default function ViewInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const response = await fetch('/api/invoices');
        const data = await response.json();
        if (!data.error) {
          setInvoices(data);
        }
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    }
    fetchInvoices();
  }, []);

  async function fetchInvoiceById(invoiceId) {
    try {
      const response = await fetch(`/api/invoices/${invoiceId}`);
      const data = await response.json();
      if (!data.error) {
        setSelectedInvoice(data);
      }
    } catch (error) {
      console.error('Error fetching invoice:', error);
    }
  }

  return (
    <div className="p-6 w-full min-h-screen bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">View Invoices</h2>
      
      {/* Invoice List */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Invoice ID</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Total Amount</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.invoice_id} className="text-center">
              <td className="border p-2">{invoice.invoice_id}</td>
              <td className="border p-2">{new Date(invoice.created_at).toLocaleDateString()}</td>
              <td className="border p-2">₹{invoice.grandTotal}</td>
              <td className="border p-2">
                <button
                  onClick={() => fetchInvoiceById(invoice.invoice_id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  View & Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Invoice Download Button */}
      {selectedInvoice && (
        <button
          onClick={() => generatePDF(selectedInvoice)}
          className="bg-green-600 text-white p-3 rounded mt-4"
        >
          Download PDF for Invoice #{selectedInvoice.invoice_id}
        </button>
      )}
    </div>
  );
}
