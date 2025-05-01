'use client'
import { participate } from '@/app/(frontend)/(authenticated)/actions/participate'
import { Button } from '@/components/ui/button'
import { Participation } from '@/payload-types'
import { LoaderIcon, PlayIcon, TriangleAlert } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, MouseEvent } from 'react'

interface Props {
  courseId: string
}
export default function StartCourseButton({ courseId }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const isLoading = status === 'loading'
  const isError = status === 'error'

  async function haneleStartCourse(e: MouseEvent<HTMLButtonElement>) {
    setStatus('loading')
    setError(null)
    e.preventDefault()

    try {
      const participation: Participation = await participate({ courseId })
      if (!participation) {
        throw new Error('Failed to create participation')
      }

      router.push(`/dashboard/participation/${participation.id}`)
    } catch (error) {
      console.error(error)
      setStatus('error')
      setError('Failed to start course. please try again')
    }
  }
  return (
    <div className="mt-6">
      <Button className="" disabled={isLoading} onClick={haneleStartCourse}>
        <div>
          {isLoading ? (
            <LoaderIcon className="animate-spin text-xl" />
          ) : isError ? (
            <TriangleAlert className="text-xl" />
          ) : (
            <PlayIcon className="text-xl" />
          )}
        </div>
        <span className="pl-6">Start Course</span>
      </Button>

      {isError && (
        <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
          <TriangleAlert className="text-xl" /> {error}
        </p>
      )}
    </div>
  )
}
