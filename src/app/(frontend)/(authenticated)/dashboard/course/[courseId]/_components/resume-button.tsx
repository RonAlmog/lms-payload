'use client'
import { participate } from '@/app/(frontend)/(authenticated)/actions/participate'
import { Button } from '@/components/ui/button'
import { Course, Participation } from '@/payload-types'
import { LoaderIcon, PlayIcon, TriangleAlert } from 'lucide-react'
import Link from 'next/link'

interface Props {
  participation: Participation
}
export default function ResumeButton({ participation }: Props) {
  const course: Course = participation.course as Course
  const courseLength = course.curriculum?.length || 1
  let progress = participation.progress ?? 0
  progress += 1
  const progressPercentage = Math.round((progress / courseLength) * 100)

  return (
    <Link
      href={`/dashboard/participation/${participation.id}`}
      className="relative w-full bg-teal-500 hover:bg-teal-600 font-bold rounded overflow-hidden transition ease-in-out duration-300"
    >
      <div className="flex flex-row items-center justify-between pl-2">
        <p className="text-sm font-semibold">{course.title}</p>
        <div className="flex items-center justify-center bg-teal-600 h-12 w-12 overflow-hidden">
          <PlayIcon className="size-6" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden">
        <div className="h-full bg-gray-400" style={{ width: `${progressPercentage}%` }}></div>
      </div>
    </Link>
  )
}
