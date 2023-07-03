import DateTime from "./datetime";

interface PostProfileProps {
  image?: string;
  name?: string;
  createdAt: Date;
}
export default function PostProfile({
  image,
  name,
  createdAt,
}: PostProfileProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <img src={image} alt="avatar user" className="w-10 h-10 rounded-full" />
      <div className="flex flex-col">
        <h1 className="font-semibold -mb-2">{name}</h1>
        <DateTime createdAt={createdAt} />
      </div>
    </div>
  );
}
