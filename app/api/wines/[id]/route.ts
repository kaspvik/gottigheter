import { prisma } from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const Id = z.string().regex(/^[0-9a-fA-F]{24}$/, "Ogiltigt id");

export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id: rawId } = await context.params;
    const id = Id.parse(rawId);

    await prisma.wine.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.issues[0]?.message ?? "Ogiltigt id" },
        { status: 400 },
      );
    }

    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Vinet hittades inte" },
        { status: 404 },
      );
    }

    return NextResponse.json({ error: "Kunde inte ta bort" }, { status: 500 });
  }
}
