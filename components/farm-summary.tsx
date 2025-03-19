"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  {
    name: "Jan",
    crops: 4,
    livestock: 20,
  },
  {
    name: "Feb",
    crops: 5,
    livestock: 22,
  },
  {
    name: "Mar",
    crops: 8,
    livestock: 23,
  },
  {
    name: "Apr",
    crops: 12,
    livestock: 24,
  },
  {
    name: "May",
    crops: 10,
    livestock: 25,
  },
  {
    name: "Jun",
    crops: 9,
    livestock: 26,
  },
]

export function FarmSummary() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="crops" fill="#4ade80" radius={[4, 4, 0, 0]} />
        <Bar dataKey="livestock" fill="#60a5fa" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

