import { Sidebar } from "@/src/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen bg-slate-100 text-slate-300 antialiased selection:bg-blue-600 selection:text-white">
      <div className="flex h-full">
        <Sidebar />

        <div className="flex-1 h-full overflow-y-auto p-2 text-slate-900">
          {children}
        </div>
      </div>
    </div>
  );
}
