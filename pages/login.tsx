import Head from "next/head";
import { signIn } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import GoogleIcon from "@/components/google";

export default function Login() {
  return (
    <>
      <Head>
        <title>Hello World! &bull; login</title>
      </Head>
      <main className="text-center py-20 ">
        <h1 className="font-bold text-3xl mb-4">You have to login first!</h1>
        <button
          onClick={async () => await signIn("google")}
          className="bg-white/5 py-2 px-8 rounded flex items-center gap-2 mx-auto"
        >
          <GoogleIcon />
          Login with Google &rarr;
        </button>
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
  if (session) {
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
