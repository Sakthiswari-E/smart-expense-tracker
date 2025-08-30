import React, { useState } from 'react'
import { CATEGORIES } from '../constants'
import { uid } from '../utils/storage'

export default function AddExpenseForm({ onAdd }) {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [note, setNote] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const num = parseFloat(amount)
    if (Number.isNaN(num) || num <= 0) {
      alert('Please enter a valid amount > 0')
      return
    }
    const newExp = {
      id: uid(),
      amount: +num.toFixed(2),
      category,
      date,
      note: note.trim(),
      createdAt: new Date().toISOString(),
    }
    onAdd(newExp)
    setAmount('')
    setNote('')
    setCategory(CATEGORIES[0])
    setDate(new Date().toISOString().slice(0, 10))
  }

  return (
    <form className="bg-white p-4 rounded shadow" onSubmit={handleSubmit}>
      <h2 className="font-medium mb-3">Add Expense</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="number"
          step="0.01"
          placeholder="Amount (₹)"
          className="p-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select
          className="p-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input
          type="date"
          className="p-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Note (optional)"
          className="p-2 border rounded"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <div className="mt-3 flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => {
            setAmount('')
            setNote('')
            setCategory(CATEGORIES[0])
          }}
        >
          Reset
        </button>
      </div>
    </form>
  )
}