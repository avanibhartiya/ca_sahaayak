import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="p-8">
          {children}
        </main>
        <footer className="mt-auto p-6 border-t border-gray-200 text-center text-xs text-gray-500">
          © 2026 CA Sahaayak.
        </footer>
      </div>
    </div>
  );
}
