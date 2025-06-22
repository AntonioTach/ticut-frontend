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
    <div className="w-screen h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased selection:bg-blue-600 selection:text-white">
      <MobileHeader onToggleMenu={toggleSidebar} />
      
      <div className="flex h-full pt-16 lg:pt-0">
        <Sidebar />

        <div className="flex-1 h-full overflow-y-auto p-2 lg:p-4">
          {children}
        </div>
      </div>
    </div>
  );
} 