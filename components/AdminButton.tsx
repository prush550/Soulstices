"use client";
import { useSession } from "next-auth/react";

export default function AdminButton() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  const { role } = session.user;

  if (role === "FOUNDER" || role === "COLLABORATOR") {
    return (
      <a href="/admin" className="btn">
        Admin Panel
      </a>
    );
  }

  return null;
}
