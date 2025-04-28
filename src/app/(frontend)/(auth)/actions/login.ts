'use server'

import { cookies, headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Payload } from 'payload'
import { Customer } from '@/payload-types'
import { login } from '@payloadcms/next/auth'

interface LoginProps {
  email: string
  password: string
}
interface LoginResponse {
  success: boolean
  error?: string
}

export type Result = {
  exp?: number
  token?: string
  user?: Customer
}
export async function loginUser({ email, password }: LoginProps): Promise<LoginResponse> {
  const payload = await getPayload({ config })

  try {
    const result: Result = await login({
      collection: 'customers',
      config,
      email,
      password,
    })

    if (result.token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      })

      return { success: true }
    } else {
      return { success: false, error: 'Invalid email or password' }
    }
  } catch (error) {
    console.log('Login error', error)
    return { success: false, error: 'An error occured' }
  }
}
