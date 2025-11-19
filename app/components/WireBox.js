export default function WireBox({ label, children, className = "" }) {
  return (
    <div
      className={`bg-white border-2 border-neutral rounded-lg p-6 shadow-xl relative ${className}`}
    >
      {label && (
        <div className="absolute top-0 left-0 bg-yellow-300 text-xs font-bold px-2 py-1 border-r-2 border-b-2 border-neutral-900">
          {label}
        </div>
      )}
      {children}
    </div>
  );
}
