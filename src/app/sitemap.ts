import { MetadataRoute } from "next";
import { db } from "@/db";
import { products } from "@/db/schema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use development URL as base, which works on localhost and overrides cleanly on production
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  // Fetch all shop products to include their detail URLs
  let productUrls: MetadataRoute.Sitemap = [];
  try {
    const allProducts = await db.select().from(products);
    productUrls = allProducts.map((product) => ({
      url: `${baseUrl}/shop/${product.slug}`,
      lastModified: product.createdAt ? new Date(product.createdAt) : new Date(),
      changeFrequency: "daily" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Failed to fetch product URLs for sitemap:", error);
  }

  // Define static marketing routes
  const staticRoutes = [
    "",
    "/portraits",
    "/education",
    "/workshops",
    "/shop",
    "/about",
    "/book",
  ];

  const staticUrls: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  return [...staticUrls, ...productUrls];
}
