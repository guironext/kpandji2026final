export function ContactPageDecor() {
  return (
    <>
      <div
        aria-hidden
        className="kp-contact-orb-1 pointer-events-none absolute -left-32 top-24 size-[min(100vw,420px)] rounded-full bg-kp-gold/10 blur-3xl md:-left-24 md:top-32 md:size-[480px]"
      />
      <div
        aria-hidden
        className="kp-contact-orb-2 pointer-events-none absolute -right-40 top-[38%] size-[min(110vw,520px)] rounded-full bg-white/7 blur-3xl md:-right-28 md:size-[540px]"
      />
      <div
        aria-hidden
        className="kp-contact-orb-3 pointer-events-none absolute bottom-0 left-1/2 h-[min(50vh,380px)] w-[min(100%,720px)] -translate-x-1/2 translate-y-1/3 rounded-full bg-kp-gold/6 blur-3xl"
      />
    </>
  );
}
