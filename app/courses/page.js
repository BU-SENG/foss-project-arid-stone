"use client";
import CourseList from "@/components/CourseList";

export default function CoursesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Courses</h2>
      <CourseList />
    </div>
  );
}
