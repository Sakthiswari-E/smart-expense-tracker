import React from 'react'
import { CATEGORIES } from '../constants'

export default function Filters({
  filterCategory, setFilterCategory,
  filterFrom, setFilterFrom,
  filterTo, setFilterTo,
  minAmount, setMinAmount,
  maxAmount, setMaxAmount,
  query, setQuery,
  sortBy, setSortBy,
  onClearAll
}) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-medium mb-3">Filters</h2>
      <div className="space-y-2">
        <div>
          <label className="text-xs">Category</label>
          <select
            className="w-full p-2 border rounded"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-xs">From</label>
            <input
              type="date"
              className="w-full p-2 border rounded flex"
              value={filterFrom}
              onChange={(e) => setFilterFrom(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="text-xs">To</label>
            <input
              type="date"
              className="w-full p-2 border rounded flex"
              value={filterTo}
              onChange={(e) => setFilterTo(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            step="0.01"
            placeholder="Min amount"
            className="w-full p-2 border rounded flex"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Max amount"
            className="w-full p-2 border rounded flex"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Search note..."
            className="w-full p-2 border rounded"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div>
          <label className="text-xs">Sort</label>
          <select
            className="w-full p-2 border rounded"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Amount</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            className="flex-1 px-3 py-2 bg-red-500 text-white rounded"
            onClick={onClearAll}
          >
            Clear All
          </button>
          <button
            className="flex-1 px-3 py-2 bg-gray-200 rounded"
            onClick={() => {
              setFilterCategory('All')
              setFilterFrom('')
              setFilterTo('')
              setMinAmount('')
              setMaxAmount('')
              setQuery('')
              setSortBy('recent')
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  )
}