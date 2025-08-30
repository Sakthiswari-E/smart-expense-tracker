import React, { useMemo } from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js'


const COLORS = [ 
  "#FF6384",  // Food
  "#36A2EB",  // Travel
  "#FFCE56",  // Bills
  "#4BC0C0",  // Shopping
  "#9966FF",  // Rent
  "#FF9F40",  // Entertainment
  "#8BC34A",  // Others
];

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

export default function Charts({ categoryTotals, labels }) {
  const pieData = useMemo(() => {
    const usedLabels = labels.filter((c) => (categoryTotals[c] || 0) > 0)
    const data = usedLabels.map((c) => +categoryTotals[c].toFixed(2))
    return {
      labels: usedLabels,
      datasets: [
        {
          label: 'Spending',
          data,
          backgroundColor: usedLabels.map((_, i) => COLORS[i % COLORS.length]), // ✅ assign colors
          borderWidth: 1,
        },
      ],
    }
  }, [categoryTotals, labels])

  const barData = useMemo(() => {
    const data = labels.map((c) => +categoryTotals[c].toFixed(2))
    return { 
      labels, 
      datasets: [
        { 
          label: 'Amount', 
          data,
          backgroundColor: labels.map((_, i) => COLORS[i % COLORS.length]), // ✅ assign colors
        },
      ] 
    }
  }, [categoryTotals, labels])

  return (
    <section className="bg-white p-4 rounded shadow">
      <h2 className="font-medium mb-3">Visualizations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-2 border rounded">
          <h3 className="text-sm font-medium mb-2">Category Pie</h3>
          {pieData.labels.length === 0 ? (
            <div className="text-sm text-gray-500">No data to show.</div>
          ) : (
            <Pie data={pieData} />
          )}
        </div>
        <div className="p-2 border rounded">
          <h3 className="text-sm font-medium mb-2">Category Bar</h3>
          <Bar 
            data={barData} 
            options={{ 
              responsive: true, 
              plugins: { 
                title: { display: false } 
              } 
            }} 
          />
        </div>
      </div>
    </section>
  )
}