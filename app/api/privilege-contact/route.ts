import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: {
    name?: unknown;
    country?: unknown;
    city?: unknown;
    phone?: unknown;
    email?: unknown;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const country = typeof body.country === "string" ? body.country.trim() : "";
  const city = typeof body.city === "string" ? body.city.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!name) {
    return NextResponse.json({ error: "Indiquez votre nom." }, { status: 400 });
  }
  if (!country) {
    return NextResponse.json(
      { error: "Indiquez votre pays de résidence." },
      { status: 400 }
    );
  }
  if (!city) {
    return NextResponse.json({ error: "Indiquez votre ville." }, { status: 400 });
  }
  if (!phone) {
    return NextResponse.json(
      { error: "Indiquez votre numéro de téléphone." },
      { status: 400 }
    );
  }
  if (!email) {
    return NextResponse.json(
      { error: "Indiquez votre adresse e-mail." },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Adresse e-mail invalide." },
      { status: 400 }
    );
  }

  const row = await prisma.privilegeContact.create({
    data: {
      name,
      country,
      city,
      phone,
      email,
    },
  });

  return NextResponse.json({ id: row.id }, { status: 201 });
}
