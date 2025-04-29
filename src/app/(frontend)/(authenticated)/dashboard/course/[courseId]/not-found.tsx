import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-semibold text-red-500 mb-12">Oh no, Page not found!</h1>
      <Link href="/" className="flex flex-row items-center bg-amber-500 p-4 text-white rounded-2xl">
        <ArrowLeftIcon className="mr-2 size-6" />
        Back to Dashboard
      </Link>
    </div>
  )
}

export default NotFound
