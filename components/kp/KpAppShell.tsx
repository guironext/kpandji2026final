import { Suspense } from "react";
import { KpFooter } from "@/components/kp/KpFooter";
import { KpHeader } from "@/components/kp/KpHeader";
import { KpInstantScroll } from "@/components/kp/KpInstantScroll";

function HeaderFallback() {
  return (
    <header
      aria-hidden
      className="kp-header-mount fixed inset-x-0 top-0 z-50 h-14 border-b border-transparent bg-linear-to-b from-black/55 via-black/20 to-transparent sm:h-16 md:h-[132px]"
    />
  );
}

export function KpAppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <KpInstantScroll />
      <Suspense fallback={<HeaderFallback />}>
        <KpHeader />
      </Suspense>
      {children}
      <KpFooter />
    </>
  );
}
