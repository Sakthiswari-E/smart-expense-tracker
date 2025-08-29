import React from 'react'

export default function ExpenseList({ list, onDelete }) {
  if (list.length === 0) {
    return <div className="text-sm text-gray-500 bg-white p-4 rounded shadow">No expenses found.</div>
  }
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-medium mb-3">Expenses</h2>
      <ul className="space-y-3">
        {list.map((e) => (
          <li key={e.id} className="flex items-center justify-between p-2 border rounded">
            <div>
              <div className="font-medium">₹{e.amount.toFixed(2)} • {e.category}</div>
              <div className="text-xs text-gray-600">{e.date} {e.note ? `• ${e.note}` : ''}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="text-xs px-2 py-1 border rounded"
                onClick={() => {
                  navigator.clipboard?.writeText(JSON.stringify(e))
                  alert('Copied entry JSON to clipboard')
                }}
              >
                Copy
              </button>
              <button
                className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded"
                onClick={() => onDelete(e.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
