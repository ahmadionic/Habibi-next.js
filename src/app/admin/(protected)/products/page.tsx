import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ProductManager } from "@/components/admin/ProductManager";

// Disable route response caching to ensure inventory is always fresh
export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  let allProducts: typeof products.$inferSelect[] = [];
  try {
    allProducts = await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt));
  } catch (error) {
    console.error("Failed to load products from database:", error);
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-1.5 border-b border-border-soft pb-5">
        <h1 className="font-heading text-4xl font-bold text-deep-pine">
          Product Manager
        </h1>
        <p className="font-body text-xs text-ink-soft uppercase tracking-wider">
          Manage online shop inventory and category listings
        </p>
      </div>

      <div className="pt-2">
        <ProductManager initialProducts={allProducts} />
      </div>
    </div>
  );
}
