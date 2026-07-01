import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@/components/admin/SignOutButton";
import { Inbox, ShoppingBag } from "lucide-react";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const navLinks = [
    { href: "/admin/leads", label: "Leads", icon: Inbox },
    { href: "/admin/products", label: "Products", icon: ShoppingBag },
  ];

  return (
    <div className="flex min-h-screen bg-cream">
      {/* Sidebar */}
      <aside className="w-64 bg-deep-pine text-cream flex flex-col justify-between border-r border-border-soft/20 shrink-0">
        <div>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-border-soft/10">
            <Link href="/admin/leads" className="block">
              <h2 className="font-heading text-2xl font-normal text-cream leading-tight">
                Claire Olivier
              </h2>
              <p className="font-body text-[10px] text-sage tracking-wider uppercase mt-1">
                HABIBI Admin Portal
              </p>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 mt-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-md font-body text-sm font-medium text-cream/90 hover:bg-forest/30 hover:text-white transition-colors"
                >
                  <Icon size={18} className="text-sage" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Area with Sign Out */}
        <div className="p-4 border-t border-border-soft/10">
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-cream min-h-screen text-ink overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
