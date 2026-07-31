import type { Metadata } from "next";
import { Cormorant, DM_Sans } from "next/font/google";
import "./globals.css";
import { KpAppShell } from "@/components/kp/KpAppShell";
import { KpClerkProvider } from "@/components/providers/KpClerkProvider";

const dmSans = DM_Sans({
	subsets: ["latin", "latin-ext"],
	variable: "--font-dm-sans",
	display: "swap",
	weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant({
	subsets: ["latin", "latin-ext"],
	variable: "--font-cormorant",
	display: "swap",
	weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "KPANDJI AUTOMOBILES — Constructeur automobile",
  description:
    "KPANDJI AUTOMOBILES conçoit, assemble et commercialise des véhicules. Ingénierie, qualité et mobilité durable.",
  applicationName: "KPANDJI AUTOMOBILES",
  metadataBase: new URL("https://kpandji.com"),
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-64.png", sizes: "64x64", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon-32.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KPANDJI AUTOMOBILES — Constructeur automobile",
    description:
      "Ingénierie automobile, assemblage et vente de véhicules neufs.",
    type: "website",
    siteName: "KPANDJI AUTOMOBILES",
    locale: "fr_FR",
    images: [{ url: "/logo.png", alt: "KPANDJI AUTOMOBILES" }],
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
      data-scroll-behavior="auto"
      suppressHydrationWarning
    >
      <body
        className="relative min-h-full flex flex-col bg-kp-bg text-kp-accent"
        suppressHydrationWarning
      >
        <KpClerkProvider>
          <KpAppShell>{children}</KpAppShell>
        </KpClerkProvider>
      </body>
    </html>
  );
}
