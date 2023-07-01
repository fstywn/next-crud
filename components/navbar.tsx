import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const signOutHandler = async () => {
    if (confirm("are you sure to sign out?")) {
      await signOut();
    }
  };
  return (
    <nav className="fixed top-0 right-0 left-0 py-4">
      <div className="relative max-w-xl mx-auto bg-white/5 py-2 px-4 backdrop-blur-2xl rounded-xl flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold">Hello!</h1>
        </Link>
        {session && (
          <div className="flex items-center gap-4">
            <Link href="/create">Create</Link>
            <div
              className="cursor-pointer"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <img
                src={session.user?.image as string}
                alt={session.user?.name as string}
                width={40}
                height={40}
                className="rounded-full"
              />
              {open && (
                <div className="absolute right-0 top-14 p-4 w-40  bg-slate-900 border border-white/20 rounded-xl">
                  <span className="font-semibold ">{session.user?.name}</span>
                  <button
                    onClick={signOutHandler}
                    className="py-1 w-full mt-2 bg-red-800 rounded"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {!session && <Link href={"/login"}>Login</Link>}
      </div>
    </nav>
  );
}
