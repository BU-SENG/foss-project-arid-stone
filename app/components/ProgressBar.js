export default function ProgressBar({ percent = 0 }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1 opacity-70">
        <span>Progress</span>
        <span>{percent}%</span>
      </div>
      <progress
        className="progress progress-neutral w-full"
        value={percent}
        max="100"
      />
    </div>
  );
}
