'use client'
import { Sidebar, MobileHeader } from "@/components/admin";
import { useSidebar } from "@/contexts/SidebarContext";

export const AdminLayoutClient = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="w-screen h-screen bg-slate-100 text-slate-300 antialiased selection:bg-blue-600 selection:text-white">
      <MobileHeader onToggleMenu={toggleSidebar} />
      
      <div className="flex h-full pt-16 lg:pt-0">
        <Sidebar />

        <div className="flex-1 h-full overflow-y-auto p-2 text-slate-900 lg:p-4">
          {children}
        </div>
      </div>
    </div>
  );
} 