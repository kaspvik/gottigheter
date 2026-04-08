import { prisma } from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const Id = z.string().regex(/^[0-9a-fA-F]{24}$/, "Ogiltigt id");

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Id.parse(params.id);
    await prisma.wine.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "issues" in err &&
      Array.isArray((err as { issues?: { message?: string }[] }).issues)
    ) {
      return NextResponse.json(
        { error: (err as z.ZodError).issues[0]?.message },
        { status: 400 }
      );
    }
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return NextResponse.json({ error: "Vinet hittades inte" }, { status: 404 });
    }
    return NextResponse.json({ error: "Kunde inte ta bort" }, { status: 500 });
  }
}
