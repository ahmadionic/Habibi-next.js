"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BrandCard } from "@/components/ui/BrandCard";
import { BrandButton } from "@/components/ui/BrandButton";
import { Lock, Mail, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/admin/leads",
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/admin/leads");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md">
        <BrandCard bg="white" padding="lg">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center text-sage mb-4">
              <Lock size={20} />
            </div>

            <h1 className="font-heading text-3xl font-normal text-deep-pine mb-2 text-center">
              Admin Login
            </h1>
            <p className="font-body text-xs text-ink-soft mb-8 text-center uppercase tracking-wider">
              HABIBI MANAGEMENT PORTAL
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-error/10 border border-error/20 text-error rounded-md flex items-center gap-2 font-body text-sm animate-fade-in">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block font-body text-xs font-semibold uppercase tracking-wider text-ink">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-soft">
                  <Mail size={16} />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="admin@habibi.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-border-soft rounded-md bg-white text-ink font-body text-sm placeholder:text-ink-soft/40 focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block font-body text-xs font-semibold uppercase tracking-wider text-ink">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-soft">
                  <Lock size={16} />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-border-soft rounded-md bg-white text-ink font-body text-sm placeholder:text-ink-soft/40 focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage transition-all"
                />
              </div>
            </div>

            <BrandButton
              type="submit"
              disabled={isLoading}
              className="w-full mt-4"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </BrandButton>
          </form>
        </BrandCard>
      </div>
    </main>
  );
}
