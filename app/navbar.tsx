"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-slate-900 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Soulstices
      </Link>
      <div className="flex items-center space-x-4">
        {session?.user ? (
          <>
            <Link href="/profile" className="hover:underline">
              {session.user.name || "Profile"}
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/signup" className="hover:underline">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
