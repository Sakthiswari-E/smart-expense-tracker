import { STORAGE_KEY } from '../constants'

export function loadExpenses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return parsed.map(e => ({ ...e }))
  } catch (e) {
    console.error('Failed to load expenses:', e)
    return []
  }
}

export function saveExpenses(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}