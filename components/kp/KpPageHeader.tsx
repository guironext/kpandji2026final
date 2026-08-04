type KpPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function KpPageHeader({
  eyebrow = "Administration",
  title,
  description,
}: KpPageHeaderProps) {
  return (
    <header className="opacity-0-start animate-fade-up">
      <div className="flex items-center gap-3">
        <span
          className="h-px w-8 shrink-0 bg-linear-to-r from-kp-gold/80 to-kp-gold/15"
          aria-hidden
        />
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">
          {eyebrow}
        </p>
      </div>
      <h1 className="mt-4 font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-white/55">
        {description}
      </p>
    </header>
  );
}
