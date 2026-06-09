import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: {
    name?: unknown;
    email?: unknown;
    phone?: unknown;
    subject?: unknown;
    message?: unknown;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const phone =
    typeof body.phone === "string" && body.phone.trim()
      ? body.phone.trim()
      : null;
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message =
    typeof body.message === "string" ? body.message.trim() : "";

  if (!name) {
    return NextResponse.json({ error: "Indiquez votre nom." }, { status: 400 });
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
  if (!subject) {
    return NextResponse.json({ error: "Indiquez un sujet." }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json(
      { error: "Écrivez votre message." },
      { status: 400 }
    );
  }

  const row = await prisma.message_Contact.create({
    data: {
      nom: name,
      email,
      telephone: phone,
      sujet: subject,
      texte: message,
    },
  });

  return NextResponse.json({ id: row.id }, { status: 201 });
}
