export default function PostBody({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="mb-4">
      <h1 className="font-semibold text-lg">{title}</h1>
      <p className="text-white/60">{content}</p>
    </div>
  );
}
