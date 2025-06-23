'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUpSchema } from './schema'
import type { BarbershopForm } from './types'

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

  const handleChange = (section: 'barbershop' | 'owner', field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  // =========================
  // Handle Submit
  // =========================
  /**
   * handleSubmit: Handles form submission, validation, API call and redirection
   */
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md"
        onSubmit={handleSubmit}
        aria-label="Sign up form"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <div>
          <label htmlFor="barbershop-name" className="block text-sm font-medium mb-1">Barbershop Name</label>
          <input
            id="barbershop-name"
            name="barbershop-name"
            type="text"
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.barbershop.name}
            onChange={(e) => handleChange('barbershop', 'name', e.target.value)}
            aria-label="Barbershop name"
            tabIndex={0}
            required
          />
          {errors['barbershop.name'] && (
            <p className="text-red-500 text-xs mt-1">{errors['barbershop.name']}</p>
          )}
        </div>
        <div>
          <label htmlFor="barbershop-address" className="block text-sm font-medium mb-1">Barbershop Address</label>
          <input
            id="barbershop-address"
            name="barbershop-address"
            type="text"
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.barbershop.address}
            onChange={(e) => handleChange('barbershop', 'address', e.target.value)}
            aria-label="Barbershop address"
            tabIndex={0}
            required
          />
          {errors['barbershop.address'] && (
            <p className="text-red-500 text-xs mt-1">{errors['barbershop.address']}</p>
          )}
        </div>
        <div>
          <label htmlFor="owner-name" className="block text-sm font-medium mb-1">Owner Name</label>
          <input
            id="owner-name"
            name="owner-name"
            type="text"
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.owner.name}
            onChange={(e) => handleChange('owner', 'name', e.target.value)}
            aria-label="Owner name"
            tabIndex={0}
            required
          />
          {errors['owner.name'] && (
            <p className="text-red-500 text-xs mt-1">{errors['owner.name']}</p>
          )}
        </div>
        <div>
          <label htmlFor="owner-email" className="block text-sm font-medium mb-1">Owner Email</label>
          <input
            id="owner-email"
            name="owner-email"
            type="email"
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.owner.email}
            onChange={(e) => handleChange('owner', 'email', e.target.value)}
            aria-label="Owner email"
            tabIndex={0}
            required
          />
          {errors['owner.email'] && (
            <p className="text-red-500 text-xs mt-1">{errors['owner.email']}</p>
          )}
        </div>
        <div>
          <label htmlFor="owner-password" className="block text-sm font-medium mb-1">Owner Password</label>
          <input
            id="owner-password"
            name="owner-password"
            type="password"
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.owner.password}
            onChange={(e) => handleChange('owner', 'password', e.target.value)}
            aria-label="Owner password"
            tabIndex={0}
            required
          />
          {errors['owner.password'] && (
            <p className="text-red-500 text-xs mt-1">{errors['owner.password']}</p>
          )}
        </div>
        <div>
          <label htmlFor="owner-phone" className="block text-sm font-medium mb-1">Owner Phone Number</label>
          <input
            id="owner-phone"
            name="owner-phone"
            type="tel"
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.owner.phoneNumber}
            onChange={(e) => handleChange('owner', 'phoneNumber', e.target.value)}
            aria-label="Owner phone number"
            tabIndex={0}
            required
          />
          {errors['owner.phoneNumber'] && (
            <p className="text-red-500 text-xs mt-1">{errors['owner.phoneNumber']}</p>
          )}
        </div>
        {apiError && <p className="text-red-600 text-center text-sm">{apiError}</p>}
        <button
          type="submit"
          className="w-full py-2 px-4 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={isLoading}
          aria-label="Sign up"
        >
          {isLoading ? 'Registering...' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default SignUp
