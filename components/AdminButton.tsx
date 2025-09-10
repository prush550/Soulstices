"use client"
import { useSession } from "next-auth/react"

export default function AdminButton() {
  const { data: session } = useSession()

  if (!session?.user) return null
  if (session.user.role === "FOUNDER" || session.user.role === "COLLABORATOR") {
    return <a href="/admin" className="btn">Admin Panel</a>
  }
  return null
}
