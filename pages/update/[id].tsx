import { post } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { authOptions } from "../api/auth/[...nextauth]";
interface UpdateProps {
  post: post;
}
export default function Update({ post }: UpdateProps) {
  const router = useRouter();
  const { id } = router.query;
  const [fields, setFields] = useState({
    title: post.title,
    content: post.content,
  });
  const [loading, setLoading] = useState(false);
  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const req = await fetch("/api/post/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });
      const res = await req.json();
      if (!req.ok) {
        throw Error(res.message);
      }
      toast.success(res.message);
      setTimeout(() => {
        router.push("/");
      }, 2500);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>Hello World! &bull; update </title>
      </Head>
      <main>
        <h1 className="text-xl font-semibold">Update your post</h1>
        <form
          onSubmit={submitHandler}
          className="relative w-full mt-4 text-center"
        >
          {loading && <div className="absolute inset-0 w-full h-full z-20" />}
          <input
            name="title"
            value={fields.title}
            onChange={inputHandler}
            type="text"
            className="bg-transparent border border-white/10 w-full py-2 px-4 rounded mb-2"
            placeholder="title"
          />
          <textarea
            name="content"
            value={fields.content}
            onChange={inputHandler}
            className="bg-transparent border border-white/10 w-full py-2 px-4 rounded h-40 mb-2"
            placeholder="content"
          />
          <button className="bg-blue-800 py-2 px-12 mx-auto text-center rounded">
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </main>
    </>
  );
}

export async function getServerSideProps(context: {
  query: { id: string };
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const { id } = context.query;
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const req = await fetch(process.env.NEXT_BASE_URL + "/api/post/" + id);
  const post = await req.json();
  return {
    props: {
      post,
    },
  };
}
