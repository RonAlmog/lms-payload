import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function BackButton() {
  return (
    <Link
      href="/dashboard"
      className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-white transition duration-300 ease-in-out"
    >
      <ArrowLeft className="size-6 mr-2" />
      Back to Dashboard
    </Link>
  )
}
