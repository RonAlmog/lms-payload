import React, { ReactElement } from 'react'
import SignUpClient from './sign-up-client'

export default async function Page(): Promise<ReactElement> {
  return (
    <div className="h-[calc(100vh-3rem)]">
      <SignUpClient />
    </div>
  )
}
