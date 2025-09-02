import { prisma } from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const WineSchema = z.object({
  name: z.string().min(2, "Namnet måste vara minst 2 tecken"),
  country: z.string().min(2, "Ange land"),
  grape: z.string().min(2, "Ange druva"),
  type: z.string().min(2, "Ange sort"),
});

export async function GET() {
  const wines = await prisma.wine.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ wines });
}

export async function POST(req: Request) {
  try {
    const data = WineSchema.parse(await req.json());
    const created = await prisma.wine.create({ data });
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
