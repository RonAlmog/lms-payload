'use client'
import { Course } from '@/payload-types'
import { PencilIcon, VideoIcon } from 'lucide-react'

interface Props {
  course: Course
  currentProgress: number
}
export default function Curriculum({ course, currentProgress }: Props) {
  return (
    <div className="flex flex-col gap-4 max-h-[20rem] overflow-y-auto">
      {course.curriculum?.map((block, index) => {
        const isCurrent = index === currentProgress
        const baseClass = 'p-4 rounded bg-gray-900'
        const borderClass = isCurrent ? 'border-white' : 'border-gray-700'
        const finalClass = `${baseClass} ${borderClass}`

        if (block.blockType === 'video') {
          return (
            <div key={index} className={finalClass}>
              <div className="text-teal-400 font-semibold flex items-center gap-2">
                <VideoIcon className="size-6" />
                {block.title}
              </div>
              <div className="text-sm text-gray-400">Duration: {block.duration} min</div>
            </div>
          )
        } else if (block.blockType === 'quiz') {
          return (
            <div key={index} className={finalClass}>
              <div className="text-teal-400 font-semibold flex items-center gap-2">
                <PencilIcon className="size-6" />
                {block.title}
              </div>
              <div className="text-sm text-gray-400">Questions: {block.questions?.length || 0}</div>
            </div>
          )
        } else {
          return null
        }
      })}
    </div>
  )
}
