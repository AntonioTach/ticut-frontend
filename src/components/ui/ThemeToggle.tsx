'use client'
import React from 'react'
import { HiSun, HiMoon } from 'react-icons/hi'
import { useTheme } from '@/contexts/ThemeContext'

interface ThemeToggleProps {
  variant?: 'sidebar' | 'header'
  className?: string
}

export const ThemeToggle = ({ variant = 'sidebar', className = '' }: ThemeToggleProps) => {
  const { resolvedTheme, toggleTheme } = useTheme()

  const baseClasses = "p-2 rounded-lg transition-all duration-200"
  
  const variantClasses = {
    sidebar: "text-gray-400 hover:text-white hover:bg-gray-700",
    header: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
  }

  return (
    <button
      onClick={toggleTheme}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'light' ? (
        <HiMoon size={18} />
      ) : (
        <HiSun size={18} />
      )}
    </button>
  )
} 