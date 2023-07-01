import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-slate-900 text-white ">
        <div className="max-w-xl mx-auto">
          <Navbar />
          <div className="py-24">
            <Toaster />
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
