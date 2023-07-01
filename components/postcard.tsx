import { post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
interface PostCardProps {
  post: post;
}
export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  const deleteHandler = async (id: string) => {
    if (confirm("are you sure to delete this post?")) {
      await fetch("/api/post/" + id, { method: "DELETE" });
      toast.success("post deleted!");
      router.push("/");
    }
  };
  return (
    <div className="p-5  rounded-md border border-white/5 mb-2">
      <div className="mb-4">
        <h1 className="font-semibold text-lg">{post.title}</h1>
        <p className="text-white/60">{post.content}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/20">
          {new Date(post.createdAt).toDateString()}
          &nbsp;&bull;&nbsp;
          {new Date(post.createdAt).toLocaleTimeString()}
        </span>
        <div className="text-sm flex items-center gap-2">
          <button
            onClick={() => {
              router.push(`/update/${post.id}`);
            }}
            className="bg-blue-800 py-1 px-4 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => {
              deleteHandler(post.id);
            }}
            className="bg-red-800 py-1 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
