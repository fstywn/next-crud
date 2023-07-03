import { post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import PostBody from "./postCard/postBody";
import PostProfile from "./postCard/postProfile";
interface postProps extends post {
  user: {
    id?: string;
    name?: string;
    image?: string;
  };
}
interface PostCardProps {
  post: postProps;
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
      <PostProfile
        name={post.user.name}
        image={post.user.image}
        createdAt={post.createdAt}
      />
      <PostBody content={post.content} />
    </div>
  );
}
