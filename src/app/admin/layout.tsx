import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HABibi Admin",
  description: "Claire Olivier - Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
