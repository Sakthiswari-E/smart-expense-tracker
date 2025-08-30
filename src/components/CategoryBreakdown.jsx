import React from 'react'
import { CATEGORIES } from '../constants'

export default function CategoryBreakdown({ totals }) {
  return (
    <aside className="bg-white p-4 rounded shadow">
      <h2 className="font-medium mb-3">Category Breakdown</h2>
      <ul className="space-y-2">
        {CATEGORIES.map((c) => (
          <li key={c} className="flex justify-between text-sm">
            <span>{c}</span>
            <span>₹{(totals[c] || 0).toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}