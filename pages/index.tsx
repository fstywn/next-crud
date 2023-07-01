import PostCard from "@/components/postcard";
import Head from "next/head";
import { post } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

export default function Home({ posts }: { posts: post[] }) {
  return (
    <>
      <Head>
        <title>Hello World!</title>
      </Head>
      <main>
        {posts.length < 1 ? (
          <div>
            <span className="font-semibold text-white/50">
              No posts added yet
            </span>
          </div>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </main>
    </>
  );
}

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const postReq = await fetch(process.env.NEXT_BASE_URL + "/api/post");
  const result = await postReq.json();
  return {
    props: {
      posts: result,
    },
  };
}
