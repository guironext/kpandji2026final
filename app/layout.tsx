import type { Metadata } from "next";
import { Cormorant, DM_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { KpHeader } from "@/components/kp/KpHeader";
import { KpFooter } from "@/components/kp/KpFooter";
import { KpClerkProvider } from "@/components/providers/KpClerkProvider";

function HeaderFallback() {
  return (
    <header
      aria-hidden
      className="kp-header-mount fixed inset-x-0 top-0 z-50 h-[110px] border-b border-transparent bg-linear-to-b from-black/55 via-black/20 to-transparent md:h-[132px]"
    />
  );
}

const dmSans = DM_Sans({
	subsets: ["latin"],
	variable: "--font-dm-sans",
	display: "swap",
});

const cormorant = Cormorant({
	subsets: ["latin"],
	variable: "--font-cormorant",
	display: "swap",
	weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "KPANDJI Motors — Constructeur automobile",
  description:
    "KPANDJI Motors conçoit, assemble et commercialise des véhicules. Ingénierie, qualité et mobilité durable.",
  applicationName: "KPANDJI Motors",
  metadataBase: new URL("https://kpandji.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KPANDJI Motors — Constructeur automobile",
    description:
      "Ingénierie automobile, assemblage et vente de véhicules neufs.",
    type: "website",
    siteName: "KPANDJI Motors",
    locale: "fr_FR",
  },
};

export const viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`relative h-full antialiased ${dmSans.variable} ${cormorant.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className="relative min-h-full flex flex-col bg-kp-bg text-kp-accent"
        suppressHydrationWarning
      >
        <KpClerkProvider>
          <Suspense fallback={<HeaderFallback />}>
            <KpHeader />
          </Suspense>
          {children}
          <KpFooter />
        </KpClerkProvider>
      </body>
    </html>
  );
}
