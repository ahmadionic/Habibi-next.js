import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return new NextResponse("No file uploaded", { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Generate a clean filename using base name and current timestamp
    const originalExt = path.extname(file.name) || ".jpg";
    const cleanBaseName = path
      .basename(file.name, originalExt)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const filename = `product-${cleanBaseName}-${Date.now()}${originalExt}`;

    const uploadDir = path.join(process.cwd(), "public", "assets", "shop");
    // Ensure the folder exists
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, new Uint8Array(buffer));

    const imageUrl = `/assets/shop/${filename}`;
    return NextResponse.json({ imageUrl });
  } catch (error: any) {
    console.error("Failed to upload product image:", error);
    return new NextResponse(error.message || "Failed to upload image", { status: 500 });
  }
}
