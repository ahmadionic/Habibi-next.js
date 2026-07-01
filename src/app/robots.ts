import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Disallow all /admin/* routes, allow all other paths
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/",
    },
    sitemap: "http://localhost:3000/sitemap.xml",
  };
}
