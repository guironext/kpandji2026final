import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { ShowroomSkeleton } from "@/components/kp/ShowroomSkeleton";

const VirtualShowroom = dynamic(
  () => import("@/components/kp/VirtualShowroom"),
  { loading: () => <ShowroomSkeleton /> },
);

export const metadata: Metadata = {
  title: "Showroom — KPANDJI Motors",
  description:
    "Explorez la gamme KPANDJI comme dans un showroom virtuel : photos, points forts et fiches modèles.",
  alternates: {
    canonical: "/showroom",
  },
  openGraph: {
    title: "Showroom — KPANDJI Motors",
    description:
      "Découvrez nos modèles KPANDJI dans un showroom virtuel : visuels, highlights et fiches.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function ShowroomPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-kp-bg text-white">
      <main className="relative w-full overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1100px_700px_at_14%_8%,rgba(201,169,98,0.10),transparent_60%),radial-gradient(900px_600px_at_86%_58%,rgba(255,255,255,0.05),transparent_62%),linear-gradient(to_bottom,rgba(0,0,0,0.10),transparent_30%,rgba(0,0,0,0.35))]"
        />
        <VirtualShowroom />
      </main>
    </div>
  );
}
