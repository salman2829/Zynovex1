import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/dashboard/", "/api/", "/auth/callback"],
    },
    sitemap: "https://www.zynovextechnologies.in/sitemap.xml",
  };
}
