export default function PostBody({ content }: { content: string }) {
  return (
    <div className="mb-4">
      <p className="text-white/75">{content}</p>
    </div>
  );
}
