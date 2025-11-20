"use client";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CourseModal({ initial = null, onClose, onSave }) {
  const [form, setForm] = useState({
    id: null,
    code: "",
    title: "",
    units: 3,
    grade: "A (5.0)",
    semester: "Fall",
    year: new Date().getFullYear(),
    status: "Completed",
  });

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  function change(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function save() {
    const payload = { ...form, id: form.id || uuidv4() };
    onSave(payload);
    onClose();
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {initial ? "Edit Course" : "Add Course"}
        </h3>

        <div className="space-y-3 mt-3">
          <input
            name="code"
            value={form.code}
            onChange={change}
            className="input input-bordered w-full"
            placeholder="Course code"
          />
          <input
            name="title"
            value={form.title}
            onChange={change}
            className="input input-bordered w-full"
            placeholder="Course title"
          />

          <div className="grid grid-cols-3 gap-2">
            <input
              name="units"
              value={form.units}
              onChange={change}
              type="number"
              className="input input-bordered"
            />

            <select
              name="grade"
              value={form.grade}
              onChange={change}
              className="select select-bordered"
            >
              <option>A (5.0)</option>
              <option>B (4.0)</option>
              <option>C (3.0)</option>
              <option>D (2.0)</option>
              <option>E (1.0)</option>
              <option>F (0.0)</option>
            </select>

            <select
              name="status"
              value={form.status}
              onChange={change}
              className="select select-bordered"
            >
              <option>Completed</option>
              <option>In Progress</option>
              <option>To Be Taken</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <select
              name="semester"
              value={form.semester}
              onChange={change}
              className="select select-bordered"
            >
              <option>Fall</option>
              <option>Spring</option>
              <option>Summer</option>
            </select>
            <input
              name="year"
              value={form.year}
              onChange={change}
              className="input input-bordered"
              type="number"
            />
          </div>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={save}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
