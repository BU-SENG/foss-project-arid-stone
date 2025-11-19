export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-base-100 border rounded-lg p-4 shadow">
      <p className="text-sm opacity-70">{title}</p>
      <h3 className="text-3xl font-bold">{value}</h3>
      {subtitle && <p className="text-xs opacity-60 mt-1">{subtitle}</p>}
    </div>
  );
}
