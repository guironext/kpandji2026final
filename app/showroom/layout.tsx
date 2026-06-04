import { SHOWROOM_LCP_SRC } from "@/data/showroom";

export default function ShowroomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={SHOWROOM_LCP_SRC}
        fetchPriority="high"
      />
      {children}
    </>
  );
}
