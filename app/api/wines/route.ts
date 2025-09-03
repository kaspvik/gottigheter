import { prisma } from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const WineSchema = z.object({
  name: z.string().min(2, "Namnet måste vara minst 2 tecken"),
  country: z.string().min(2, "Ange land"),
  grape: z.string().min(2, "Ange druva"),
  type: z.string().min(2, "Ange sort"),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  rating: z
    .union([
      z.number().int().min(1).max(5),
      z
        .string()
        .regex(/^[1-5]$/)
        .transform((s) => parseInt(s, 10)),
      z.literal(""),
      z.undefined(),
    ])
    .optional(),
});

export async function GET() {
  const wines = await prisma.wine.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ wines });
}

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const parsed = WineSchema.parse(raw);

    const rating =
      parsed.rating === "" || typeof parsed.rating === "undefined"
        ? null
        : (parsed.rating as number);
    const notes =
      typeof parsed.notes === "string" && parsed.notes.trim() !== ""
        ? parsed.notes.trim()
        : null;

    const created = await prisma.wine.create({
      data: {
        name: parsed.name,
        country: parsed.country,
        grape: parsed.grape,
        type: parsed.type,
        notes,
        rating,
      },
    });

    return NextResponse.json({ wine: created }, { status: 201 });
  } catch (err: unknown) {
    if (err && typeof err === "object" && "issues" in err) {
      return NextResponse.json(
        {
          error: (err as z.ZodError).issues[0]?.message ?? "Ogiltig inmatning",
        },
        { status: 400 }
      );
    }
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      (err as Prisma.PrismaClientKnownRequestError).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Det finns redan ett vin med det namnet" },
        { status: 409 }
      );
    }
    console.error("POST /api/wines error:", err);
    return NextResponse.json({ error: "Något gick fel" }, { status: 500 });
  }
}
