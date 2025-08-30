import React, { useEffect, useMemo, useState } from 'react'
import AddExpenseForm from './components/AddExpenseForm.jsx'
import Filters from './components/Filters.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import CategoryBreakdown from './components/CategoryBreakdown.jsx'
import Charts from './components/Charts.jsx'
import { CATEGORIES, STORAGE_KEY } from './constants.js'
import { loadExpenses, saveExpenses } from './utils/storage.js'

export default function App() {
  const [expenses, setExpenses] = useState(() => loadExpenses())

  // Filters
  const [filterCategory, setFilterCategory] = useState('All')
  const [filterFrom, setFilterFrom] = useState('')
  const [filterTo, setFilterTo] = useState('')
  const [minAmount, setMinAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('recent') // recent or highest

  useEffect(() => {
    saveExpenses(expenses)
  }, [expenses])

  function addExpense(e) {
    setExpenses((s) => [e, ...s])
  }
  function deleteExpense(id) {
    if (!confirm('Delete this expense?')) return
    setExpenses((s) => s.filter((x) => x.id !== id))
  }

  const filtered = useMemo(() => {
    let list = [...expenses]
    if (filterCategory !== 'All') list = list.filter((x) => x.category === filterCategory)
    if (filterFrom) list = list.filter((x) => x.date >= filterFrom)
    if (filterTo) list = list.filter((x) => x.date <= filterTo)
    if (minAmount) list = list.filter((x) => x.amount >= parseFloat(minAmount))
    if (maxAmount) list = list.filter((x) => x.amount <= parseFloat(maxAmount))
    if (query) {
      const q = query.toLowerCase()
      list = list.filter((x) => (x.note || '').toLowerCase().includes(q))
    }
    if (sortBy === 'recent') list.sort((a, b) => new Date(b.date) - new Date(a.date) || new Date(b.createdAt) - new Date(a.createdAt))
    else if (sortBy === 'highest') list.sort((a, b) => b.amount - a.amount || new Date(b.date) - new Date(a.date))
    return list
  }, [expenses, filterCategory, filterFrom, filterTo, minAmount, maxAmount, query, sortBy])

  const total = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0).toFixed(2), [expenses])

  const categoryTotals = useMemo(() => {
    const map = {}
    for (const c of CATEGORIES) map[c] = 0
    for (const e of expenses) {
      if (!map[e.category]) map[e.category] = 0
      map[e.category] += e.amount
    }
    return map
  }, [expenses])

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="max-w-5xl w-full">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Smart Expense Tracker</h1>
          <div className="text-sm text-gray-600">Total Spent: ₹{total}</div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="col-span-1 md:col-span-2">
            <AddExpenseForm onAdd={addExpense} />
          </div>
          <Filters
            filterCategory={filterCategory} setFilterCategory={setFilterCategory}
            filterFrom={filterFrom} setFilterFrom={setFilterFrom}
            filterTo={filterTo} setFilterTo={setFilterTo}
            minAmount={minAmount} setMinAmount={setMinAmount}
            maxAmount={maxAmount} setMaxAmount={setMaxAmount}
            query={query} setQuery={setQuery}
            sortBy={sortBy} setSortBy={setSortBy}
            onClearAll={() => setExpenses([])}
          />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <ExpenseList list={filtered} onDelete={deleteExpense} />
          </div>
          <CategoryBreakdown totals={categoryTotals} />
        </section>

        <Charts categoryTotals={categoryTotals} labels={CATEGORIES} />

        <footer className="mt-6 text-center text-sm text-gray-500">
          Data persisted to localStorage (key: {STORAGE_KEY})
        </footer>
      </div>
    </div>
  )
}