import { redirect } from "next/navigation";

export default function AdminIndexPage() {
  // Redirect root /admin directly to /admin/leads
  redirect("/admin/leads");
}
