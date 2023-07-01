import Head from "next/head";
import React, { useState } from "react";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { authOptions } from "./api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

export default function Create() {
  const [fields, setFields] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
      const req = await fetch("/api/post", {
        method: "POST",
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
      setFields({ title: "", content: "" });
      setTimeout(() => {
        router.push("/");
      }, 2500);
    } catch (error: any) {
      toast.error(error.message, { duration: 2000 });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>Hello World! &bull; Create</title>
      </Head>
      <main>
        <h1 className="text-xl font-semibold">Create your post</h1>
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
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
