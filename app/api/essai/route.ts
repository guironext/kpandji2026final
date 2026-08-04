import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { MODELES } from "@/data/modeles";

export const runtime = "nodejs";

const VALID_MODEL_IDS = new Set(MODELES.map((m) => m.id));

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: {
    modelIds?: unknown;
    name?: unknown;
    email?: unknown;
    phone?: unknown;
    preferredDate?: unknown;
    timeSlot?: unknown;
    message?: unknown;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const modelIds = Array.isArray(body.modelIds)
    ? body.modelIds.filter((id): id is string => typeof id === "string")
    : [];

  if (modelIds.length === 0) {
    return NextResponse.json(
      { error: "Sélectionnez au moins un modèle à essayer." },
      { status: 400 }
    );
  }

  if (!modelIds.every((id) => VALID_MODEL_IDS.has(id))) {
    return NextResponse.json(
      { error: "Un ou plusieurs modèles sélectionnés sont invalides." },
      { status: 400 }
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";

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
  if (!phone) {
    return NextResponse.json(
      { error: "Indiquez votre numéro de téléphone." },
      { status: 400 }
    );
  }

  const preferredDate =
    typeof body.preferredDate === "string" && body.preferredDate.trim()
      ? body.preferredDate.trim()
      : null;
  const timeSlot =
    typeof body.timeSlot === "string" && body.timeSlot.trim()
      ? body.timeSlot.trim()
      : null;
  const message =
    typeof body.message === "string" && body.message.trim()
      ? body.message.trim()
      : null;

  const row = await prisma.essaiRequest.create({
    data: {
      modelIds,
      name,
      email,
      phone,
      preferredDate,
      timeSlot,
      message,
    },
  });

  return NextResponse.json({ id: row.id }, { status: 201 });
}
