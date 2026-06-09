import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: {
    name?: unknown;
    contact?: unknown;
    modeleVehicule?: unknown;
    panne?: unknown;
    localisation?: unknown;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const contact = typeof body.contact === "string" ? body.contact.trim() : "";
  const modeleVehicule =
    typeof body.modeleVehicule === "string" ? body.modeleVehicule.trim() : "";
  const panne = typeof body.panne === "string" ? body.panne.trim() : "";
  const localisation =
    typeof body.localisation === "string" ? body.localisation.trim() : "";

  if (!name) {
    return NextResponse.json({ error: "Indiquez votre nom." }, { status: 400 });
  }
  if (!contact) {
    return NextResponse.json(
      { error: "Indiquez un moyen de contact (téléphone ou e-mail)." },
      { status: 400 }
    );
  }
  if (!modeleVehicule) {
    return NextResponse.json(
      { error: "Indiquez le modèle de votre véhicule." },
      { status: 400 }
    );
  }
  if (!panne) {
    return NextResponse.json(
      { error: "Décrivez la panne ou le besoin." },
      { status: 400 }
    );
  }
  if (!localisation) {
    return NextResponse.json(
      { error: "Indiquez votre localisation." },
      { status: 400 }
    );
  }

  const row = await prisma.ecrireSav.create({
    data: {
      name,
      contact,
      modeleVehicule,
      panne,
      localisation,
    },
  });

  return NextResponse.json({ id: row.id }, { status: 201 });
}
