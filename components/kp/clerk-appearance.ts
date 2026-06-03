export const kpClerkAppearance = {
  variables: {
    colorBackground: "#0a0a0a",
    colorInputBackground: "#121212",
    colorInputText: "#f5f5f5",
    colorText: "rgba(255,255,255,0.92)",
    colorTextSecondary: "rgba(255,255,255,0.55)",
    colorPrimary: "#c9a962",
    colorDanger: "#e85d5d",
    borderRadius: "0.375rem",
    fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
    fontFamilyButtons: "var(--font-dm-sans), system-ui, sans-serif",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "w-full max-w-full shadow-none",
    card: "bg-transparent shadow-none border-0 p-0 gap-4",
    headerTitle: "font-serif text-xl tracking-wide text-white",
    headerSubtitle: "text-white/50 text-sm",
    socialButtonsBlockButton:
      "border border-white/15 bg-white/5 text-white hover:bg-white/10",
    formFieldInput:
      "border-white/15 bg-white/5 text-white placeholder:text-white/35",
    formButtonPrimary:
      "bg-white text-black font-semibold uppercase tracking-[0.14em] text-[11px] hover:bg-white/90",
    footerActionLink: "text-[#c9a962] hover:text-[#dfc88a]",
    identityPreviewEditButton: "text-white/70",
    formFieldLabel: "text-white/60 uppercase text-[10px] tracking-[0.18em]",
    dividerLine: "bg-white/10",
    dividerText: "text-white/40 text-[10px] uppercase tracking-[0.2em]",
    footer: "hidden",
  },
} as const;
