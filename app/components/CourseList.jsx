"use client";
import { useEffect, useState } from "react";
import CourseModal from "./CourseModal";

const STORAGE = "apt_courses_v1";

function gradeToPoint(label) {
  if (!label) return 0;
  const m = label.match(/([0-9]+\.?[0-9]*)/);
  return m ? Number(m[0]) : 0;
}

export default function CourseList({ onChangeTotals }) {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) setCourses(JSON.parse(raw));
    } catch (e) {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(courses));
    // compute totals
    const completed = courses.filter((c) => c.status === "Completed");
    const credits = completed.reduce((s, c) => s + Number(c.units || 0), 0);
    const gradePoints = completed.reduce(
      (s, c) => s + Number(c.units || 0) * gradeToPoint(c.grade),
      0
    );
    const cgpa = credits ? gradePoints / credits : 0;
    onChangeTotals && onChangeTotals({ courses, credits, cgpa });
  }, [courses]);

  function addCourse(payload) {
    setCourses((prev) => [payload, ...prev]);
  }

  function updateCourse(payload) {
    setCourses((prev) => prev.map((c) => (c.id === payload.id ? payload : c)));
  }

  function deleteCourse(id) {
    if (!confirm("Delete this course?")) return;
    setCourses((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          + Add New Course
        </button>
        <div className="ml-auto">Total: {courses.length}</div>
      </div>

      <div className="space-y-3">
        {courses.length === 0 && (
          <div className="p-6 bg-base-100 rounded">No courses yet</div>
        )}

        {courses.map((c) => (
          <div
            key={c.id}
            className="border rounded p-3 bg-white flex justify-between items-center"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="badge badge-outline">{c.code}</span>
                <div className="font-bold">{c.title}</div>
                <span className="text-sm opacity-70">{c.status}</span>
              </div>
              <div className="text-xs opacity-70">
                {c.units} units • {c.grade} • {c.semester} {c.year}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-sm"
                onClick={() => {
                  setEditing(c);
                  setOpen(true);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-error"
                onClick={() => deleteCourse(c.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <CourseModal
          initial={editing}
          onClose={() => setOpen(false)}
          onSave={(p) => (editing ? updateCourse(p) : addCourse(p))}
        />
      )}
    </div>
  );
}
