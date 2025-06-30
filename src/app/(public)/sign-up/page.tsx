'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signUpSchema } from './schema'
import type { BarbershopForm } from './types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const AVATAR_URL = 'https://example.com/avatar.jpg' as const
const API_URL = process.env.NEXT_PUBLIC_API_URL

const SignUp = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    barbershop: { name: '', address: '' },
    owner: { email: '', password: '', name: '', phoneNumber: '' },
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (section: 'barbershop' | 'owner', field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
    // Clear error when user starts typing
    const errorKey = `${section}.${field}`
    if (errors[errorKey]) {
      setErrors((prev) => ({
        ...prev,
        [errorKey]: '',
      }))
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setApiError('')
    setErrors({})
    const result = signUpSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach((err) => {
        if (err.path.length === 2) {
          fieldErrors[`${err.path[0]}.${err.path[1]}`] = err.message
        }
      })
      setErrors(fieldErrors)
      return
    }
    setIsLoading(true)
    try {
      const payload: BarbershopForm = {
        barbershop: {
          name: form.barbershop.name,
          address: form.barbershop.address,
        },
        owner: {
          ...form.owner,
          avatarUrl: AVATAR_URL,
        },
      }
      const response = await fetch(`${API_URL}/barbershops/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (response.status === 201) {
        router.push('/dashboard')
        return
      }
      setApiError('Registration failed. Please try again.')
    } catch {
      setApiError('An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement Google OAuth
      console.log('Google sign-up clicked')
    } catch (error) {
      console.error('Google sign-up error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full border-0 shadow-none bg-transparent">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
          Create your account
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400">
          Start your barbershop journey with Barber Pro
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Google Sign-up Button */}
        <Button
          type="button"
          variant="outline"
          className="w-full h-11 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
          onClick={handleGoogleSignUp}
          disabled={isLoading}
        >
          <img src="/icons/google.svg" alt="Google" className="w-5 h-5 mr-2" />
          Continue with Google
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Sign-up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Barbershop Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
              Barbershop Information
            </h3>
            
            {/* Barbershop Name */}
            <div className="space-y-2">
              <label 
                htmlFor="barbershop-name" 
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Barbershop Name
              </label>
              <input
                id="barbershop-name"
                name="barbershop-name"
                type="text"
                autoComplete="organization"
                value={form.barbershop.name}
                onChange={(e) => handleChange('barbershop', 'name', e.target.value)}
                className={`w-full h-11 px-3 py-2 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors['barbershop.name'] ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700'
                }`}
                placeholder="Enter your barbershop name"
                aria-describedby={errors['barbershop.name'] ? 'barbershop-name-error' : undefined}
                aria-invalid={!!errors['barbershop.name']}
              />
              {errors['barbershop.name'] && (
                <p id="barbershop-name-error" className="text-sm text-red-600 dark:text-red-400">
                  {errors['barbershop.name']}
                </p>
              )}
            </div>

            {/* Barbershop Address */}
            <div className="space-y-2">
              <label 
                htmlFor="barbershop-address" 
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Barbershop Address
              </label>
              <input
                id="barbershop-address"
                name="barbershop-address"
                type="text"
                autoComplete="street-address"
                value={form.barbershop.address}
                onChange={(e) => handleChange('barbershop', 'address', e.target.value)}
                className={`w-full h-11 px-3 py-2 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors['barbershop.address'] ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700'
                }`}
                placeholder="Enter your barbershop address"
                aria-describedby={errors['barbershop.address'] ? 'barbershop-address-error' : undefined}
                aria-invalid={!!errors['barbershop.address']}
              />
              {errors['barbershop.address'] && (
                <p id="barbershop-address-error" className="text-sm text-red-600 dark:text-red-400">
                  {errors['barbershop.address']}
                </p>
              )}
            </div>
          </div>

          {/* Owner Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
              Owner Information
            </h3>
            
            {/* Owner Name */}
            <div className="space-y-2">
              <label 
                htmlFor="owner-name" 
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Full Name
              </label>
              <input
                id="owner-name"
                name="owner-name"
                type="text"
                autoComplete="name"
                value={form.owner.name}
                onChange={(e) => handleChange('owner', 'name', e.target.value)}
                className={`w-full h-11 px-3 py-2 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors['owner.name'] ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700'
                }`}
                placeholder="Enter your full name"
                aria-describedby={errors['owner.name'] ? 'owner-name-error' : undefined}
                aria-invalid={!!errors['owner.name']}
              />
              {errors['owner.name'] && (
                <p id="owner-name-error" className="text-sm text-red-600 dark:text-red-400">
                  {errors['owner.name']}
                </p>
              )}
            </div>

            {/* Owner Email */}
            <div className="space-y-2">
              <label 
                htmlFor="owner-email" 
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Email Address
              </label>
              <input
                id="owner-email"
                name="owner-email"
                type="email"
                autoComplete="email"
                value={form.owner.email}
                onChange={(e) => handleChange('owner', 'email', e.target.value)}
                className={`w-full h-11 px-3 py-2 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors['owner.email'] ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700'
                }`}
                placeholder="Enter your email address"
                aria-describedby={errors['owner.email'] ? 'owner-email-error' : undefined}
                aria-invalid={!!errors['owner.email']}
              />
              {errors['owner.email'] && (
                <p id="owner-email-error" className="text-sm text-red-600 dark:text-red-400">
                  {errors['owner.email']}
                </p>
              )}
            </div>

            {/* Owner Password */}
            <div className="space-y-2">
              <label 
                htmlFor="owner-password" 
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="owner-password"
                  name="owner-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.owner.password}
                  onChange={(e) => handleChange('owner', 'password', e.target.value)}
                  className={`w-full h-11 px-3 py-2 pr-10 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors['owner.password'] ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                  placeholder="Create a strong password"
                  aria-describedby={errors['owner.password'] ? 'owner-password-error' : undefined}
                  aria-invalid={!!errors['owner.password']}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors['owner.password'] && (
                <p id="owner-password-error" className="text-sm text-red-600 dark:text-red-400">
                  {errors['owner.password']}
                </p>
              )}
            </div>

            {/* Owner Phone */}
            <div className="space-y-2">
              <label 
                htmlFor="owner-phone" 
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Phone Number
              </label>
              <input
                id="owner-phone"
                name="owner-phone"
                type="tel"
                autoComplete="tel"
                value={form.owner.phoneNumber}
                onChange={(e) => handleChange('owner', 'phoneNumber', e.target.value)}
                className={`w-full h-11 px-3 py-2 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors['owner.phoneNumber'] ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700'
                }`}
                placeholder="Enter your phone number"
                aria-describedby={errors['owner.phoneNumber'] ? 'owner-phone-error' : undefined}
                aria-invalid={!!errors['owner.phoneNumber']}
              />
              {errors['owner.phoneNumber'] && (
                <p id="owner-phone-error" className="text-sm text-red-600 dark:text-red-400">
                  {errors['owner.phoneNumber']}
                </p>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-2">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
            />
            <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400">
              I agree to the{' '}
              <Link href="/terms" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* API Error */}
          {apiError && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{apiError}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </>
            ) : (
              'Create account'
            )}
          </Button>
        </form>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link
              href="/sign-in"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default SignUp
