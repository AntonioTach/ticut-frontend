'use client'
import React from 'react'
import { HiMenu, HiBell, HiUser } from 'react-icons/hi'
import { usePathname } from 'next/navigation'
import { sidebarLinks } from '@/lib/constants'

interface MobileHeaderProps {
  onToggleMenu: () => void
}

export const MobileHeader = ({ onToggleMenu }: MobileHeaderProps) => {
  const pathname = usePathname()
  
  // Find current page title
  const currentPage = sidebarLinks.find(link => link.path === pathname)
  const pageTitle = currentPage?.title || 'Dashboard'

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200/50 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-3">
        <button
          data-mobile-menu
          onClick={onToggleMenu}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
          aria-label="Toggle menu"
        >
          <HiMenu size={20} />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">{pageTitle}</h1>
          <p className="text-xs text-gray-500">Panel de administración</p>
        </div>
      </div>
      
      {/* Right side actions */}
      <div className="flex items-center space-x-2">
        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 relative">
          <HiBell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200">
          <HiUser size={18} />
        </button>
      </div>
    </div>
  )
} 