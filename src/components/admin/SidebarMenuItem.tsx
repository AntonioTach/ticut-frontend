'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { JSX } from 'react'

interface SidebarMenuProps {
  path: string;
  icon: JSX.Element;
  title: string;
  subTitle?: string;
  onClick?: () => void;
}

export const SidebarMenuItem = ({ path, icon, title, subTitle, onClick }: SidebarMenuProps) => {
  const currentPath = usePathname();
  const isActive = currentPath === path;

  return (
    <Link 
      href={path} 
      aria-current={isActive ? 'page' : undefined} 
      className={`group relative flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ease-in-out ${
        isActive 
          ? 'bg-blue-600/20 text-blue-400 border-l-4 border-l-blue-400 shadow-lg' 
          : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
      }`}
      onClick={onClick}
    >
      {/* Active indicator */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-r-full"></div>
      )}
      
      {/* Icon */}
      <div className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-blue-600/30 text-blue-400' 
          : 'text-gray-400 group-hover:text-white group-hover:bg-gray-600/30'
      }`}>
        {icon}
      </div>

      {/* Content */}
      <div className="flex flex-col min-w-0 flex-1">
        <span className={`text-sm font-medium leading-5 truncate ${
          isActive ? 'text-blue-400' : 'text-gray-300 group-hover:text-white'
        }`}>
          {title}
        </span>
        {subTitle && (
          <span className={`text-xs truncate ${
            isActive ? 'text-blue-300/70' : 'text-gray-500 group-hover:text-gray-300'
          }`}>
            {subTitle}
          </span>
        )}
      </div>

      {/* Hover effect */}
      <div className={`absolute inset-0 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-blue-600/10' 
          : 'bg-transparent group-hover:bg-gray-600/20'
      }`}></div>
    </Link>
  )
}
