export default function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pt-[110px] md:pt-[132px]">
      {children}
    </div>
  );
}
