import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// PATCH - Update product
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { id } = await params;
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const { name, slug, category, description, price, imageUrl, inStock } = await request.json();

    const updateData: Partial<typeof products.$inferInsert> = {};
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (category !== undefined) updateData.category = category;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) {
      const priceVal = parseInt(price, 10);
      if (isNaN(priceVal)) {
        return new NextResponse("Invalid price", { status: 400 });
      }
      updateData.price = priceVal;
    }
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (inStock !== undefined) updateData.inStock = !!inStock;

    const [updatedProduct] = await db
      .update(products)
      .set(updateData)
      .where(eq(products.id, productId))
      .returning();

    if (!updatedProduct) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Failed to update product:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// DELETE - Delete product
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { id } = await params;
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const [deletedProduct] = await db
      .delete(products)
      .where(eq(products.id, productId))
      .returning();

    if (!deletedProduct) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete product:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
