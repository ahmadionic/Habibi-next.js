import { db } from "@/db";
import { leads } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Enforce server-side authentication check
  const session = await auth();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { status } = await request.json();
    if (!status || !["new", "contacted", "closed"].includes(status)) {
      return new NextResponse("Invalid status", { status: 400 });
    }

    const { id } = await params;
    const leadId = parseInt(id, 10);
    if (isNaN(leadId)) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    await db
      .update(leads)
      .set({ status })
      .where(eq(leads.id, leadId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update lead status:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
