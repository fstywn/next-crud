export default function DateTime({ createdAt }: { createdAt: Date }) {
  return (
    <div>
      <span className="text-xs text-white/20">
        {new Date(createdAt).toDateString()}
        &nbsp;&bull;&nbsp;
        {new Date(createdAt).toLocaleTimeString()}
      </span>
    </div>
  );
}
