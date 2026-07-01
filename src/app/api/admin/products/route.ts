import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// GET - Fetch all products
export async function GET() {
  const session = await auth();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const list = await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt));
    return NextResponse.json(list);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// POST - Create a new product
export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { name, slug, category, description, price, imageUrl, inStock } = await request.json();

    if (!name || !slug || !category || price === undefined) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const priceVal = parseInt(price, 10);
    if (isNaN(priceVal)) {
      return new NextResponse("Invalid price", { status: 400 });
    }

    const [newProduct] = await db
      .insert(products)
      .values({
        name,
        slug,
        category,
        description: description || null,
        price: priceVal,
        imageUrl: imageUrl || null,
        inStock: inStock !== undefined ? !!inStock : true,
      })
      .returning();

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error("Failed to create product:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
