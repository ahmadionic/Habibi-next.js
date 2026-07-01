"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="flex items-center gap-2 w-full px-4 py-2.5 rounded-md font-body text-sm font-medium text-cream hover:bg-forest/20 hover:text-white transition-colors cursor-pointer text-left"
    >
      <LogOut size={16} />
      <span>Sign Out</span>
    </button>
  );
}
