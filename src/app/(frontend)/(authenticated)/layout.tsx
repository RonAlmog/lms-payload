import { redirect } from 'next/navigation'
import { getUser } from './actions/get-user'
import Navbar from './components/navbar'

export default async function Layout(props: { children: React.ReactNode }) {
  const { children } = props

  const user = getUser()
  if (!user) {
    redirect('/login')
    return null
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
