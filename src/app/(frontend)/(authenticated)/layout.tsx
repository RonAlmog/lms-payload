import { redirect } from 'next/navigation'
import { getUser } from './actions/get-user'

export default async function Layout(props: { children: React.ReactNode }) {
  const { children } = props

  const user = getUser()
  if (!user) {
    redirect('/login')
    return null
  }

  return <div>{children}</div>
}
