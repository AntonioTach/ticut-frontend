'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isSignIn = pathname === '/sign-in'
  const isSignUp = pathname === '/sign-up'

  return (
    <main className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Left Section - Branding */}
      <section className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 dark:from-blue-500/10 dark:to-purple-500/10"></div>
        <div className="relative z-10 text-center max-w-md">
          <div className="mb-8">
            <img 
              src="/icons/logo.svg" 
              alt="Barber Pro Logo" 
              className="w-16 h-16 mx-auto mb-4 drop-shadow-lg"
            />
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Barber Pro
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Transform your barbershop dreams into reality with our comprehensive management platform
            </p>
          </div>
          
          {/* Feature highlights */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-slate-700 dark:text-slate-200">Smart appointment scheduling</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <span className="text-slate-700 dark:text-slate-200">Revenue tracking & analytics</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-slate-700 dark:text-slate-200">Client management system</span>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl"></div>
      </section>

      {/* Right Section - Auth Form */}
      <section className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Navigation tabs */}
          <div className="flex mb-8 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            <Link
              href="/sign-in"
              className={`flex-1 text-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                isSignIn
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              aria-label="Sign in to your account"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className={`flex-1 text-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                isSignUp
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              aria-label="Create a new account"
            >
              Sign Up
            </Link>
          </div>

          {/* Form container */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
              {children}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              By continuing, you agree to our{' '}
              <Link href="/terms" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
