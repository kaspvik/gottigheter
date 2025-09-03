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
    .number({ invalid_type_error: "Betyget måste vara en siffra 1–5" })
    .int()
    .min(1, "Betyget måste vara minst 1")
    .max(5, "Betyget får högst vara 5")
    .optional(),
});

export async function GET() {
  const wines = await prisma.wine.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ wines });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (typeof body.rating === "string" && body.rating !== "") {
      body.rating = parseInt(body.rating, 10);
    } else if (body.rating === "") {
      body.rating = undefined;
    }
    const data = WineSchema.parse(body);

    const created = await prisma.wine.create({
      data: {
        name: data.name,
        country: data.country,
        grape: data.grape,
        type: data.type,
        notes: data.notes ? data.notes : null,
        rating: data.rating ?? null,
      },
    });
    return NextResponse.json({ wine: created }, { status: 201 });
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "issues" in err &&
      Array.isArray((err as z.ZodError).issues)
    ) {
      return NextResponse.json(
        { error: (err as z.ZodError).issues[0]?.message },
        { status: 400 }
      );
    }
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as Prisma.PrismaClientKnownRequestError).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Det finns redan ett vin med det namnet" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Något gick fel" }, { status: 500 });
  }
}
