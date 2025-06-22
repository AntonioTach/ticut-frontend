'use client'
import Image from 'next/image'
import React from 'react'
import { IoLogoReact } from 'react-icons/io5'
import { HiX, HiUser, HiLogout } from 'react-icons/hi'
import { SidebarMenuItem } from './SidebarMenuItem'
import { sidebarLinks } from '@/lib/constants'
import { useSidebar } from '@/contexts/SidebarContext'

export const Sidebar = () => {
 const { isOpen, closeSidebar } = useSidebar()

 return (
  <>
   {/* Overlay for mobile */}
   {isOpen && (
    <div
     className="lg:hidden fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 transition-opacity duration-300"
     onClick={closeSidebar}
     aria-hidden="true"
    />
   )}

   {/* Sidebar */}
   <div 
    id="sidebar"
    className={`fixed lg:static inset-y-0 left-0 z-40 w-80 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 transform transition-transform duration-300 ease-in-out shadow-2xl ${
     isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}
   >
    <div className="flex flex-col h-full">
     {/* Header with close button for mobile */}
     <div className="flex items-center justify-between p-6 border-b border-gray-700/50 bg-gray-800/50">
      <div id="logo" className="flex-1">
       <h1 className="flex items-center text-xl md:text-2xl font-bold text-white">
        <div className="mr-3 p-2 bg-blue-600 rounded-lg">
         <IoLogoReact className='text-white' size={24} />
        </div>
        <div>
         <span className="text-white">Barbería</span>
         <span className="text-blue-400 ml-1">Hunters</span>
        </div>
       </h1>
       <p className="text-gray-400 text-sm mt-1">Panel de administración</p>
      </div>
      
      {/* Close button for mobile */}
      <button
       onClick={closeSidebar}
       className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
       aria-label="Close menu"
      >
       <HiX size={20} />
      </button>
     </div>

     {/* Profile section */}
     <div id="profile" className="px-6 py-6 border-b border-gray-700/50 bg-gray-800/30">
      <div className="flex items-center space-x-3">
       <div className="relative">
        <Image 
         className="rounded-full w-12 h-12 ring-2 ring-blue-500/50" 
         src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c" 
         alt="User" 
         width={48} 
         height={48} 
        />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
       </div>
       <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-400">Bienvenido de nuevo,</p>
        <p className="text-white font-semibold truncate">Antonio Viña</p>
        <p className="text-xs text-gray-500">Administrador</p>
       </div>
       <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200">
        <HiUser size={16} />
       </button>
      </div>
     </div>

     {/* Navigation */}
     <div id="nav" className="flex-1 overflow-y-auto py-4">
      <div className="px-4">
       <div className="mb-4">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
         Navegación
        </h3>
        {sidebarLinks.map(item => (
         <SidebarMenuItem 
          key={item.path} 
          {...item} 
          onClick={closeSidebar}
         />
        ))}
       </div>
      </div>
     </div>

     {/* Footer */}
     <div className="p-4 border-t border-gray-700/50 bg-gray-800/30">
      <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200">
       <HiLogout size={16} />
       <span className="text-sm font-medium">Cerrar Sesión</span>
      </button>
     </div>
    </div>
   </div>
  </>
 )
}