"use client";
import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import CourseList from "@/components/CourseList";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [totals, setTotals] = useState({ credits: 0, cgpa: 0, courses: [] });
  const [trend, setTrend] = useState([]);

  function handleTotals(t) {
    setTotals(t);
    // update a simple trend (push current cgpa with time)
    setTrend((prev) => {
      const next = [
        ...prev,
        {
          name: new Date().toLocaleDateString(),
          cgpa: Number((t.cgpa || 0).toFixed(2)),
        },
      ];
      return next.slice(-10);
    });
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Current CGPA"
          value={(totals.cgpa || 0).toFixed(2)}
          subtitle="Out of selected scale"
        />
        <StatCard title="Credits Completed" value={totals.credits || 0} />
        <StatCard title="Courses" value={totals.courses.length || 0} />
        <StatCard
          title="In Progress"
          value={
            (totals.courses.filter((c) => c.status === "In Progress") || [])
              .length
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="card bg-base-100 p-4 shadow">
            <h3 className="font-bold mb-3">Semester Trend</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="cgpa"
                    stroke="#2563eb"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6">
            <CourseList onChangeTotals={handleTotals} />
          </div>
        </div>

        <div>
          <div className="card bg-base-100 p-4 shadow">
            <h3 className="font-bold mb-3">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <button className="btn">Export Transcript (JSON)</button>
              <button className="btn">Generate Analysis</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
