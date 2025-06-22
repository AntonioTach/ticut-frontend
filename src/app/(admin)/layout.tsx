import { SidebarProvider } from "@/contexts/SidebarContext";
import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminLayoutClient>
        {children}
      </AdminLayoutClient>
    </SidebarProvider>
  );
}
