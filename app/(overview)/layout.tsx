import NavLinks from '@/app/ui/app/nav-links'; // шлях залежить від того, де лежить твій файл

export default function OverviewLayout({
                                         children,
                                       }: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64 bg-gray-100">
        <nav className="flex flex-col gap-2 p-4">
          <NavLinks />
        </nav>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {children}
      </div>
    </div>
  );
}
